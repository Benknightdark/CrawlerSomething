from flask import jsonify, Flask, Response
from config import DevConfig
from config import ProdConfig
from bson.json_util import dumps

import DB.DataBase
import os
if "CONFIG" not in os.environ:
    config = DevConfig
else:
    if os.environ['CONFIG'] == 'prod':
        config = ProdConfig
    else:
        config = DevConfig

# 初始化 Flask 類別成為 instance
app = Flask(__name__)
app.config.from_object(config)


# 路由和處理函式配對
@app.route('/api/ithome')
def Get():
    data = DB.DataBase.ListCollection(config.CONNECTSTRING)
    return Response(dumps(data), mimetype='application/json')
  
# 判斷自己執行非被當做引入的模組，因為 __name__ 這變數若被當做模組引入使用就不會是 __main__
if __name__ == '__main__':
    app.run(host='0.0.0.0')