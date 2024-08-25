from flask_server import db
from datetime import datetime

class Board(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    columns = db.relationship('Column', backref='board', lazy=True, cascade="all, delete-orphan")

class Column(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    position = db.Column(db.Integer, nullable=False)
    board_id = db.Column(db.Integer, db.ForeignKey('board.id'), nullable=False)
    tickets = db.relationship('Ticket', backref='column', lazy=True, cascade="all, delete-orphan")

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    position = db.Column(db.Integer, nullable=False)
    column_id = db.Column(db.Integer, db.ForeignKey('column.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
