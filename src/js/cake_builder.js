window.addEventListener("message", Messages, false);

function Messages(ev)
{    
    if(typeof ev.data == "string") {
        let code = document.getElementById('code')
        code.value = ev.data
    }
}

var iframe = document.getElementById('iframe').contentWindow;

var text = document.getElementById('text')
var class_element = document.getElementById('class_element')
var id_element = document.getElementById('id_element')

document.getElementById('p_button').onclick = function() {
    let text_content = text.value
    for(let x = 0; text_content.includes(","); x++) {
        text_content = text_content.replace(",","\n")
    } 
    let message =  `p,${document.getElementById('color_text').value},${text_content},${class_element.value},${id_element.value},text`;; 
    console.log(message)
    iframe.postMessage(message, '*' );
}
document.getElementById('h1_button').onclick = function() {
    let text_content = text.value
    for(let x = 0; text_content.includes(","); x++) {
        text_content = text_content.replace(",","\n")
    } 
    let message =  `h1,${document.getElementById('color_text').value},${text_content},${class_element.value},${id_element.value},text`;;

    iframe.postMessage(message, '*' );
}
document.getElementById('h2_button').onclick = function() {
    let text_content = text.value
    for(let x = 0; text_content.includes(","); x++) {
        text_content = text_content.replace(",","\n")
    } 
    let message =  `h2,${document.getElementById('color_text').value},${text_content},${class_element.value},${id_element.value},text`;;

    iframe.postMessage(message, '*' );
}
document.getElementById('h3_button').onclick = function() {
    let text_content = text.value
    for(let x = 0; text_content.includes(","); x++) {
        text_content = text_content.replace(",","\n")
    } 
    let message =  `h3,${document.getElementById('color_text').value},${text_content},${class_element.value},${id_element.value},text`;;

    iframe.postMessage(message, '*' );
}
document.getElementById('h4_button').onclick = function() {
    let text_content = text.value
    for(let x = 0; text_content.includes(","); x++) {
        text_content = text_content.replace(",","\n")
    } 
    let message =  `h4,${document.getElementById('color_text').value},${text_content},${class_element.value},${id_element.value},text`;;

    iframe.postMessage(message, '*' );
}
document.getElementById('h5_button').onclick = function() {
    let text_content = text.value
    for(let x = 0; text_content.includes(","); x++) {
        text_content = text_content.replace(",","\n")
    } 
    let message =  `h5,${document.getElementById('color_text').value},${text_content},${class_element.value},${id_element.value},text`;;

    iframe.postMessage(message, '*' );
}
document.getElementById('h6_button').onclick = function() {
    let text_content = text.value
    for(let x = 0; text_content.includes(","); x++) {
        text_content = text_content.replace(",","\n")
    } 
    let message =  `h6,${document.getElementById('color_text').value},${text_content},${class_element.value},${id_element.value},text`;;

    iframe.postMessage(message, '*' );
}
document.getElementById('source_button').onclick = function() {
    let message =  "\n"

    iframe.postMessage(message, '*' );

    document.getElementById("source_code").classList.add("display")
}
document.getElementById('hide_source').onclick = function() {
    let message =  "\n"

    iframe.postMessage(message, '*' );

    document.getElementById("source_code").classList.remove("display")
}