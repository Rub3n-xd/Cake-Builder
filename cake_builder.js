window.addEventListener("message", Messages, false);

function Messages(ev)
{    
    if(typeof ev.data == "string") {
        let code = document.getElementById('code')
        code.value = ev.data
    }
}

var iframe = document.getElementById('iframe').contentWindow;

document.getElementById('p_button').onclick = function() {
    var message =  "p" + document.getElementById('p_text').value;

    iframe.postMessage(message, '*' );
}
document.getElementById('h1_button').onclick = function() {
    var message =  "1" + document.getElementById('h1_text').value;

    iframe.postMessage(message, '*' );
}
document.getElementById('h2_button').onclick = function() {
    var message =  "2" + document.getElementById('h2_text').value;

    iframe.postMessage(message, '*' );
}
document.getElementById('source_button').onclick = function() {
    var message =  "\n"

    iframe.postMessage(message, '*' );
}