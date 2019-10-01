import pika
parameters= pika.URLParameters('amqp://rabbitmq:rabbitmq@localhost:5672/')
connection = pika.BlockingConnection(parameters)
channel = connection.channel()
channel.queue_declare(queue='crawl-url')
channel.basic_publish(exchange='',
                      routing_key='crawl-url',
                      body='https://www.ithome.com.tw/news/133335')
print(" [x] Sent 'Hello World!'")
connection.close()
