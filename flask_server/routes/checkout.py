from flask import current_app, Blueprint, jsonify
import requests

checkout_bp = Blueprint('checkout', __name__)

@checkout_bp.route('/checkout', methods=['GET'])
def lemonsqueezy():
    api_key = current_app.config['LEMONSQUEEZY_SECRET_KEY']
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.api+json'
    }
    response = requests.get('https://api.lemonsqueezy.com/v1/orders', headers=headers)
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the JSON response
        orders = response.json()
        print("Orders:", orders)
        return jsonify(success=True, message="Purchase successful"), 200
    else:
        print("Failed to retrieve orders. Status code:", response.status_code)
        return jsonify(success=False, message="Purchase failed"), 400
