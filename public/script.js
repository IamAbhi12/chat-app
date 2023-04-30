let socket = io()

$('#login-box').show()
$('#chat-box').hide()

$('#login-btn').click(() => {
    socket.emit('login', {
        username: $('#inp-username').val(),
        password: $('#inp-password').val()
    })
})

$('#send-msg-btn').click(() => {
    socket.emit('msg_sent', {
        to: $('#inp-send-to').val(),
        msg: $('#inp-new-msg').val()
    })
})

socket.on('logged_in', () => {
    $('#login-box').hide()
    $('#chat-box').show()
})

socket.on('incorrect_pass', () => {
    window.alert('Incorrect Username Or Password!!')
})

socket.on('msg_rcvd', (data) => {
    $('#ul-msgs').append($('<li>').text(
        `[${data.from}] : ${data.msg}`
    ))
})