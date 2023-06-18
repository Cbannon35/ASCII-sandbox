from langchain.chat_models import ChatOpenAI
# from langchain.agents import load_tools, initialize_agent 
# from langchain.agents import AgentType
from langchain.schema import HumanMessage
from langchain.tools import AIPluginTool, format_tool_to_openai_function
from langchain.agents.agent_toolkits import NLAToolkit
from langchain.memory import ConversationBufferMemory

from dotenv import load_dotenv
load_dotenv()

model = ChatOpenAI(model="gpt-3.5-turbo-0613")
# llm = ChatOpenAI(temperature=0)
tools = NLAToolkit.from_llm_and_url(model, "https://figletgptplugin.wisemonkey.repl.co/openapi.yaml").get_tools()
functions = [format_tool_to_openai_function(tool) for tool in tools]
# memory=ConversationBufferMemory (memory_key="chat_history", return_messages=True)
# agent_chain = initialize_agent(tools, model, agent="chat-conversational-react-description", verbose=True, memory=memory)

# print(agent_chain.run("Convert the string 'hello' into ascii art."))

print(model.predict_messages([HumanMessage(content="Convert the string 'hello' into ascii art.")], functions=functions))
