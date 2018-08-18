import webapp2
import json

from google.appengine.ext import ndb


class Purchase(ndb.Expando):
    _default_indexed = False
    date = ndb.DateTimeProperty(auto_now_add=True)

    @classmethod
    def query_book(cls, ancestor_key):
        return cls.query(ancestor=ancestor_key).order(-cls.date)

class Link(ndb.Expando):
    _default_indexed = False
    date = ndb.DateTimeProperty(auto_now_add=True)

class CompletePurchaseAPI(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.response.headers['Access-Control-Allow-Origin'] = '*'

        key = ndb.Key(urlsafe=self.request.get('txid'))
        # txid could be tampered with, so we might retrieve *anything* here.
        # Lucky all top level keys have unguessable uuid's...
        p = key.get()

        for k,v in self.request.GET.items():
            # Check for reserved/special keys
            if k.startswith('_') or k.lower() == 'key':
                continue
            # Only allow adding new properties, not overwriting existing ones.
            if p._properties.get(k) is None:
                p.__setattr__(k, v)

        p.put()
        self.response.write('{}')


class StartPurchaseAPI(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.response.headers['Access-Control-Allow-Origin'] = '*'
        o = Purchase(parent=ndb.Key("User", self.request.get('uuid')))

        resp = {}
        if self.request.get('type') == 'app':
            freq = self.request.get('frequency')
            product_names = {'': 'onegift', 'W': 'weeklygift', 'M': 'monthlygift', 'Y': 'annualgift'}
            resp['productName'] = product_names[freq]
        
        for k,v in self.request.GET.items():
            # Check for reserved/special keys
            if k.startswith('_') or k.lower() == 'key':
                continue
            o.__setattr__(k, v)

        o.put()
        resp['txid'] = o.key.urlsafe()

        self.response.write(json.dumps(resp))

class LinkUUIDAPI(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.response.headers['Access-Control-Allow-Origin'] = '*'
        o = Link()
        o.key = ndb.Key("User", self.request.get('a'), 'Link', self.request.get('b'))
        o.put()
        o = Link()
        o.key = ndb.Key("User", self.request.get('b'), 'Link', self.request.get('a'))
        o.put()
        self.response.write('{}')


app = webapp2.WSGIApplication([
    ('/api/startpurchase', StartPurchaseAPI),
    ('/api/completepurchase', CompletePurchaseAPI),
    ('/api/linkuuid', LinkUUIDAPI),
], debug=True)
