const chatMessages = document.querySelector('#chat-messages');
const userInput = document.querySelector('#userInput input');
const sendButton = document.querySelector('#userInput button');
const apiKey = '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'; // 여기에 실제 API 키를 입력하세요.
const apiUrl = `https://open-api.jejucodingcamp.workers.dev/`; // 실제 OpenAI API 엔드포인트로 변경

function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.textContent = `${sender}: ${message}`;
    chatMessages.prepend(messageElement);
}

async function fetchAIResponse(prompt) {
    let aiResponse = ''; // aiResponse 초기화
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}` // API 키를 올바르게 사용
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // 사용할 AI 모델
                prompt: prompt, // 사용자 입력 사용
                max_tokens: 50,
                temperature: 0.5,
            }),
        });
        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            aiResponse = data.choices[0].text; // 응답 구조 변경
        } else {
            aiResponse = '적절한 응답을 받지 못했습니다.';
        }
    } catch (error) {
        console.error('요청 처리 중 오류 발생:', error);
        aiResponse = '오류가 발생했습니다. 콘솔을 확인해주세요.';
    }
    return aiResponse;
}

sendButton.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (message.length === 0) return;
    addMessage('유저', message);
    userInput.value = '';
    const aiResponse = await fetchAIResponse(message);
    addMessage('챗봇', aiResponse);
});

userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});
