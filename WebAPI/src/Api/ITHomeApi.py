from flask import jsonify, Flask, Response,json,request,Blueprint
from Middlewares.HttpMiddleware import HTTPMethodOverrideMiddleware
from config import DevConfig
from config import ProdConfig
from bson.json_util import dumps
from  html import escape
from DB import DataBase
from config import get_env
     
        
ithome_blueprint = Blueprint('ithome', __name__)


@ithome_blueprint.route('/list')
def Get():
    data = DataBase.ListCollection(get_env().CONNECTSTRING)
    return Response(dumps(data), mimetype='application/json')