'''
Summary of Routes

# Price Routes
POST /create-price: Create a new price.
POST /edit-price: Edit an existing price.
POST /delete-price: Delete a price.
POST /prices: Get all prices.
POST /price: Get a specific price by ID.
POST /prices-for-product: Get all prices for a specific product by ID.

'''

from flask import Blueprint, request, jsonify, current_app, url_for
import stripe
from datetime import datetime
from flask_server import db
from flask_server.models.user import User
from flask_server.models.purchase import Order, StripePrice, StripeProduct, StripeSubscription

stripe.api_key = current_app.config['STRIPE_PRIVATE_KEY']

stripe_bp = Blueprint('stripe', __name__)

# Price Routes

@stripe_bp.route('/create-price', methods=['POST'])
def create_price():
    """
    Route to create a new price in Stripe for a given product and store it in the local database.
    """
    data = request.json
    try:
        current_app.logger.info("Creating a new price with data: %s", data)  # Log request data
        amount_in_cents = int(float(data['unit_amount']) * 100) # Convert dollars to cents for Stripe

        price_data = {
            'unit_amount': amount_in_cents,
            'currency': data['currency'],
            'product': data['product_id'],
            'active': data.get('active', True),
            'billing_scheme': data.get('billing_scheme'),
            'lookup_key': data.get('lookup_key'),
            'metadata': data.get('price_metadata'),
            'nickname': data.get('nickname'),
            'transform_quantity': data.get('transform_quantity')
        }

        if data.get('recurring'):
            price_data['recurring'] = {'interval': data['recurring']['interval']}
        
        if data.get('tiers'):
            price_data['tiers'] = data['tiers']
        
        if data.get('tiers_mode'):
            price_data['tiers_mode'] = data['tiers_mode']

        # Remove type as it is not accepted by Stripe API
        price_data.pop('type', None)
        price_data.pop('trial_period_days', None)

        price = stripe.Price.create(**price_data)

        new_price = StripePrice(
            price_id=price['id'],
            product_id=price['product'],
            unit_amount=float(price['unit_amount'])/100, # Convert cents to dollars
            currency=price['currency'],
            recurring=price.get('recurring'),
            active=price['active'],
            billing_scheme=price.get('billing_scheme'),
            lookup_key=price.get('lookup_key'),
            price_metadata=price.get('metadata'),
            nickname=price.get('nickname'),
            tiers=price.get('tiers'),
            tiers_mode=price.get('tiers_mode'),
            transform_quantity=price.get('transform_quantity'),
            type='recurring' if price.get('recurring') else 'one_time'
        )
        db.session.add(new_price)
        db.session.commit()
        current_app.logger.info("Price created successfully: %s", new_price.to_dict())  # Log success
        return jsonify(new_price.to_dict()), 201
    except Exception as e:
        current_app.logger.error("Error creating price: %s", str(e))  # Log error
        return jsonify({'error': str(e)}), 400

@stripe_bp.route('/edit-price', methods=['POST'])
def edit_price():
    """
    Route to edit an existing price by deactivating the old price and creating a new one in Stripe,
    then updating it in the local database.
    """
    data = request.json
    old_price_id = data['price_id']
    lookup_key = data.get('lookup_key')
    
    try:
        current_app.logger.info("Editing price %s with data: %s", old_price_id, data)  # Log request data
        old_price = StripePrice.query.filter_by(price_id=old_price_id).first()
        if not old_price:
            current_app.logger.warning("Price not found: %s", old_price_id)  # Log warning
            return jsonify({'error': 'Price not found'}), 404

        # Check if a new lookup key is provided and if it already exists
        if lookup_key:
            existing_price_with_lookup_key = StripePrice.query.filter_by(lookup_key=lookup_key).first()
            if existing_price_with_lookup_key and existing_price_with_lookup_key.price_id != old_price_id:
                current_app.logger.warning("Lookup key %s is already in use", lookup_key)  # Log warning
                return jsonify({'error': 'A price with this lookup key already exists'}), 400

        # Deactivate the old price in Stripe
        stripe.Price.modify(old_price_id, active=False)

        # Create a new price in Stripe
        new_price_data = {
            'unit_amount': int(float(data['unit_amount']) * 100), # Convert dollars to cents for Stripe
            'currency': data['currency'],
            'product': old_price.product_id,
            'active': data.get('active', True),
            'billing_scheme': data.get('billing_scheme'),
            'metadata': data.get('price_metadata'),
            'nickname': data.get('nickname'),
            'tiers': data.get('tiers'),
            'tiers_mode': data.get('tiers_mode'),
            'transform_quantity': data.get('transform_quantity')
        }

        if data['type'] == 'recurring':
            new_price_data['recurring'] = {'interval': data['interval']}

        if lookup_key:
            new_price_data['lookup_key'] = lookup_key

        new_price = stripe.Price.create(**new_price_data)

        # Update the local database with the new price details
        old_price.price_id = new_price['id']
        old_price.unit_amount = float(new_price['unit_amount'])/100 # Convert cents to dollars
        old_price.currency = new_price['currency']
        old_price.recurring = new_price.get('recurring')
        old_price.active = new_price['active']
        old_price.billing_scheme = new_price.get('billing_scheme')
        old_price.lookup_key = new_price.get('lookup_key')
        old_price.price_metadata = new_price.get('metadata')
        old_price.nickname = new_price.get('nickname')
        old_price.tiers = new_price.get('tiers')
        old_price.tiers_mode = new_price.get('tiers_mode')
        old_price.transform_quantity = new_price.get('transform_quantity')
        old_price.type = 'recurring' if new_price.get('recurring') else 'one_time'

        db.session.commit()
        current_app.logger.info("Price edited successfully: %s", old_price.to_dict())  # Log success
        return jsonify(old_price.to_dict()), 200
    except Exception as e:
        current_app.logger.error("Error editing price: %s", str(e))  # Log error
        return jsonify({'error': str(e)}), 400

@stripe_bp.route('/delete-price', methods=['POST'])
def delete_price():
    """
    Route to delete an existing price in Stripe and remove it from the local database.
    """
    data = request.json
    price_id = data['price_id']
    try:
        current_app.logger.info("Deleting price %s", price_id)  # Log request data
        price = StripePrice.query.filter_by(price_id=price_id).first()
        if not price:
            current_app.logger.warning("Price not found: %s", price_id)  # Log warning
            return jsonify({'error': 'Price not found'}), 404

        try:
            # Attempt to deactivate the price in Stripe
            stripe.Price.delete(price_id)
        except stripe.error.InvalidRequestError as e:
            current_app.logger.warning("Stripe price not found, deleting locally: %s", str(e))  # Log warning

        # Delete the price from the local database
        db.session.delete(price)
        db.session.commit()
        current_app.logger.info("Price deleted successfully: %s", price_id)  # Log success
        return jsonify({'message': 'Price deleted successfully'}), 200
    except Exception as e:
        current_app.logger.error("Error deleting price: %s", str(e))  # Log error
        return jsonify({'error': str(e)}), 400


@stripe_bp.route('/prices-for-product', methods=['POST'])
def get_prices_for_product():
    """
    Route to get prices for a specific product from the local database.
    """
    data = request.json
    product_id = data['product_id']
    try:
        current_app.logger.info("Fetching prices for product %s", product_id)
        prices = StripePrice.query.filter_by(product_id=product_id).all()
        return jsonify([price.to_dict() for price in prices]), 200
    except Exception as e:
        current_app.logger.error("Error fetching prices for product %s: %s", product_id, str(e))
        return jsonify({'error': str(e)}), 400

@stripe_bp.route('/prices', methods=['POST'])
def get_prices():
    """
    Route to get all prices from the local database.
    """
    try:
        current_app.logger.info("Fetching all prices")
        prices = StripePrice.query.all()
        return jsonify([price.to_dict() for price in prices]), 200
    except Exception as e:
        current_app.logger.error("Error fetching prices: %s", str(e))
        return jsonify({'error': str(e)}), 400

@stripe_bp.route('/price', methods=['POST'])
def get_price():
    """
    Route to fetch a specific price by its ID from the local database.
    """
    data = request.json
    price_id = data['price_id']
    try:
        current_app.logger.info("Fetching price %s", price_id)
        price = StripePrice.query.filter_by(price_id=price_id).first()
        if not price:
            current_app.logger.warning("Price not found: %s", price_id)
            return jsonify({'error': 'Price not found'}), 404
        return jsonify(price.to_dict()), 200
    except Exception as e:
        current_app.logger.error("Error fetching price: %s", str(e))
        return jsonify({'error': str(e)}), 400

'''
Summary of Routes

# Product Routes
POST /create-product: Create a new product.
PUT /edit-product: Edit an existing product.
DELETE /delete-product: Delete a product.
POST /products: Get all products.
POST /product: Get a specific product by ID.

'''

# Product Routes

@stripe_bp.route('/create-product', methods=['POST'])
def create_product():
    """
    Route to create a new product in Stripe and store it in the local database.
    """
    data = request.json
    try:
        current_app.logger.info("Creating a new product with data: %s", data)
        product = stripe.Product.create(
            name=data['name'],
            description=data.get('description'),
            active=data.get('active', True),
            attributes=data.get('attributes'),
            caption=data.get('caption'),
            images=data.get('images'),
            metadata=data.get('metadata'),
            package_dimensions=data.get('package_dimensions'),
            shippable=data.get('shippable'),
            statement_descriptor=data.get('statement_descriptor'),
            unit_label=data.get('unit_label'),
            url=data.get('url')
        )
        new_product = StripeProduct(
            product_id=product['id'],
            name=product['name'],
            description=product.get('description'),
            active=product['active'],
            attributes=product.get('attributes'),
            caption=product.get('caption'),
            images=product.get('images'),
            livemode=product['livemode'],
            product_metadata=product.get('metadata'),
            package_dimensions=product.get('package_dimensions'),
            shippable=product.get('shippable'),
            statement_descriptor=product.get('statement_descriptor'),
            type=product['type'],
            unit_label=product.get('unit_label'),
            url=product.get('url')
        )
        db.session.add(new_product)
        db.session.commit()
        current_app.logger.info("Product created successfully: %s", new_product.to_dict())
        return jsonify(new_product.to_dict()), 201
    except Exception as e:
        current_app.logger.error("Error creating product: %s", str(e))
        return jsonify({'error': str(e)}), 400

@stripe_bp.route('/edit-product', methods=['POST'])
def edit_product():
    """
    Route to edit an existing product in Stripe and update it in the local database.
    """
    data = request.json
    product_id = data['product_id']
    try:
        current_app.logger.info("Editing product %s with data: %s", product_id, data)
        product = StripeProduct.query.filter_by(product_id=product_id).first()
        if not product:
            current_app.logger.warning("Product not found: %s", product_id)
            return jsonify({'error': 'Product not found'}), 404

        updated_product = stripe.Product.modify(
            product_id,
            name=data['name'],
            description=data.get('description'),
            active=data.get('active', True),
            attributes=data.get('attributes'),
            caption=data.get('caption'),
            images=data.get('images'),
            metadata=data.get('product_metadata'),
            package_dimensions=data.get('package_dimensions'),
            shippable=data.get('shippable'),
            statement_descriptor=data.get('statement_descriptor'),
            unit_label=data.get('unit_label'),
            url=data.get('url')
        )

        product.name = updated_product['name']
        product.description = updated_product.get('description')
        product.active = updated_product['active']
        product.attributes = updated_product.get('attributes')
        product.caption = updated_product.get('caption')
        product.images = updated_product.get('images')
        product.livemode = updated_product['livemode']
        product.product_metadata = updated_product.get('metadata')
        product.package_dimensions = updated_product.get('package_dimensions')
        product.shippable = updated_product.get('shippable')
        product.statement_descriptor = updated_product.get('statement_descriptor')
        product.type = updated_product['type']
        product.unit_label = updated_product.get('unit_label')
        product.url = updated_product.get('url')

        db.session.commit()
        current_app.logger.info("Product updated successfully: %s", product.to_dict())
        return jsonify(product.to_dict()), 200
    except Exception as e:
        current_app.logger.error("Error editing product: %s", str(e))
        return jsonify({'error': str(e)}), 400

@stripe_bp.route('/delete-product', methods=['DELETE'])
def delete_product():
    """
    Route to delete a product in Stripe and remove it from the local database.
    """
    data = request.json
    product_id = data['product_id']
    try:
        current_app.logger.warning("Deleting product %s", product_id)
        product = StripeProduct.query.filter_by(product_id=product_id).first()
        if not product:
            return jsonify({'error': 'Product not found'}), 404

        stripe.Product.delete(product_id)
        db.session.delete(product)
        db.session.commit()
        current_app.logger.info("Product deleted successfully: %s", product_id)
        return jsonify({'message': 'Product deleted successfully'}), 200
    except Exception as e:
        current_app.logger.error("Error deleting product: %s", str(e))
        return jsonify({'error': str(e)}), 400

@stripe_bp.route('/products', methods=['POST'])
def get_products():
    """
    Route to fetch all products from the local database.
    """
    try:
        current_app.logger.info("Fetching all products")
        products = StripeProduct.query.all()
        return jsonify([product.to_dict() for product in products]), 200
    except Exception as e:
        current_app.logger.error("Error fetching products: %s", str(e))
        return jsonify({'error': str(e)}), 400

@stripe_bp.route('/product', methods=['POST'])
def get_product():
    """
    Route to fetch a specific product by its ID from the local database.
    """
    data = request.json
    product_id = data['product_id']
    try:
        current_app.logger.info("Fetching product %s", product_id)
        product = StripeProduct.query.filter_by(product_id=product_id).first()
        if not product:
            current_app.logger.warning("Product not found: %s", product_id)
            return jsonify({'error': 'Product not found'}), 404
        return jsonify(product.to_dict()), 200
    except Exception as e:
        current_app.logger.error("Error fetching product: %s", str(e))
        return jsonify({'error': str(e)}), 400

'''
Summary of Routes

# Subscription Routes
Create Subscription: create-subscription.ts calls the corresponding Flask route.
Update Subscription: update-subscription.ts calls the corresponding Flask route.
Deactivate Subscription: deactivate-subscription.ts calls the corresponding Flask route.
Reactivate Subscription: reactivate-subscription.ts calls the corresponding Flask route.
Delete Subscription: delete-subscription.ts calls the corresponding Flask route.
Fetch Subscriptions: subscriptions.ts calls the corresponding Flask route.

'''

# Subscription Routes

# Create a new subscription
@stripe_bp.route('/create-subscription', methods=['POST'])
def create_subscription():
    data = request.json
    user_id = data.get('user_id')
    email = data.get('email')
    price_id = data['price_id']
    trial_period_days = int(data.get('trial_period_days', 0))

    user = None
    if user_id:
        user = User.query.get(user_id)
    elif email:
        user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    if not user.stripe_customer_id:
        try:
            customer = stripe.Customer.create(email=user.email)
            user.stripe_customer_id = customer['id']
            db.session.commit()
        except Exception as e:
            current_app.logger.error("Error creating Stripe customer: %s", str(e))
            return jsonify({'error': str(e)}), 400

    try:
        current_app.logger.info("Creating subscription for user %s with price %s", user.id, price_id)

        subscription_data = {
            'customer': user.stripe_customer_id,
            'items': [{'price': price_id}],
            'expand': ['latest_invoice.payment_intent']
        }

        if trial_period_days > 0:
            subscription_data['trial_period_days'] = trial_period_days

        subscription = stripe.Subscription.create(**subscription_data)

        trial_end = subscription.get('trial_end')
        trial_end_date = datetime.fromtimestamp(trial_end) if trial_end else None

        new_subscription = StripeSubscription(
            subscription_id=subscription['id'],
            user_id=user.id,
            price_id=price_id,
            status=subscription['status'],
            current_period_end=datetime.fromtimestamp(subscription['current_period_end']),
            trial_end=trial_end_date
        )
        db.session.add(new_subscription)
        db.session.commit()
        current_app.logger.info("Subscription created successfully: %s", new_subscription.to_dict())
        return jsonify(new_subscription.to_dict()), 201
    except Exception as e:
        current_app.logger.error("Error creating subscription: %s", str(e))
        return jsonify({'error': str(e)}), 400

# Update an existing subscription
@stripe_bp.route('/update-subscription', methods=['POST'])
def update_subscription():
    data = request.json
    user_id = data.get('user_id')
    email = data.get('email')
    new_price_id = data['new_price_id']

    user = None
    if user_id:
        user = User.query.get(user_id)
    elif email:
        user = User.query.filter_by(email=email).first()
    
    if not user:
        current_app.logger.warning("User not found: %s or %s", user_id, email)
        return jsonify({'error': 'User not found'}), 404

    subscription = StripeSubscription.query.filter_by(user_id=user.id).first()
    if not subscription:
        current_app.logger.warning("Subscription not found for user: %s", user.id)
        return jsonify({'error': 'Subscription not found'}), 404

    try:
        current_app.logger.info("Updating subscription %s to new price %s", subscription.subscription_id, new_price_id)
        
        # Find the subscription item ID to update
        subscription_item_id = stripe.Subscription.retrieve(subscription.subscription_id)['items']['data'][0]['id']
        
        updated_subscription = stripe.Subscription.modify(
            subscription.subscription_id,
            cancel_at_period_end=False,
            items=[{
                'id': subscription_item_id,
                'price': new_price_id,
            }],
        )
        subscription.price_id = new_price_id
        subscription.status = updated_subscription['status']
        subscription.current_period_end = datetime.fromtimestamp(updated_subscription['current_period_end'])
        db.session.commit()
        current_app.logger.info("Subscription updated successfully: %s", subscription.to_dict())
        return jsonify(subscription.to_dict()), 200
    except Exception as e:
        current_app.logger.error("Error updating subscription: %s", str(e))
        return jsonify({'error': str(e)}), 400

# Cancel an existing subscription at the end of the current period
@stripe_bp.route('/cancel-subscription', methods=['POST'])
def cancel_subscription():
    data = request.json
    subscription_id = data['subscription_id']
    try:
        current_app.logger.info("Canceling subscription %s at period end", subscription_id)
        subscription = StripeSubscription.query.filter_by(subscription_id=subscription_id).first()
        if not subscription:
            current_app.logger.warning("Subscription not found: %s", subscription_id)
            return jsonify({'error': 'Subscription not found'}), 404

        stripe.Subscription.modify(subscription_id, cancel_at_period_end=True)
        
        subscription.status = "canceled_at_period_end"
        db.session.commit()
        current_app.logger.info("Subscription will be canceled at period end: %s", subscription_id)
        return jsonify({'message': 'Subscription will be canceled at period end'}), 200
    except Exception as e:
        current_app.logger.error("Error canceling subscription: %s", str(e))
        return jsonify({'error': str(e)}), 400

# Deactivate an existing subscription (suspend it)
@stripe_bp.route('/deactivate-subscription', methods=['POST'])
def deactivate_subscription():
    data = request.json
    subscription_id = data.get('subscription_id')
    
    try:
        current_app.logger.info("Deactivating subscription %s", subscription_id)
        subscription = StripeSubscription.query.filter_by(subscription_id=subscription_id).first()
        if not subscription:
            current_app.logger.warning("Subscription not found: %s", subscription_id)
            return jsonify({'error': 'Subscription not found'}), 404

        # Use the `pause_collection` method
        stripe.Subscription.modify(subscription_id, pause_collection={"behavior": "mark_uncollectible"})

        subscription.status = "paused"
        db.session.commit()
        current_app.logger.info("Subscription deactivated (paused) successfully: %s", subscription_id)
        return jsonify({'message': 'Subscription deactivated (paused) successfully'}), 200
    except Exception as e:
        current_app.logger.error("Error deactivating subscription: %s", str(e))
        return jsonify({'error': str(e)}), 400

# Reactivate a paused subscription
@stripe_bp.route('/reactivate-subscription', methods=['POST'])
def reactivate_subscription():
    data = request.json
    subscription_id = data.get('subscription_id')
    
    try:
        current_app.logger.info("Reactivating subscription %s", subscription_id)
        subscription = StripeSubscription.query.filter_by(subscription_id=subscription_id).first()
        if not subscription:
            current_app.logger.warning("Subscription not found: %s", subscription_id)
            return jsonify({'error': 'Subscription not found'}), 404

        if subscription.status != 'paused':
            return jsonify({'error': 'Only paused subscriptions can be reactivated'}), 400

        # stripe.Subscription.update(subscription_id, pause_collection='')

        # Use the `pause_collection` method
        stripe.Subscription.modify(subscription_id, pause_collection=None)
        
        subscription.status = "active"
        db.session.commit()
        current_app.logger.info("Subscription reactivated successfully: %s", subscription_id)
        return jsonify({'message': 'Subscription reactivated successfully'}), 200
    except Exception as e:
        current_app.logger.error("Error reactivating subscription: %s", str(e))
        return jsonify({'error': str(e)}), 400

# Delete a subscription immediately
@stripe_bp.route('/delete-subscription', methods=['POST'])
def delete_subscription():
    data = request.json
    subscription_id = data['subscription_id']
    try:
        current_app.logger.info("Deleting subscription %s", subscription_id)
        subscription = StripeSubscription.query.filter_by(subscription_id=subscription_id).first()
        if not subscription:
            current_app.logger.warning("Subscription not found: %s", subscription_id)
            return jsonify({'error': 'Subscription not found'}), 404

        try:
            # Attempt to delete the subscription from Stripe
            stripe.Subscription.delete(subscription_id)
        except stripe.error.InvalidRequestError as e:
            # If subscription is not found in Stripe, log the error
            current_app.logger.warning("Subscription not found in Stripe: %s", subscription_id)
        
        # Delete the subscription from the local database
        db.session.delete(subscription)
        db.session.commit()
        current_app.logger.info("Subscription deleted successfully: %s", subscription_id)
        return jsonify({'message': 'Subscription deleted successfully'}), 200
    except Exception as e:
        current_app.logger.error("Error deleting subscription: %s", str(e))
        return jsonify({'error': str(e)}), 400


# Get all subscriptions
@stripe_bp.route('/subscriptions', methods=['POST'])
def get_subscriptions():
    try:
        current_app.logger.info("Fetching all subscriptions")
        subscriptions = StripeSubscription.query.all()
        return jsonify([subscription.to_dict() for subscription in subscriptions]), 200
    except Exception as e:
        current_app.logger.error("Error fetching subscriptions: %s", str(e))
        return jsonify({'error': str(e)}), 400

# Get a specific subscription by ID
@stripe_bp.route('/subscription', methods=['POST'])
def get_subscription():
    data = request.json
    subscription_id = data['subscription_id']
    try:
        current_app.logger.info("Fetching subscription %s", subscription_id)
        subscription = StripeSubscription.query.filter_by(subscription_id=subscription_id).first()
        if not subscription:
            current_app.logger.warning("Subscription not found: %s", subscription_id)
            return jsonify({'error': 'Subscription not found'}), 404
        return jsonify(subscription.to_dict()), 200
    except Exception as e:
        current_app.logger.error("Error fetching subscription: %s", str(e))
        return jsonify({'error': str(e)}), 400

# Get all subscriptions for a specific user by their user ID
@stripe_bp.route('/user-subscriptions', methods=['POST'])
def get_user_subscriptions():
    data = request.json
    # user_id = data['user_id']
    user_id = data.get('user_id')
    try:
        current_app.logger.info("Fetching all subscriptions for user %s", user_id)
        subscriptions = StripeSubscription.query.filter_by(user_id=user_id).all()
        return jsonify([subscription.to_dict() for subscription in subscriptions]), 200
    except Exception as e:
        current_app.logger.error("Error fetching subscriptions for user: %s", str(e))
        return jsonify({'error': str(e)}), 400

# Get all subscriptions for a specific user by their email address
@stripe_bp.route('/user-email-subscriptions', methods=['POST'])
def get_user_email_subscriptions():
    data = request.json
    email = data.get('email')
    try:
        current_app.logger.info("Fetching subscriptions for user with email %s", email)
        user = User.query.filter_by(email=email).first()
        if not user:
            current_app.logger.warning("User not found: %s", email)
            return jsonify({'error': 'User not found'}), 404
        subscriptions = StripeSubscription.query.filter_by(user_id=user.id).all()
        return jsonify([subscription.to_dict() for subscription in subscriptions]), 200
    except Exception as e:
        current_app.logger.error("Error fetching subscriptions for user with email %s: %s", email, str(e))
        return jsonify({'error': str(e)}), 400

# Checkout session
@stripe_bp.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    """
    Route to create a Stripe checkout session.
    """
    data = request.json
    price_id = data.get('price_id')
    user_id = data.get('user_id')
    quantity = data.get('quantity', 1)
    mode = data.get('mode', 'payment')

    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    if not user.stripe_customer_id:
        try:
            customer = stripe.Customer.create(email=user.email)
            user.stripe_customer_id = customer['id']
            db.session.commit()
        except Exception as e:
            current_app.logger.error(f"Error creating Stripe customer: {str(e)}")
            return jsonify({'error': str(e)}), 400
    
    # Check if user is already subscribed to the selected plan
    if mode == "subscription":
        current_subscription = StripeSubscription.query.filter_by(user_id=user_id).first()
        if current_subscription and current_subscription.price_id == price_id:
            current_app.logger.error(f"User is already subscribed to this plan: {price_id}")
            return jsonify({'error': 'You are already subscribed to this plan'}), 400

    try:
        checkout_session = stripe.checkout.Session.create(
            customer=user.stripe_customer_id,
            payment_method_types=['card'],
            line_items=[
                {
                    'price': price_id,
                    'quantity': quantity,
                },
            ],
            mode=mode,
            success_url=url_for('stripe.checkout_success', _external=True) + '?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=url_for('stripe.checkout_cancel', _external=True),
            metadata={
                'user_id': user_id,
                'product_id': price_id,
                'quantity': quantity
            }
        )
        return jsonify({'checkout_url': checkout_session.url}), 200
    except Exception as e:
        current_app.logger.error(f"Error creating checkout session: {str(e)}")
        return jsonify({'error': str(e)}), 400

# Checkout success and failure
@stripe_bp.route('/checkout-success')
def checkout_success():
    session_id = request.args.get('session_id')
    if session_id:
        session = stripe.checkout.Session.retrieve(session_id)
        user_id = session.metadata.user_id  # Ensure you pass user_id in metadata when creating the session
        product_id = session.metadata.product_id  # Pass product_id in metadata
        quantity = session.metadata.quantity  # Pass quantity in metadata
        price = session.amount_total / 100  # Convert from cents to dollars

        # Create and save the order
        order = Order(user_id=user_id, product_id=product_id, quantity=quantity, price=price)
        db.session.add(order)
        db.session.commit()
        return jsonify({'message': 'Success! Your payment was received.', 'session': session})
    return 'No session ID found in the request', 400

@stripe_bp.route('/checkout-cancel')
def checkout_cancel():
    return 'Payment cancelled.', 200
