import webapp2

from google.appengine.ext import ndb


class Order(ndb.Model):
    """Models an individual Guestbook entry with content and date."""
    userid = ndb.StringProperty()
    paytype = ndb.StringProperty()
    address = ndb.StringProperty()
    email = ndb.StringProperty()
    
    date = ndb.DateTimeProperty(auto_now_add=True)

    @classmethod
    def query_book(cls, ancestor_key):
        return cls.query(ancestor=ancestor_key).order(-cls.date)



class OrderAPI(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.response.write('{}')
        o = Order(parent=ndb.Key("Book", "*notitle*"),
                         userid=self.request.get('userid'),
                         paytype=self.request.get('paytype'),
                         address=self.request.get('address'),
                         email=self.request.get('email'),
                         )
        o.put()



app = webapp2.WSGIApplication([
    ('/api/order', OrderAPI),
], debug=True)
