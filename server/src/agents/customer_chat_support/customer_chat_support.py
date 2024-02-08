from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low
import os
# from pydantic import Field
from messages import ChatSupportMessage,  CustomerAssistantMessage, MessageType
from langchain.llms import GooglePalm
from urllib.parse import quote
from langchain.utilities import SQLDatabase
from langchain_experimental.sql import SQLDatabaseChain



api_key = 'AIzaSyD5CxIhibptIhPQywB0bu0smv5kngROqs8'
llm = GooglePalm(google_api_key=api_key, temperature=0.2)

## Database Credentials
db_user = "root"
db_password = "D_boss@18"
db_host = "127.0.0.1"
db_name = "grocery"

encoded_password = quote(db_password)
mysql_uri = f"sqlite:///inventory.db"
    
# print(mysql_uri)
db = SQLDatabase.from_uri(mysql_uri,sample_rows_in_table_info=3)

# print(db.table_info)
db_chain = SQLDatabaseChain.from_llm(llm, db)

# CHAT_SUPPORT_SEED = os.environ.get("CHAT_SUPPORT_SEED", "chat support agent")
CUSTOMER_CHAT_SEED = os.environ.get("CUSTOMER_CHAT_SEED", "customer chat agent")

agent = Agent(
    name="customer_chat_agent",
    seed=CUSTOMER_CHAT_SEED,
)

fund_agent_if_low(agent.wallet.address())


@agent.on_event("startup")
async def startup(ctx: Context):
    ctx.logger.info("Chat Support Agent Started")
    pass


@agent.on_message(model=ChatSupportMessage)
async def message_handler(ctx: Context, sender: str, msg: ChatSupportMessage):
    ctx.logger.info("Chat Support Agent Received Message")
    print("query received: ", msg.query)
    # qns = db_chain(msg.query)
    # print(qns,type(qns))
    # await ctx.send(sender, InventoryAssistantMessage(type=AgentType.CHAT_SUPPORT,reply=qns['result']))
    ctx.logger.info(f"Chat Support Agent Received Message from {sender}")
    await ctx.send(sender, CustomerAssistantMessage(msg_type=MessageType.CHAT,msg="I am a chat support agent, I am here to help you with your queries"))