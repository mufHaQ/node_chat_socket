const btn_send = document.querySelector(".btn-send")
const input_msg = document.querySelector(".input-msg")

document.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        btn_send.click()
    }
})

btn_send.addEventListener('click', () => {
    if (input_msg.value) {
        socket.emit('cht_msg', input_msg.value)
        input_msg.value = ''
    }
})