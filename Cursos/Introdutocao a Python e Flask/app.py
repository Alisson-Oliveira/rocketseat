from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user

application = Flask(__name__)
application.config['SECRET_KEY'] = '3f5ty805th79wertuiop89567'
application.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'

login_manager = LoginManager()

db = SQLAlchemy(application)

login_manager.init_app(application)
login_manager.login_view = 'login'

CORS(application)

## MODELS ##

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=True)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(20), nullable=True)
    cart = db.relationship('CartItem', backref='user', lazy=True)

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)

## AUTH ##

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@login_manager.unauthorized_handler
def unauthorized():
    return jsonify({ 'message': 'Unauthorized. User not logged in' }), 401

@application.route('/login', methods=['POST'])
def login():
    body = request.json

    user = User.query.filter_by(username=body.get('username')).first()

    if user and (body.get('password') == user.password):
        login_user(user)

        return jsonify({ 'message': 'Logged in successfully' })

    return jsonify({ 'message': 'Unauthorized. Invalid credentials' }), 401

@application.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({ 'message': 'Logout successfully' })

## PRODUCT ##

@application.route('/api/products/add', methods=['POST'])
@login_required
def add_product():
    body = request.json

    if 'name' in body and 'price' in body:
        product = Product(
            name=body['name'],
            price=body['price'],
            description=body.get('description', '')
        )

        db.session.add(product)
        db.session.commit()

        return jsonify({ 'message': 'product registered successfully' })
    
    return jsonify({ 'message': 'Invalid product data' }), 400

@application.route('/api/products/delete/<int:product_id>', methods=['DELETE'])
@login_required
def delete_product(product_id):
    product = Product.query.get(product_id)

    if product:
        db.session.delete(product)
        db.session.commit()

        return jsonify({ 'message': 'Product deleted successfully' })
    
    return jsonify({ 'message': 'Product not found' }), 404

@application.route('/api/products/<int:product_id>', methods=['GET'])
def get_product_details(product_id):
    product = Product.query.get(product_id)

    if product:
        return jsonify({
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'description': product.description,
        })
    
    return jsonify({ 'message': 'Product not found' }), 404

@application.route('/api/products/update/<int:product_id>', methods=['PUT'])
@login_required
def update_product(product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({ 'message': 'Product not found' }), 404
    
    body = request.json

    if 'name' in body:
        product.name = body['name']

    if 'price' in body:
        product.price = body['price']

    if 'description' in body:
        product.description = body['description']

    db.session.commit()

    return jsonify({ 'message': 'Product updated successfully' })

@application.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()

    product_list = []
    for product in products:
        product_data = {
            'id': product.id,
            'name': product.name,
            'price': product.price,
        }

        product_list.append(product_data)

    return jsonify(product_list)


## CART ##

@application.route('/api/cart/add/<int:product_id>', methods=['POST'])
@login_required
def add_product_to_card(product_id):
    user = User.query.get(int(current_user.id))
    product = Product.query.get(int(product_id))

    if user and product:
        cart_item = CartItem(user_id=user.id, product_id=product.id)

        db.session.add(cart_item)
        db.session.commit()

        return jsonify({ 'message': 'Item added to the cart successfully' })
    
    return jsonify({ 'message': 'Failed to add item to the cart' }), 400

@application.route('/api/cart/remove/<int:product_id>', methods=['DELETE'])
@login_required
def remove_product_from_card(product_id):
    cart_item = CartItem.query.filter_by(
        user_id=int(current_user.id),
        product_id=int(product_id)
    ).first()

    if cart_item:
        db.session.delete(cart_item)
        db.session.commit()

        return jsonify({ 'message': 'Item removed to the cart successfully' })
    
    return jsonify({ 'message': 'Failed to remove item to the cart' }), 400

@application.route('/api/cart', methods=['GET'])
@login_required
def view_cart():
    user = User.query.get(int(current_user.id))
    cart_items = user.cart

    cart_items_list = []
    for item in cart_items:
        product = Product.query.get(int(item.id))

        item_data = {
            'id': item.id,
            'product_id': item.product_id,
            'product_name': product.name,
            'product_price': product.price,
        }

        cart_items_list.append(item_data)

    return jsonify(cart_items_list)

@application.route('/api/cart/checkout', methods=['POST'])
@login_required
def checkout_cart():
    user = User.query.get(int(current_user.id))
    cart_items = user.cart

    for item in cart_items:
        db.session.delete(item)

    db.session.commit()

    return jsonify({ 'message': 'Check successful. Cart has been cleared' })

## MAIN ##

@application.route('/')
def init():
    return jsonify({ 'message': 'Server On' })

if __name__ == '__main__':
    application.run(debug=True)