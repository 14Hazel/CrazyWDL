// static/endless-requests-script.js
document.getElementById('next-requirement').addEventListener('click', function() {
    const aiQuery = document.getElementById('ai-query').textContent;
    const aiResponseElement = document.getElementById('ai-response');

    fetch('/ai-query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: "今天有什么新需求" })
    })
    .then(response => response.json())
    .then(data => {
        aiResponseElement.textContent = data.reply;
    })
    .catch(error => {
        console.error('Error:', error);
        aiResponseElement.textContent = "无法获取AI回复。";
    });
});

// static/endless-requests-script.js
// document.getElementById('next-requirement').addEventListener('click', function() {
//     const npcDialogueBox = document.getElementById('npc-dialogue-box');
//     const aiDialogue = document.getElementById('ai-dialogue');
//     const nextRequirementButton = document.getElementById('next-requirement');

//     // 清空前一个对话
//     aiDialogue.textContent = '';

//     // 从后端获取新的需求
//     fetch('/get-new-requirement', {
//         method: 'GET'
//     })
//     .then(response => response.json())
//     .then(data => {
//         // 显示从后端获取的新需求
//         npcDialogueBox.textContent = "NPC 说: " + data.new_requirement;
//         // 显示接下来的指令或问题
//         aiDialogue.textContent = "AI 说: " + data.follow_up_question;
//         // 为了模拟对话，可能需要隐藏或禁用按钮，直到对话完成
//         nextRequirementButton.disabled = true;
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         npcDialogueBox.textContent = "无法获取新的需求。";
//     });
// });

