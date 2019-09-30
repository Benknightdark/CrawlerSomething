class Config(object):
    pass

class ProdConfig(Config):
    CONNECTSTRING='mongodb://root:example@localhost:1769/'

class DevConfig(Config):
    DEBUG = True
    CONNECTSTRING='mongodb://root:example@localhost:1769/'