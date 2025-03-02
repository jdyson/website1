const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');

// Load Hugging Face model
async function loadModel() {
  try {
    const model = await transformers.load('Xenova/transformers', 'gpt2');
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    chatbox.innerHTML += `<div><strong>Bot:</strong> Error loading model. Please try again later.</div>`;
  }
}

const modelPromise = loadModel();

userInput.addEventListener('keypress', async function(event) {
  if (event.key === 'Enter') {
    const message = userInput.value;
    userInput.value = '';
    chatbox.innerHTML += `<div><strong>You:</strong> ${message}</div>`;

    try {
      const model = await modelPromise;
      if (model) {
        const response = await model.chat(message);
        chatbox.innerHTML += `<div><strong>Bot:</strong> ${response}</div>`;
      } else {
        chatbox.innerHTML += `<div><strong>Bot:</strong> Model not available.</div>`;
      }
    } catch (error) {
      console.error('Error generating response:', error);
      chatbox.innerHTML += `<div><strong>Bot:</strong> Error generating response. Please try again later.</div>`;
    }
    chatbox.scrollTop = chatbox.scrollHeight;
  }
});
