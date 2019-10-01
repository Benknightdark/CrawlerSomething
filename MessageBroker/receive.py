import time
import pika
import json
import os
import pymongo
version = ''
RabbitmqConnectString = ''
MONGODBConnectString=''
if "ENV_VERSION" not in os.environ:
    version = 'development'
    RabbitmqConnectString = 'amqp://rabbitmq:rabbitmq@localhost:5672/'
    MONGODBConnectString='mongodb://root:example@localhost:1769/'
else:
    if os.environ['ENV_VERSION'] == 'production':
        version = 'production'
        RabbitmqConnectString = os.environ['AQMPCONNECTSTRING']
        MONGODBConnectString=os.environ['MONGODBDBCONNECTSTRING']
    else:
        version = 'development'
        RabbitmqConnectString = 'amqp://rabbitmq:rabbitmq@localhost:5672/'
        MONGODBConnectString='mongodb://root:example@localhost:1769/'

def ListCollection():
    client = pymongo.MongoClient(MONGODBConnectString)
    DB=client.News
    collection=DB.ithomes
    return collection#.find({})
print(RabbitmqConnectString)


def callback(ch, method, properties, body):
    dd=json.loads(body)
    ListCollection().insert_one(dd)
    ListCollection().save()


parameters = pika.URLParameters(RabbitmqConnectString)
connection = pika.BlockingConnection(parameters)
channel = connection.channel()
channel.queue_declare(queue='send-crawl-data')
channel.basic_consume(queue='send-crawl-data',
                      auto_ack=True,
                      on_message_callback=callback)
print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()
