import pymongo
def ListCollection(ConnectString):
    client = pymongo.MongoClient(ConnectString)
    DB=client.News
    collection=DB.ithomes
    return collection.find({})
#mongodb://root:example@localhost:1769/