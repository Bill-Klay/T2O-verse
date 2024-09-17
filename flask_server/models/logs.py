from datetime import datetime
from flask_server import db
from flask_login import current_user
from.user import User

class LogEntry(db.Model):
    __tablename__ = 'log_entry'
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    log_level = db.Column(db.String(10))
    message = db.Column(db.Text)
    client_ip = db.Column(db.String(15))
    user_agent = db.Column(db.Text)
    user_email = db.Column(db.String(60))

    def __repr__(self):
        return f'<LogEntry {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'timestamp': self.timestamp.isoformat(),
            'log_level': self.log_level,
            'message': self.message,
            'client_ip': self.client_ip,
            'user_agent': self.user_agent,
            'user_email': self.user_email
        }