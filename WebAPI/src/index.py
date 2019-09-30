from flask import jsonify, Flask, Response,json
from werkzeug.exceptions import HTTPException
from config import DevConfig
from config import ProdConfig
from bson.json_util import dumps
from  html import escape
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

@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response


@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
  
    return   Response('User %s' % escape(username), mimetype='application/json')

@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id

@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    # show the subpath after /path/
    return 'Subpath %s' % escape(subpath)
# 判斷自己執行非被當做引入的模組，因為 __name__ 這變數若被當做模組引入使用就不會是 __main__
if __name__ == '__main__':
    app.run(host='0.0.0.0')