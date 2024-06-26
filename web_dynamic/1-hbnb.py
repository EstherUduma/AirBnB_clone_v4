#!/usr/bin/python3
""" Starts a Flash Web Application """

from models.amenity import Amenity
from models.place import Place
import uuid
from models import storage
from models.state import State
from models.city import City
from os import environ
from flask import Flask, render_template
app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'


@app.teardown_appcontext
def close_db(error):
    """ Stop current SQLAlchemy Session """
    storage.close()


@app.route('/1-hbnb')
def hbnb():
    """Request for template with states,cities & amentities"""
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenty = storage.all(Amenity).values()
    amenty = sorted(amenty, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)
    cache_id = str(uuid.uuid4())

    return render_template('1-hbnb.html',
                           states=st_ct,
                           amenty=amenty,
                           places=places,
                           cache_id=cache_id)


if __name__ == "__main__":
    """ Main Function """
    app.run(host=host, port=port)
