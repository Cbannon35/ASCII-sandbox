from dotenv import load_dotenv
load_dotenv()
def get_ascii(query):
    from langchain.chat_models import ChatOpenAI
    from langchain.agents import load_tools, initialize_agent
    from langchain.agents import AgentType
    from langchain.tools import AIPluginTool

    tool = AIPluginTool.from_plugin_url("https://figletgptplugin.wisemonkey.repl.co/.well-known/ai-plugin.json")

    llm = ChatOpenAI(model='gpt-4-0613', temperature=0)
    tools = load_tools(["requests_all"], llm=llm)
    tools += [tool]

    agent_chain = initialize_agent(
        tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True
    )
    return agent_chain.run(query)