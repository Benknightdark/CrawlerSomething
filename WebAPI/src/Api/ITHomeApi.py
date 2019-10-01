from flask import jsonify, Flask, Response,json,request,Blueprint, make_response
from Middlewares.HttpMiddleware import HTTPMethodOverrideMiddleware
from config import DevConfig
from config import ProdConfig
from bson.json_util import dumps
from  html import escape
from DB import DataBase
from config import get_env
import pika
  
        
ithome_blueprint = Blueprint('ithome', __name__)

@ithome_blueprint.route('/list')
def Get():
    print(get_env().RABBITMQCONNECTSTRING)
    data = DataBase.ListCollection(get_env().CONNECTSTRING)
    return Response(dumps(data), mimetype='application/json')

@ithome_blueprint.route('/',methods=['POST'])
def Post(): 
    content = request.get_json(silent=True)
    parameters= pika.URLParameters(get_env().RABBITMQCONNECTSTRING)
    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()
    channel.queue_declare(queue='crawl-url')
    channel.basic_publish(exchange='',
                        routing_key='crawl-url',
                        body=content['url'])
    connection.close()
    data = {'message': 'Created', 'code': 'SUCCESS'}
    return make_response(jsonify(data), 201)
    #Response(dumps(content), mimetype='application/json')