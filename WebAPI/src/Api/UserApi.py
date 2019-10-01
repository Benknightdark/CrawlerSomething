from flask import jsonify, Flask, Response,json,request,Blueprint
from bson.json_util import dumps
from  html import escape
user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/user/<username>',methods=['GET', 'POST'])
def show_user_profile(username):
    # show the user profile for that user
    content = request.get_json(silent=True)
    print(content)
    return   Response(dumps(content), mimetype='application/json')

@user_blueprint.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id

@user_blueprint.route('/path/<path:subpath>')
def show_subpath(subpath):
    # show the subpath after /path/
    return 'Subpath %s' % escape(subpath)