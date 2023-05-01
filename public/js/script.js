// Initialize socket.io
const socket = io();

// Handle chat messages
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages-container');
const username = document.getElementById('username').innerText;

// Submit message form
messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const messageContent = messageInput.value.trim();
    if (messageContent !== '') {
        socket.emit('chat message', { content: messageContent, sender: username });
        messageInput.value = '';
    }
});

// Receive new chat message
socket.on('chat message', message => {
    const messageEl = document.createElement('div');
    messageEl.classList.add('message');
    messageEl.innerHTML = `
    <span class="sender">${message.sender}</span>
    <span class="timestamp">${formatDate(message.timestamp)}</span>
    <span class="content">${message.content}</span>
  `;
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// Format date as string
function formatDate(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

// Handle group chat functionality
const memberList = document.getElementById('member-list');
const groupMessageForm = document.getElementById('group-message-form');
const groupMessageInput = document.getElementById('group-message-input');

// Submit group message form
groupMessageForm.addEventListener('submit', e => {
    e.preventDefault();
    const messageContent = groupMessageInput.value.trim();
    if (messageContent !== '') {
        socket.emit('group chat message', { content: messageContent, sender: username });
        groupMessageInput.value = '';
    }
});

// Update member list
socket.on('member list', members => {
    memberList.innerHTML = '';
    members.forEach(member => {
        const memberEl = document.createElement('div');
        memberEl.classList.add('member');
        memberEl.innerHTML = `
      <span class="username">${member.username}</span>
      <span class="status">${member.status}</span>
    `;
        memberList.appendChild(memberEl);
    });
});

// Receive new group chat message
socket.on('group chat message', message => {
    const messageEl = document.createElement('div');
    messageEl.classList.add('message');
    messageEl.innerHTML = `
    <span class="sender">${message.sender}</span>
    <span class="timestamp">${formatDate(message.timestamp)}</span>
    <span class="content">${message.content}</span>
  `;
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
