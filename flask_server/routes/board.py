from flask import Blueprint, request, jsonify, abort
from flask_server.models.tickets import Board, Column, Ticket
from flask_server import db
from flask_login import login_required, current_user
from sqlalchemy.orm.exc import NoResultFound

board_bp = Blueprint('board', __name__)

# Boards CRUD
@board_bp.route('/boards', methods=['GET', 'POST', 'DELETE', 'PUT'])
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
    elif request.method == 'GET':
        boards = Board.query.all()
        return jsonify([{'id': b.id, 'name': b.name} for b in boards])
    else:
        board_id = request.json
        board = Board.query.get_or_404(board_id['id'])
        if request.method == 'DELETE':
            db.session.delete(board)
            db.session.commit()
            return '', 204  # No content
        elif request.method == 'PUT':
            data = request.json
            board.name = data.get('name', board.name)
            db.session.commit()
            return jsonify({'id': board.id, 'name': board.name}), 200

# Columns CRUD
@board_bp.route('/boards/<int:board_id>/columns', methods=['GET', 'POST', 'DELETE', 'PUT'])
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
    elif request.method == 'GET':
        columns = Column.query.filter_by(board_id=board_id).all()
        return jsonify([{'id': c.id, 'name': c.name, 'position': c.position} for c in columns])
    else:
        column_id = request.json
        column = Column.query.filter_by(id=column_id['id'], board_id=board_id).first_or_404()
        if request.method == 'DELETE':
            db.session.delete(column)
            db.session.commit()
            return '', 204  # No content
        elif request.method == 'PUT':
            data = request.json
            column.name = data.get('name', column.name)
            column.position = data.get('position', column.position)
            db.session.commit()
            return jsonify({'id': column.id, 'name': column.name, 'position': column.position}), 200

# Tickets CRUD
@board_bp.route('/columns/<int:column_id>/tickets', methods=['GET', 'POST', 'DELETE', 'PUT'])
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
    elif request.method == 'GET':
        tickets = Ticket.query.filter_by(column_id=column_id).all()
        return jsonify([{'id': t.id, 'title': t.title, 'description': t.description, 'position': t.position} for t in tickets])
    else:
        ticket_id = request.json
        ticket = Ticket.query.filter_by(id=ticket_id['id'], column_id=column_id).first_or_404()
        if request.method == 'DELETE':
            db.session.delete(ticket)
            db.session.commit()
            return '', 204  # No content
        elif request.method == 'PUT':
            data = request.json
            ticket.title = data.get('title', ticket.title)
            ticket.description = data.get('description', ticket.description)
            ticket.position = data.get('position', ticket.position)
            ticket.column_id = data.get('position', ticket.position)
            db.session.commit()
            return jsonify({'id': ticket.id, 'title': ticket.title, 'description': ticket.description, 'position': ticket.position}), 200
