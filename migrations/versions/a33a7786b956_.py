"""empty message

Revision ID: a33a7786b956
Revises: 795371d33f79
Create Date: 2022-12-08 16:39:23.851208

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a33a7786b956'
down_revision = '795371d33f79'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('celular', schema=None) as batch_op:
        batch_op.add_column(sa.Column('imagen', sa.String(length=500), nullable=False))

    with op.batch_alter_table('computadora', schema=None) as batch_op:
        batch_op.add_column(sa.Column('imagen', sa.String(length=500), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('computadora', schema=None) as batch_op:
        batch_op.drop_column('imagen')

    with op.batch_alter_table('celular', schema=None) as batch_op:
        batch_op.drop_column('imagen')

    # ### end Alembic commands ###