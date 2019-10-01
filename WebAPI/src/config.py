import os
class Config(object):
    pass

class ProdConfig(Config):
    CONNECTSTRING='mongodb://root:example@localhost:1769/'

class DevConfig(Config):
    DEBUG = True
    CONNECTSTRING='mongodb://root:example@localhost:1769/'
    

def get_env():
    if "ENV_VERSION" not in os.environ:
        return DevConfig
    else:
        if os.environ['ENV_VERSION'] == 'prodoction':
            return  ProdConfig
        else:
            return DevConfig