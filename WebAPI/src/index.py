from bson.json_util import dumps
from flask import Flask, Response, json, jsonify, request
from werkzeug.exceptions import HTTPException
from Api.ITHomeApi import ithome_blueprint
from Api.UserApi import user_blueprint
from config import get_env
from Middlewares.HttpMiddleware import HTTPMethodOverrideMiddleware
from Shared.CustomErrorHandler import InvalidUsage
from flask_cors import CORS

# 初始化 Flask 類別成為 instance
app = Flask(__name__)
app.config.from_object(get_env())
app.wsgi_app = HTTPMethodOverrideMiddleware(app.wsgi_app)

app.register_blueprint(ithome_blueprint, url_prefix='/api/ithome')

app.register_blueprint(user_blueprint)
CORS(app)


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
@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


# 判斷自己執行非被當做引入的模組，因為 __name__ 這變數若被當做模組引入使用就不會是 __main__
if __name__ == '__main__':
    app.run(host='0.0.0.0')
