from uagents import Model
from enum import Enum
from typing import Optional


class DataType(Enum):
    PRODUCT = 0
    SALES_LOG = 1
    SUPPLIER = 2


class ActionType(Enum):
    CREATE = 0
    READ = 1
    UPDATE = 2
    DELETE = 3


class CRUDMessage(Model):
    type: DataType
    action: ActionType
    data: Optional[dict]
