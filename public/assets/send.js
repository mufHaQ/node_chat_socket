const btn_send = document.querySelector(".btn-send")
const input_msg = document.querySelector(".input-msg")
const msg_box = document.querySelector('.msg')

const socket = io();

btn_send.addEventListener('click', () => {
    if (input_msg.value) {
        socket.emit('chat message', input_msg.value)
        input_msg.value = ''
    }
})

socket.on('chat message', function (msg) {
    let element = document.createElement('h3')
    element.innerText = msg
    msg_box.append(element)
})