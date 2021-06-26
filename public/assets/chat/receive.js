const msg_box = document.querySelector('.msg')

socket.on('cht_msg', function (msg) {
    let element1 = document.createElement('div')
    element1.setAttribute('class', 'chat')
    
    let element2 = document.createElement('h3')

    element2.innerText = msg

    element1.append(element2)
    
    msg_box.append(element1)
})