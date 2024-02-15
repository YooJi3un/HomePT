const chatMessages = document.querySelector('#chat-messages');
const userInput = document.querySelector('#userInput input');
const sendButton = document.querySelector('#userInput button');
const apiUrl = `https://open-api.jejucodingcamp.workers.dev/`

function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.textContent = `${sender}: ${message}`;
    chatMessages.prepend(messageElement);
}

async function fetchAIResponse(prompt) {
    const data = []

    data.push({
        "role": "system",
        "content": "assistant는 운동 사이클을 잡아주는 챗봇입니다."
    })

    const inputdata = userInput.value
    console.log(inputdata)

    data.push({
        "role": "user",
        "content": inputdata
    })

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        redirect: 'follow'
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        addMessage('챗봇', `<p>${res.choices[0].message.content}</p>`);
    })
}

sendButton.addEventListener('click', async () => {
    const message = userInput.value.trim();
    // if (message.length === 0) return;
    addMessage('유저', message);
    // userInput.value = '';
    const aiResponse = await fetchAIResponse(message);
    // console.log(aiResponse)
});

userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});
