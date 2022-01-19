

const socket = io("http://localhost:3000", { transports: ["websocket"] });

const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const usernameInput = document.getElementById("username");
const usernameForm = document.getElementById("enter-name-form");

usernameInput.addEventListener("input", (e) => {
  if (e.target.value.length > 3) {
    document.getElementById("submit-name").style.display = "inline-block";
  } else {
    document.getElementById("submit-name").style.display = "none";
  }
});

usernameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("popup-overlay").style.display = "none";
  const name = usernameInput.value;
  appendMessage("You joined", "youjoined");
  socket.emit("new-user", name);
});

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}`, "otherusername");
  appendMessage(`${data.message}`, "chat-message");
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`, "userjoined");
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`, "disconnected");
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You : ${message}`, "your-message");
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message, assignedClass) {
  const messageElement = document.createElement("p");

  let classFinal = "";

  switch (assignedClass) {
    case "youjoined":
      classFinal = assignedClass;
      break;
    case "chat-message":
      classFinal = assignedClass;
      break;
    case "userjoined":
      classFinal = assignedClass;
      break;
    case "disconnected":
      classFinal = assignedClass;
      break;
    case "your-message":
      classFinal = assignedClass;
      break;
    case "otherusername":
      classFinal = assignedClass;
      break;

    default:
      break;
  }

  messageElement.classList.add(classFinal);

  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
