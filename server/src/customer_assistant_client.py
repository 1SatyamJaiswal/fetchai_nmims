from flask import Flask, render_template
from flask_socketio import SocketIO, emit, send
from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low
from messages import ChatSupportMessage, CustomerAssistantMessage
import threading

CUSTOMER_ASSISTANT_CLIENT_SEED = "customer assistant client"

CUSTOMER_CHAT_AGENT_ADDRESS = ""

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


app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!"
socketio = SocketIO(app)


@socketio.on("connect")
def test_connect(auth):
    print("Client connected", auth)
    # emit('my response', {'data': 'Connected'})


@socketio.on("disconnect")
def test_disconnect():
    print("Client disconnected")


@socketio.on("chat")
def handle_chat(data):
    print("received chat: " + data)
    emit("chat", data, broadcast=True)
    customer_assistant_client._ctx.logger.info(f"Chat: {data}")


if __name__ == "__main__":
    # socket_thread = threading.Thread(target=socketio.run, args=(app,), kwargs={"debug": True, "port": 6000})
    agent_thread = threading.Thread(target=customer_assistant_client.run)
    
    agent_thread.start()    
    # socket_thread.start()
    socketio.run(app, debug=True, port=5000)
    agent_thread.join()