from flask import Flask, request, jsonify, render_template
import requests
import json
import os
from dotenv import load_dotenv
# import asyncio
import qianfan


#load env
load_dotenv()
ak = os.environ['ak']
sk = os.environ.get('sk')
comp = qianfan.Completion(ak=ak, sk=sk)
chat_comp = qianfan.ChatCompletion(ak=ak, sk=sk)

app = Flask(__name__, static_folder='static')

# 假设这是一个全局变量来保存对话历史
# 在实际应用中，你可能需要更复杂的方式来存储历史，比如使用数据库
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/level1')
def level1():
    return render_template('level1.html')

@app.route('/questions')
def questions():
    return render_template('questions.html')

@app.route('/get_requirement')
def get_requirement():
    # 这里应该是与大模型交互的代码
    # 模拟一个需求响应
    # model_response = "模拟需求：分析下一代测序数据。"  # 临时响应，替换为大模型的实际调用

    # return jsonify({'requirement': model_response})
    return render_template('endless-requests.html')

@app.route('/crazy-debug')
def crazy_debug():
    return render_template('crazy-debug.html')


#单轮问答
@app.route('/ai-help', methods=['POST'])
def ask_help():
    data = request.json
    user_message = data.get('message')
    ai_helper = """请你扮演一个熟悉openWDL语言的生物信息学技术人员，回答玩家有关openWDL的疑问，openWDL以外的无需回答，仅回答'我只负责教openWDL'"""
    
    if not user_message:
         return jsonify({'reply': '没有接收到有效的输入'}), 400
     
    resp = comp.do(model="ERNIE-Bot-4", 
                   prompt=user_message, 
                   system=ai_helper)
    # for r in resp['result']:
    return jsonify({'reply': resp['result'].split('\n')})

#要支持多轮问答
@app.route('/ai-query', methods=['POST'])
def ai_query():
    data = request.json
    user_message = data.get('message')
    chat_history = [{"role": "user", "content": user_message}] #只能是奇数轮
                    #     {"role": "assistant",
                    #  "content": "使用openWDL编写一个简单的流程，对一个基因集合进行基本的统计描述，包括基因数、平均长度和GC含量等信息。"}
    ai_manager = """请你扮演一个产品经理或者客户，随机提出生物信息学的分析任务，但任务量必须是小的开发任务而且openWDL是能满足的。"""
    
    if not user_message:
         return jsonify({'reply': '没有接收到有效的输入'}), 400
     
    resp = chat_comp.do(model="ERNIE-Bot-4", 
                   messages=chat_history, 
                   system=ai_manager)
    # for r in resp['result']:
    return jsonify({'reply': resp['result'].split('\n')})
    # ai_response = "模拟AI回复: 需要进行基因序列分析。"

    # return jsonify({'response': ai_response})
    
@app.route('/start-debug-game', methods=['GET'])
def start_debug_game():
    # 获取问题，这里应该是调用 AI 模型的逻辑
    generate_bug_prompt = """请你随机生成错误的openWDL流程代码，只需生成类似题目的形式即可无需解释错在哪里"""
    resp = comp.do(model="ERNIE-Bot-4", 
                   prompt=generate_bug_prompt)
    return jsonify({'question': resp['result']})


@app.route('/submit-debug-response', methods=['POST'])
def submit_debug_response():
    data = request.json
    user_response = data.get('response')
    chat_history = [{"role": "user",
                     "content": user_response}]
    # 处理答案，这里应该是调用 AI 模型判断答案的逻辑
    ai_helper = """请你扮演一个熟悉openWDL语言的生物信息学技术人员，回答玩家有关openWDL的疑问，openWDL以外的无需回答，仅回答'我只负责教openWDL'"""
    resp = chat_comp.do(model="ERNIE-Bot-4", 
                messages=chat_history, 
                system=ai_helper)
    return jsonify({'feedback': resp['result']})

if __name__ == '__main__':
    app.run(debug=True)

