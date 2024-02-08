# from flask import Flask, render_template
# from flask_socketio import SocketIO, emit, send
from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low
from messages import ChatSupportMessage, CustomerAssistantMessage
import threading
import logging
import socketio
from aiohttp import web

IENT_SEED = "customer assistant client"

logging.getLogger('socketio').setLevel(logging.ERROR)

CUSTOMER_ASSISTANT_CLIENT_SEED = "customer assistant"

CUSTOMER_CHAT_AGENT_ADDRESS = "agent1qfw0hgvndkq2e9je7gxqgp5qkpqkgdu3gnyh2c9rjrmx53al756nuze2er4"
# SHOPPING_LIST_AGENT_ADDRESS = "agent1qf9gytta8hw79jdcltefv8nkp44khfx2aj73u2ygxdlppdy6qeenqfjxuzf"
# PROD_IMG_AGENT_ADDRESS = "agent1qf9gytta8hw79jdcltefv8nkp44khfx2aj73u2ygxdlppdy6qeenqfjxuzf"

customer_assistant_client = Agent(
    name="customer_assistant_client",
    port=8081,
    seed=CUSTOMER_ASSISTANT_CLIENT_SEED,
    endpoint=["http://127.0.0.1:8081/submit"],
)

fund_agent_if_low(customer_assistant_client.wallet.address())

@customer_assistant_client.on_event("startup")
async def on_startup(ctx: Context):
    print("Customer Assistant Client started",ctx.address)

@customer_assistant_client.on_message(model=ChatSupportMessage)
async def on_message(ctx: Context, sender: str, msg: ChatSupportMessage):
    print(f"Chat Support Message: {msg}")


# app = Flask(__name__)
# app.config["SECRET_KEY"] = "secret!"
# socketio = SocketIO(app, cors_allowed_origins="*",async_mode="eventlet")

# sio = socketio.AsyncServer()
sio = socketio.AsyncServer(cors_allowed_origins="*", logger=False)
app = web.Application()
sio.attach(app)
@sio.event
async def connect(sid,environ):
    print("Client connected",sid)
    await sio.emit('my response', {'data': 'Connected'})


# @sio.event
# def test_disconnect():
#     print("Client disconnected")


@sio.event
async def chat(sid,data):
    print("received chat: " + data)
    await sio.emit("chat", data)
    customer_assistant_client._ctx.logger.info(f"Chat: {data}")
    await customer_assistant_client._ctx.send(CUSTOMER_CHAT_AGENT_ADDRESS, ChatSupportMessage(query=data))
    
@sio.event
async def list(sid,data):
    print("received list: " + data)
    await sio.emit("list", data)
    customer_assistant_client._ctx.logger.info(f"List: {data}")
    await customer_assistant_client._ctx.send(CUSTOMER_CHAT_AGENT_ADDRESS, ChatSupportMessage(query=data))


if __name__ == "__main__":
    # socket_thread = threading.Thread(target=socketio.run, args=(app,), kwargs={"debug": True, "port": 6000})
    agent_thread = threading.Thread(target=customer_assistant_client.run)
    
    # agent_thread.start()    
    # socket_thread.    start()
    # socketio.run(app, debug=True, port=7789)
    web.run_app(app, port=7789) 
    agent_thread.join()