import os
class Config(object):
    pass

class ProdConfig(Config):
    CONNECTSTRING= '' 
    RABBITMQCONNECTSTRING =''
class DevConfig(Config):
    DEBUG = True
    CONNECTSTRING='mongodb://root:example@localhost:1769/'
    RABBITMQCONNECTSTRING = 'amqp://rabbitmq:rabbitmq@localhost:5672/'      

def get_env():
    if "ENV_VERSION" not in os.environ:
        return DevConfig
    else:
        if os.environ['ENV_VERSION'] == 'production':
            ProdConfig.CONNECTSTRING= os.environ['MONGODBDBCONNECTSTRING']  
            ProdConfig.RABBITMQCONNECTSTRING =os.environ['AQMPCONNECTSTRING']  
            return  ProdConfig
        else:
            return DevConfig