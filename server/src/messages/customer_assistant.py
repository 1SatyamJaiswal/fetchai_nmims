from uagents import Model
from enum import Enum
from typing import Optional

class MessageType(Enum):
    CHAT = "chat"
    LIST = "list"
    IMG = "img"

class CustomerAssistantMessage(Model):
    msg_type: MessageType
    msg: Optional[str] 
    img: Optional[str]

    