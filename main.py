import webapp2
import uuid

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


class StartPurchaseAPI(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.response.headers['Access-Control-Allow-Origin'] = '*'
        o = Purchase(parent=ndb.Key("User", self.request.get('uuid')))
        for k,v in self.request.GET.items():
            # Check for reserved/special keys
            if k.startswith('_') or k.lower() == 'key':
                continue
            o.__setattr__(k, v)

        o.put()
        self.response.write('{ "txid": "%s"}' % (o.key.urlsafe()) )

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
    ('/api/linkuuid', LinkUUIDAPI),
], debug=True)
