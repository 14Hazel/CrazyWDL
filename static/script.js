// script.js
document.getElementById('next-step').addEventListener('click', function() {
    // 这里的URL应该替换为问答页面的URL
    window.location.href = 'question-page.html';
});

document.getElementById('submit-answer').addEventListener('click', function() {
    // 获取选中的答案
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        // 处理答案逻辑
        alert("你选择的答案是: " + selectedOption.value);
        // 这里可以添加更多的逻辑，比如与后端通信等
    } else {
        alert("请选择一个答案！");
    }
});


// 假设这些是从后端获取的问题和选项
// const questionText = "这里是问题文本";
// const options = [
//     { text: "选项1", value: "1" },
//     { text: "选项2", value: "2" },
//     { text: "选项3", value: "3" }
// ];

// 设置问题文本
document.getElementById('question-text').innerText = questionText;

// 动态生成问题的选项
const optionsContainer = document.getElementById('options');
options.forEach(option => {
    const label = document.createElement('label');
    const radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'option';
    radioButton.value = option.value;
    label.appendChild(radioButton);
    label.appendChild(document.createTextNode(option.text));
    optionsContainer.appendChild(label);
});


let attempts = 0;
const correctAnswer = 'D';
const feedbackContainer = document.getElementById('feedback-container');

document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const selected = document.querySelector('input[name="answer"]:checked');
    if (selected) {
        if (selected.value === correctAnswer) {
            feedbackContainer.textContent = "回答正确！";
        } else {
            attempts++;
            if (attempts >= 3) {
                feedbackContainer.innerHTML = "通关失败。正确答案是 D。";
            } else {
                feedbackContainer.textContent = `回答错误。还有 ${3 - attempts} 次机会。`;
            }
        }
    } else {
        feedbackContainer.textContent = "请选择一个答案。";
    }
});

document.getElementById('ai-help-button').addEventListener('click', function() {
    const userInput = document.getElementById('ai-help-input').value.trim();
    
    if (userInput) {
        fetch('/ai-help', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        })
        .then(response => response.json())
        .then(data => {
            // 在这里处理和显示 AI 的回复
            console.log(data.reply);
        })
        .catch(error => {
            // 处理错误情况
            console.error('Error:', error);
        });
    }
});

// document.getElementById('ai-help-button').addEventListener('click', function() {
//     const userInput = document.getElementById('ai-help-input').value.trim();
//     const feedbackContainer = document.getElementById('feedback-container');
    
//     if (userInput) {
//         // 发送用户输入到后端的 AI 求助路由
//         fetch('/ai-help', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ message: userInput })
//         })
//         .then(response => response.json())
//         .then(data => {
//             // 显示 AI 的回复
//             feedbackContainer.innerHTML = data.reply;
//         })
//         .catch(error => {
//             // 错误处理
//             feedbackContainer.textContent = "AI 求助出错，请稍后再试。";
//         });
//     } else {
//         feedbackContainer.textContent = "请输入你的问题。";
//     }
// });


