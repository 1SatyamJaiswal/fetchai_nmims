from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low
from messages import CRUDMessage, InventoryAssistantMessage, ActionType, DataType, AgentType
import os
import sqlite3

con = sqlite3.connect('./inventory.db')

cur = con.cursor()

CRUD_SEED = os.environ.get("CRUD_SEED", "crud agent")

agent = Agent(
    name="CRUD_agent",
    seed=CRUD_SEED,
)

fund_agent_if_low(agent.wallet.address())


@agent.on_event("startup")
async def startup(ctx: Context):
    ctx.logger.info("CRUD Agent Started")
    pass


@agent.on_message(model=CRUDMessage)
async def message_handler(ctx: Context, sender: str, msg: CRUDMessage):
    ctx.logger.info(f"CRUD Agent Received Message{sender}")
    if msg.action == ActionType.READ:
        if msg.type == DataType.PRODUCT:
            res = cur.execute("SELECT * FROM product")
            # ctx.logger.info(res.fetchall())
            # for row in res:
            #     ctx.logger.info(row)
            data = res.fetchall()
            ctx.logger.info(data)
            await ctx.send(sender, InventoryAssistantMessage(type=AgentType.CRUD, data=data))
        elif msg.type == DataType.SALES_LOG:
            res = cur.execute("SELECT * FROM sales")
            # ctx.logger.info(res.fetchall())
            # for row in res:
            #     ctx.logger.info(row)
            data = res.fetchall()
            ctx.logger.info(data)
            await ctx.send(sender, InventoryAssistantMessage(type=AgentType.CRUD, data=data))
    if msg.action == ActionType.UPDATE:
        if msg.type == DataType.PRODUCT:
            if msg.data['mode'] == 'restock':
                data = msg.data
                ctx.logger.info(data)
                res = cur.execute("UPDATE product SET qty = qty + ? WHERE product_id = ?", (data["quantity"], data["id"]))
                con.commit()
                ctx.logger.info(res.description)
                # await ctx.send(sender, InventoryAssistantMessage(type=AgentType.CRUD, data="success"))
            elif msg.data['mode'] == 'sell':
                data = msg.data
                ctx.logger.info(data)
                cur.execute("UPDATE product SET qty = qty - ? WHERE product_id = ?", (data["quantity"], data["id"]))
                cur.execute("INSERT INTO sales (name, qty, price, product_id) VALUES (?, ?, ?, ?)", (data["name"], data["quantity"], data["amount"], data["id"]))
                con.commit()
                # await ctx.send(sender, InventoryAssistantMessage(type=AgentType.CRUD, data="success"))
