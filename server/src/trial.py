from uagents import Agent, Context
from uagents.setup import fund_agent_if_low
from messages import ChatSupportMessage
trial_agent = Agent(
    name="trial_agent",
    port=8080,
    seed="trial agent",
    endpoint=["http://127.0.0.1:8080/submit"],
)

fund_agent_if_low(trial_agent.wallet.address())

@trial_agent.on_event("startup")
async def on_startup(ctx: Context):
    print("Trial Agent started",ctx.address)
    await ctx.send('agent1qfw0hgvndkq2e9je7gxqgp5qkpqkgdu3gnyh2c9rjrmx53al756nuze2er4',ChatSupportMessage(query="Hello from trial agent"))
    
trial_agent.run()