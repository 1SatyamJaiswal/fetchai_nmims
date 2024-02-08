from uagents import Model
from enum import Enum
from typing import Optional


class AgentType(Enum):
    CHAT_SUPPORT = 0
    DECISION_FORCASTING = 1
    CRUD = 2


class InventoryAssistantMessage(Model):
    type: AgentType
    data: Optional[list]
    reply: Optional[str]
