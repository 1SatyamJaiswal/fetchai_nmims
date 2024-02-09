from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low
from messages import (
    CRUDMessage,
    ChatSupportMessage,
    InventoryAssistantMessage,
    DataType,
    AgentType,
    ActionType,
)
import os
import threading
import socketio
from pydantic import Field
from aiohttp import web
import sqlite3

ADMIN_CHAT_SUPPORT_ADDRESS = "agent1q28hs4rpndlpdvwe0yqg3facv4es0dy8nn0636pxnhsw82j3undyjapjmz6"

GROCERY_AGENT_CLIENT_SEED = os.environ.get(
    "GROCERY_AGENT_CLIENT_SEED", "job helper client"
)

inventory_assistant_client = Agent(
    name="inventory_assistant_client",
    port=8008,
    seed=GROCERY_AGENT_CLIENT_SEED,
    endpoint=["http://127.0.0.1:8008/submit"],
)

fund_agent_if_low(inventory_assistant_client.wallet.address())

sio = socketio.AsyncServer(cors_allowed_origins="*", logger=False)
app = web.Application()
sio.attach(app)


@sio.on("connect")
async def connect(sid, environ):
    print("connect ", sid)


# @sio.on("get_products")
# async def get_products(sid):
#     await inventory_assistant_client._ctx.send(
#         "agent1qg3xhzf5amzpagg9qrykjunlvag4drkn3v3kga49ys6xdu3rccfesk9sczu",
#         CRUDMessage(type=DataType.PRODUCT, action=ActionType.READ),
#     )


@sio.on("query")
async def query(sid, data):
    print("query----------------------------------------------------", data)
    await inventory_assistant_client._ctx.send(
        ADMIN_CHAT_SUPPORT_ADDRESS,
        ChatSupportMessage(query=data["query"]),
    )

# @sio.on('restock')
# async def restock(sid,data):
#     print("restock----------------------------------------------------", data)
#     await inventory_assistant_client._ctx.send(
#         "agent1qg3xhzf5amzpagg9qrykjunlvag4drkn3v3kga49ys6xdu3rccfesk9sczu",
#         CRUDMessage(type=DataType.PRODUCT, action=ActionType.UPDATE, data=data),
#     )
    
# @sio.on('sell')
# async def sell(sid,data):
#     print("sell----------------------------------------------------", data)
#     await inventory_assistant_client._ctx.send(
#         "agent1qg3xhzf5amzpagg9qrykjunlvag4drkn3v3kga49ys6xdu3rccfesk9sczu",
#         CRUDMessage(type=DataType.PRODUCT, action=ActionType.UPDATE, data=data),
#     )
    
# @sio.on('sales')
# async def sales(sid):
#     print("sales----------------------------------------------------")
#     await inventory_assistant_client._ctx.send(
#         "agent1qg3xhzf5amzpagg9qrykjunlvag4drkn3v3kga49ys6xdu3rccfesk9sczu",
#         CRUDMessage(type=DataType.SALES_LOG, action=ActionType.READ),
#     )

def init_socketio():
    web.run_app(app, port=5000)


@inventory_assistant_client.on_event("startup")
async def send_message(ctx: Context):
    ctx.logger.info(f"Inventory Assistant Client Started {inventory_assistant_client.address}")


@inventory_assistant_client.on_message(model=InventoryAssistantMessage)
async def message_handler(ctx: Context, sender: str, msg: InventoryAssistantMessage):
    # ctx.logger.info(f"Inventory Assistant Client Received Message {msg.data}")
    if msg.type == AgentType.CRUD:
        ctx.logger.info(f"Inventory Assistant Client Received Message from CRUD ")
        print(msg.data)
        await sio.emit("send_products", {"data": msg.data})
    elif msg.type == AgentType.CHAT_SUPPORT:
        ctx.logger.info(
            f"Inventory Assistant Client Received Message from CHAT SUPPORT "
        )
        print(msg.reply)
        await sio.emit("query_response", {"data": msg.reply})


@inventory_assistant_client.on_interval(period=60)
async def send_message(ctx: Context):
    # check if any product is low in stock
    # if yes send message to the chat support agent
    con = sqlite3.connect('inventory.db')
    cur = con.cursor()
    
    res = cur.execute("SELECT * FROM PRODUCT WHERE qty < 40").fetchall()
    
    for row in res:
        await sio.emit('query_response', {'data': f"Product {row[1]} is low in stock, {row[7]} units are left."})
        # await ctx.logger.info(f"Inventory Assistant Client Sent restock reminder ")
        print(f"Product {row[1]} is low in stock, {row[7]} units are left.")
        
    await sio.emit('query_response', {'data': "Please restock the products"})
    
    

if __name__ == "__main__":
    agent_thread = threading.Thread(target=inventory_assistant_client.run)
    socket_thread = threading.Thread(target=init_socketio)

    agent_thread.start()
    socket_thread.start()
    agent_thread.join()
    
    # inventory_assistant_client.run()
