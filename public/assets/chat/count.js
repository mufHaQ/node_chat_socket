const socket = io();

let orang = document.querySelector('.orang')

let pCount = 0

socket.on('cht_msg_count', function(count) {
    orang.innerHTML = count 
})
