// static/crazy-debug-script.js
document.getElementById('start-game').addEventListener('click', function() {
    fetch('/start-debug-game', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('ai-question').textContent = data.question;
        document.getElementById('user-response').style.display = 'block';
        document.getElementById('submit-response').style.display = 'block';
    })
    .catch(error => {
        document.getElementById('ai-question').textContent = "无法加载题目。";
    });
});

document.getElementById('submit-response').addEventListener('click', function() {
    const userResponse = document.getElementById('user-response').value;
    fetch('/submit-debug-response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ response: userResponse })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('ai-feedback').textContent = data.feedback;
    })
    .catch(error => {
        document.getElementById('ai-feedback').textContent = "无法提交答案。";
    });
});
