"""add user email to logs

Revision ID: 972d648b0b28
Revises: f6eee90efa64
Create Date: 2024-08-25 22:43:37.475050

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '972d648b0b28'
down_revision = 'f6eee90efa64'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('log_entry', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_email', sa.String(length=120), nullable=True))
        batch_op.create_foreign_key('fk_user_email', 'user', ['user_email'], ['email'])

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('stripe_customer_id',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.String(length=60),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('stripe_customer_id',
               existing_type=sa.String(length=60),
               type_=sa.VARCHAR(length=120),
               existing_nullable=True)

    with op.batch_alter_table('log_entry', schema=None) as batch_op:
        batch_op.drop_constraint('fk_user_email', type_='foreignkey')
        batch_op.drop_column('user_email')

    # ### end Alembic commands ###
