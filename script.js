async function sendToTelegram(event) {
    event.preventDefault();

    const spinner = document.getElementById("spinner");
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.style.display = "none";

    spinner.style.display = "block";
    document.getElementById("submitBtn").disabled = true;

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const school = document.getElementById("school").value;
    const classValue = document.getElementById("class").value;
    const message = document.getElementById("message").value;

    const botToken = "7731316951:AAEiLzkQuVUNy95IoRZazBnUwX49xknNdZE";
    const chatId = "-4598440447";

    const formattedMessage = `
📇 *New Registration Message*\n
👤 *Name*: ${name}
📱 *Phone*: ${phone}
🏫 *School*: ${school}
🎓 *Class*: ${classValue}
💬 *Message*: ${message}\n
*🥰 The Registration Portal Is Made By Jaydatt Khodave - Telegram: @itisuniqueofficial*`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: formattedMessage,
                parse_mode: "Markdown",
            }),
        });

        if (response.ok) {
            showMessage("Message sent successfully!", "success");
            document.getElementById("form").reset();
        } else {
            showMessage("Failed to send message! Please try again.", "error");
        }
    } catch (error) {
        showMessage("An error occurred. Please try again.", "error");
    }

    setTimeout(() => {
        spinner.style.display = "none";
        document.getElementById("submitBtn").disabled = false;
    }, 1000);
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