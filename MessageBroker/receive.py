from itertools import chain

import pika

import time
def callback(ch, method, properties, body):
    print(" [x] Received %r" % body.decode("utf8"))
if __name__ == '__main__':    




    while True:
        try:
                credentials = pika.PlainCredentials( 'rabbitmq', 'rabbitmq')
                parameters = pika.ConnectionParameters(host= 'rabbitmq',port=5672,  credentials= credentials)
                connection = pika.BlockingConnection(parameters)
                channel = connection.channel()
                channel.queue_declare(queue='send-crawl-data')    
                channel.basic_consume(queue='send-crawl-data',
                                    auto_ack=True,
                                    
                                    on_message_callback=callback)    
                # print(' [*] Waiting for messages. To exit press CTRL+C')
                channel.start_consuming()
        # Don't recover if connection was closed by broker
        except pika.exceptions.ConnectionClosedByBroker:
            break
        # Don't recover on channel errors
        except pika.exceptions.AMQPChannelError:
            break
        # Recover on all other connection errors
        except pika.exceptions.AMQPConnectionError:
            continue    

