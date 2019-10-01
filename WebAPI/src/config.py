import os
class Config(object):
    pass

class ProdConfig(Config):
    CONNECTSTRING='mongodb://root:example@localhost:1769/'

class DevConfig(Config):
    DEBUG = True
    CONNECTSTRING='mongodb://root:example@localhost:1769/'
    

def get_env(config):
    if "CONFIG" not in os.environ:
        return DevConfig
    else:
        if os.environ['CONFIG'] == 'prod':
            return  ProdConfig
        else:
            return DevConfig