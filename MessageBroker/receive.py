import pika

def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)
credentials = pika.PlainCredentials('rabbitmq', 'rabbitmq')
parameters = pika.ConnectionParameters('localhost',
                                       5672,
                                       '/',
                                       credentials)
connection = pika.BlockingConnection(parameters)
channel = connection.channel()
channel.queue_declare(queue='hello')    
channel.basic_consume(queue='hello',
                      auto_ack=True,
                      on_message_callback=callback)    
print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()                      