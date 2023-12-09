document.getElementById('ai-help-button').addEventListener('click', function() {
    const aiHelpInput = document.getElementById('ai-help-input');
    const userInput = aiHelpInput.value.trim();
    const aiResponseContainer = document.getElementById('ai-response-container');
    
    if (userInput) {
        aiResponseContainer.innerHTML = '<div class="loading-spinner"></div>';
        aiHelpInput.disabled = true;

        fetch('/ai-help', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            aiResponseContainer.textContent = data.reply;
            aiHelpInput.disabled = false;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            aiResponseContainer.textContent = "救援在路上...";
            aiHelpInput.disabled = false;
        });
    } else {
        aiResponseContainer.textContent = "请输入你的问题。";
    }
});
