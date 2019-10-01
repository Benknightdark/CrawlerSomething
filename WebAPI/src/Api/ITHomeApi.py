from flask import jsonify, Flask, Response,json,request,Blueprint
from Middlewares.HttpMiddleware import HTTPMethodOverrideMiddleware
from config import DevConfig
from config import ProdConfig
from bson.json_util import dumps
from  html import escape
from DB import DataBase
import os
if "CONFIG" not in os.environ:
    config = DevConfig
else:
    if os.environ['CONFIG'] == 'prod':
        config = ProdConfig
    else:
        config = DevConfig
if "CONFIG" not in os.environ:
    config = DevConfig
else:
    if os.environ['CONFIG'] == 'prod':
        config = ProdConfig
    else:
        config = DevConfig       
        
ithome_blueprint = Blueprint('ithome', __name__)


@ithome_blueprint.route('/list')
def Get():
    data = DataBase.ListCollection(config.CONNECTSTRING)
    return Response(dumps(data), mimetype='application/json')