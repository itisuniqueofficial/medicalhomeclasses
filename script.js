async function sendToTelegram(event) {
    event.preventDefault();

    const feedbackElement = document.getElementById("feedback");
    const submitButton = document.getElementById("submitBtn");

    // Hide feedback and disable the submit button
    setFeedbackVisibility(feedbackElement, false);
    toggleSubmitButton(submitButton, true);

    // Gather form data
    const formData = getFormData();

    try {
        // Fetch user's IP address and add it to form data
        formData.ip = await fetchUserIp();

        // Send the message to Telegram
        const botToken = "7731316951:AAEiLzkQuVUNy95IoRZazBnUwX49xknNdZE";
        const chatId = "-4598440447";
        const formattedMessage = formatMessage(formData);

        const response = await sendMessageToTelegram(botToken, chatId, formattedMessage);
        handleResponse(response, feedbackElement);
    } catch (error) {
        console.error("Error:", error);
        showMessage("An error occurred. Please try again.", "error", feedbackElement);
    } finally {
        toggleSubmitButton(submitButton, false);
    }
}

// Collect form data
function getFormData() {
    return {
        name: document.getElementById("name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        school: document.getElementById("school").value.trim(),
        classValue: document.getElementById("class").value.trim(),
        message: document.getElementById("message").value.trim(),
    };
}

// Format the message for Telegram
function formatMessage({ name, phone, school, classValue, message, ip }) {
    return `
📇 *New Registration Message*
👤 *Name*: ${name}
📱 *Phone*: ${phone}
🏫 *School*: ${school}
🎓 *Class*: ${classValue}
💬 *Message*: ${message}
🌍 *IP Address*: ${ip}

*🥰 The Registration Portal Is Made By Jaydatt Khodave - Telegram: @itisuniqueofficial*`;
}

// Fetch user's IP address
async function fetchUserIp() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) throw new Error("Failed to fetch IP address");
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Failed to get IP address:", error);
        return "Unknown IP";
    }
}

// Send message to Telegram
async function sendMessageToTelegram(botToken, chatId, message) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown",
        }),
    });
}

// Handle the Telegram response
function handleResponse(response, feedbackElement) {
    if (response.ok) {
        document.getElementById("form").reset();
        showMessage("Message sent successfully!", "success", feedbackElement);
    } else {
        showMessage("Failed to send message! Please try again.", "error", feedbackElement);
    }
}

// Display feedback messages
function showMessage(text, type, feedbackElement) {
    feedbackElement.textContent = text;
    feedbackElement.className = `feedback ${type}`;
    setFeedbackVisibility(feedbackElement, true);

    setTimeout(() => {
        feedbackElement.style.opacity = "0";
        setTimeout(() => setFeedbackVisibility(feedbackElement, false), 500);
    }, 3000);
}

// Toggle submit button state
function toggleSubmitButton(button, isDisabled) {
    button.disabled = isDisabled;
}

// Set feedback element visibility
function setFeedbackVisibility(feedbackElement, isVisible) {
    feedbackElement.style.display = isVisible ? "block" : "none";
    feedbackElement.style.opacity = isVisible ? "1" : "0";
}
