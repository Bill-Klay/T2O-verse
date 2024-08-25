from datetime import datetime
from flask_server import db

class StripeProduct(db.Model):
    """
    Model for Stripe Product.
    """
    __tablename__ = 'stripe_products'
    id = db.Column(db.Integer, primary_key=True)  # Auto-incrementing integer ID
    product_id = db.Column(db.String(255), nullable=False, unique=True)  # Stripe product ID
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    active = db.Column(db.Boolean, default=True)
    attributes = db.Column(db.JSON, nullable=True)
    caption = db.Column(db.String(255), nullable=True)
    images = db.Column(db.JSON, nullable=True)
    livemode = db.Column(db.Boolean, default=False)
    product_metadata = db.Column(db.JSON, nullable=True)
    package_dimensions = db.Column(db.JSON, nullable=True)
    shippable = db.Column(db.Boolean, nullable=True)
    statement_descriptor = db.Column(db.String(22), nullable=True)
    type = db.Column(db.String(50), nullable=False, default='service')
    unit_label = db.Column(db.String(12), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    url = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'name': self.name,
            'description': self.description,
            'active': self.active,
            'attributes': self.attributes,
            'caption': self.caption,
            'images': self.images,
            'livemode': self.livemode,
            'product_metadata': self.product_metadata,
            'package_dimensions': self.package_dimensions,
            'shippable': self.shippable,
            'statement_descriptor': self.statement_descriptor,
            'type': self.type,
            'unit_label': self.unit_label,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'url': self.url
        }

class StripePrice(db.Model):
    """
    Model for Stripe Price.
    """
    __tablename__ = 'stripe_prices'
    id = db.Column(db.Integer, primary_key=True)  # Auto-incrementing integer ID
    price_id = db.Column(db.String(255), nullable=False, unique=True)  # Stripe price ID
    product_id = db.Column(db.String(255), db.ForeignKey('stripe_products.product_id'), nullable=False)
    # unit_amount = db.Column(db.Integer, nullable=False)  # Amount in cents
    unit_amount = db.Column(db.Float, nullable=False)  # Amount in dollars
    currency = db.Column(db.String(10), nullable=False, default='usd')
    recurring = db.Column(db.JSON, nullable=True)  # e.g., {'interval': 'month'}
    active = db.Column(db.Boolean, default=True)
    billing_scheme = db.Column(db.String(50), nullable=True)  # e.g., 'per_unit', 'tiered'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    tiers = db.Column(db.JSON, nullable=True)
    tiers_mode = db.Column(db.String(50), nullable=True)  # e.g., 'volume', 'graduated'
    transform_quantity = db.Column(db.JSON, nullable=True)
    lookup_key = db.Column(db.String(255), nullable=True)
    price_metadata = db.Column(db.JSON, nullable=True)
    nickname = db.Column(db.String(255), nullable=True)
    type = db.Column(db.String(50), nullable=True)  # e.g., 'one_time', 'recurring'

    product = db.relationship('StripeProduct', backref=db.backref('prices', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'price_id': self.price_id,
            'product_id': self.product_id,
            'unit_amount': self.unit_amount,
            'currency': self.currency,
            'recurring': self.recurring,
            'active': self.active,
            'billing_scheme': self.billing_scheme,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'tiers': self.tiers,
            'tiers_mode': self.tiers_mode,
            'transform_quantity': self.transform_quantity,
            'lookup_key': self.lookup_key,
            'price_metadata': self.price_metadata,
            'nickname': self.nickname,
            'type': self.type
        }

class StripeSubscription(db.Model):
    """
    Model for Stripe Subscription.
    """
    __tablename__ = 'stripe_subscriptions'
    id = db.Column(db.Integer, primary_key=True)  # Auto-incrementing integer ID
    subscription_id = db.Column(db.String(255), nullable=False, unique=True)  # Stripe subscription ID
    user_id = db.Column(db.String(32), db.ForeignKey('user.id'), nullable=False)
    price_id = db.Column(db.String(255), db.ForeignKey('stripe_prices.price_id'), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    previous_status = db.Column(db.String(50), nullable=True)  # Add this line
    current_period_end = db.Column(db.DateTime, nullable=False)
    trial_end = db.Column(db.DateTime, nullable=True)  # Added field for trial end date
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('subscriptions', lazy=True))
    price = db.relationship('StripePrice', backref=db.backref('subscriptions', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'subscription_id': self.subscription_id,
            'user_id': self.user_id,
            'price_id': self.price_id,
            'status': self.status,
            'previous_status': self.previous_status,  # Add this line
            'current_period_end': self.current_period_end.isoformat(),
            'trial_end': self.trial_end.isoformat() if self.trial_end else None,  # Include trial end in the dict
            'created_at': self.created_at.isoformat()
        }
