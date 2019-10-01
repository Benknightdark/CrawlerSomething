import pika
credentials = pika.PlainCredentials('rabbitmq', 'rabbitmq')
parameters = pika.ConnectionParameters('localhost',
                                       5672,
                                       '/',
                                       credentials)
connection = pika.BlockingConnection(parameters)
channel = connection.channel()
channel.queue_declare(queue='crawl-url')
channel.basic_publish(exchange='',
                      routing_key='crawl-url',
                      body='https://ithome.com.tw/news/133290')
print(" [x] Sent 'Hello World!'")
connection.close()
