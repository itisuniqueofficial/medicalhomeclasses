async function sendToTelegram(event) {
    event.preventDefault();

    const feedbackElement = document.getElementById("feedback");
    const submitButton = document.getElementById("submitBtn");
    feedbackElement.style.display = "none";
    submitButton.disabled = true;

    const formData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        school: document.getElementById("school").value,
        classValue: document.getElementById("class").value,
        message: document.getElementById("message").value
    };

    const botToken = "7731316951:AAEiLzkQuVUNy95IoRZazBnUwX49xknNdZE";
    const chatId = "-4598440447";
    const formattedMessage = formatMessage(formData);

    try {
        const response = await sendMessageToTelegram(botToken, chatId, formattedMessage);
        handleResponse(response);
    } catch (error) {
        showMessage("An error occurred. Please try again.", "error");
    } finally {
        submitButton.disabled = false;
    }
}

function formatMessage({ name, phone, school, classValue, message }) {
    return `
📇 *New Registration Message*\n
👤 *Name*: ${name}
📱 *Phone*: ${phone}
🏫 *School*: ${school}
🎓 *Class*: ${classValue}
💬 *Message*: ${message}\n
*🥰 The Registration Portal Is Made By Jaydatt Khodave - Telegram: @itisuniqueofficial*`;
}

async function sendMessageToTelegram(botToken, chatId, message) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown"
        })
    });

    return response;
}

function handleResponse(response) {
    const feedbackMessage = response.ok
        ? { text: "Message sent successfully!", type: "success" }
        : { text: "Failed to send message! Please try again.", type: "error" };

    showMessage(feedbackMessage.text, feedbackMessage.type);
    if (response.ok) document.getElementById("form").reset();
}

function showMessage(text, type) {
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.textContent = text;
    feedbackElement.className = `feedback ${type}`;
    feedbackElement.style.display = "block";
    feedbackElement.style.opacity = "1";

    setTimeout(() => {
        feedbackElement.style.opacity = "0";
        setTimeout(() => {
            feedbackElement.style.display = "none";
        }, 500);
    }, 3000);
}
