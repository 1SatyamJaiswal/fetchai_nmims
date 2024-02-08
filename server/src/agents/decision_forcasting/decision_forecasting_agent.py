from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low
import os

DECISION_FORCASTING_SEED = os.environ.get("DECISION_FORCASTING_SEED", "decision forcasting agent")

agent = Agent(
  name="DECISION_FORCASTING_agent",
  seed=DECISION_FORCASTING_SEED,
)

fund_agent_if_low(agent.wallet.address())

@agent.on_event("startup")
async def startup(ctx: Context):
    ctx.logger.info("Decision Forcasting Agent Started")
    pass
  
@agent.on_message(model=Model)
async def message_handler(ctx: Context, sender: str, msg: Model):
    pass