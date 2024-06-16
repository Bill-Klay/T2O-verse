from datetime import datetime
from flask_server import db

class LogEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    log_level = db.Column(db.String(10))
    message = db.Column(db.Text)
    client_ip = db.Column(db.String(15))
    user_agent = db.Column(db.Text)

    def __repr__(self):
        return f'<LogEntry {self.id}>'
