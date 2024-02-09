from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low
import os
# from pydantic import Field
from messages import ChatSupportMessage,  CustomerAssistantMessage, MessageType
from langchain.llms import GooglePalm
from urllib.parse import quote
from langchain.utilities import SQLDatabase
from langchain_experimental.sql import SQLDatabaseChain
from langchain.prompts import PromptTemplate
from google.cloud import vision_v1
from google.cloud.vision_v1 import types
from google.oauth2 import service_account
import base64

credentials_path = 'cloud_vision.json'
credentials = service_account.Credentials.from_service_account_file(credentials_path)
client = vision_v1.ImageAnnotatorClient(credentials=credentials)

api_key = 'AIzaSyAAQtZ0LiASl0tAUl0iQafLLWUIQqVmLTA'
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
SHOP_LIST_SEED = os.environ.get("SHOP_LIST_SEED", "shop list agent")

agent = Agent(
    name="shop_list_agent",
    seed=SHOP_LIST_SEED,
)

fund_agent_if_low(agent.wallet.address())


@agent.on_event("startup")
async def startup(ctx: Context):
    ctx.logger.info("Chat Support Agent Started")
    pass


@agent.on_message(model=ChatSupportMessage)
async def message_handler(ctx: Context, sender: str, msg: ChatSupportMessage):
    ctx.logger.info("Shop List Agent Received Message")
    
    base64_image = msg.query

    # Add padding if needed
    padding = len(base64_image) % 4
    if padding > 0:
        base64_image += '=' * (4 - padding)

    content = base64.b64decode(base64_image)

    image = types.Image(content=content)

    prompt = PromptTemplate.from_template("""You are text refiner. I will give OCR detected text, and you have to provide me a structured JSON list of all the ingredients without mentioning quantities.

    {sample}

    OCR_TEXT: {text}""")

    # Use Google Cloud Vision API for text detection
    response = client.text_detection(image=image)

    detected_msg = ""

    # Extract and print the detected text
    texts = response.text_annotations
    if texts:
        detected_msg += texts[0].description

        msg_to_llm = prompt.format(text=detected_msg, sample="""Sample response: {
        "ingredients": [List of all ingredients]
        }""")

        # Assuming llm is your language model function
        response_from_llm = llm(msg_to_llm)
    else:
        response_from_llm = "No text detected"
    
    ctx.logger.info(f"Chat Support Agent Received Message from {sender}")
    await ctx.send(sender, CustomerAssistantMessage(msg_type=MessageType.LIST, msg=response_from_llm))