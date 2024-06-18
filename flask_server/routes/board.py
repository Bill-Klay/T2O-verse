from flask import Blueprint, request, jsonify
from flask_server.models.tickets import Board, Column, Ticket
from flask_server import db
from flask_login import login_required, current_user

board_bp = Blueprint('board', __name__)

# Boards CRUD
@board_bp.route('/boards', methods=['GET', 'POST'])
@login_required
def handle_boards():
    if not current_user.has_role('Admin') or not current_user.has_role('Edit'):
        return jsonify({'error': 'Unauthorized access'}), 403
    if request.method == 'POST':
        data = request.json
        new_board = Board(name=data['name'])
        db.session.add(new_board)
        db.session.commit()
        return jsonify({'id': new_board.id}), 201
    else:
        boards = Board.query.all()
        return jsonify([{'id': b.id, 'name': b.name} for b in boards])

# Columns CRUD
@board_bp.route('/boards/<int:board_id>/columns', methods=['GET', 'POST'])
@login_required
def handle_columns(board_id):
    if not current_user.has_role('Admin') or not current_user.has_role('Edit'):
        return jsonify({'error': 'Unauthorized access'}), 403
    if request.method == 'POST':
        data = request.json
        new_column = Column(name=data['name'], position=data['position'], board_id=board_id)
        db.session.add(new_column)
        db.session.commit()
        return jsonify({'id': new_column.id}), 201
    else:
        columns = Column.query.filter_by(board_id=board_id).all()
        return jsonify([{'id': c.id, 'name': c.name, 'position': c.position} for c in columns])

# Tickets CRUD
@board_bp.route('/columns/<int:column_id>/tickets', methods=['GET', 'POST'])
@login_required
def handle_tickets(column_id):
    if not current_user.has_role('Admin') or not current_user.has_role('Edit'):
        return jsonify({'error': 'Unauthorized access'}), 403
    if request.method == 'POST':
        data = request.json
        new_ticket = Ticket(title=data['title'], description=data['description'], position=data['position'], column_id=column_id)
        db.session.add(new_ticket)
        db.session.commit()
        return jsonify({'id': new_ticket.id}), 201
    else:
        tickets = Ticket.query.filter_by(column_id=column_id).all()
        return jsonify([{'id': t.id, 'title': t.title, 'description': t.description, 'position': t.position} for t in tickets])

