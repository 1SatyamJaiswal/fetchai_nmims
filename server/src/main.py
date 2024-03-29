from uagents import Bureau
# from agents import crud_agent
# from agents import decision_forecasting_agent
# from agents import chat_support_agent
from agents import customer_chat_agent
from agents import shop_list_agent
from agents import admin_chat_agent

if __name__ == "__main__":
    bureau = Bureau(endpoint="http://127.0.0.1:8099/submit", port=8099)

    # print(f"Adding chat support agent to Bureau: {chat_support_agent.address}")
    # bureau.add(chat_support_agent)

    # print(
    #     f"Adding decision forecasting agent to Bureau: {decision_forecasting_agent.address}"
    # )
    # bureau.add(decision_forecasting_agent)
    
    # print(f"Adding crud agent to Bureau: {crud_agent.address}")
    # bureau.add(crud_agent)\
    
    print(f"Adding customer chat agent to Bureau: {customer_chat_agent.address}")
    bureau.add(customer_chat_agent)
    
    print(f"Adding shop list agent to Bureau: {shop_list_agent.address}")
    bureau.add(shop_list_agent)
    
    print(f"Adding admin chat agent to Bureau: {admin_chat_agent.address}")
    bureau.add(admin_chat_agent)
    
    bureau.run()
