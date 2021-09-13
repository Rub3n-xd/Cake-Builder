
window.addEventListener("message", Messages, false);

function Messages(ev)
{    
    if(typeof ev.data == "object") {
        if(ev.data[1] == "code"){
            var color_1 = ["&lt;!DOCTYPE", "&lt;([a-z]|[0-9])+&gt;", "&lt;([a-z]|[0-9])+", "&lt;\/([a-z]|[0-9])+&gt;"];
            //Etiquetas
            var regex_color_1 = new RegExp(color_1.join("|"), 'ig');
            //Comentarios TODO: Arreglar RegExp 
            //para que acepte todo tipo de 
            //caracteres menos la secuencia "--&gt;"
            //Ya que colorea a partir del primer "&lt;!--"
            //de una linea hasta el último  "--&gt;" de
            //una linea, por ejemplo:

            //<!--Esto se colorea--> Esto se colorea <!--Esto se colorea-->
            var regex_color_2 = new RegExp(/&lt;!--.*--&gt;/g);
            //Cadenas
            var regex_color_3 = new RegExp(/\"[^\"]*\"/g); 

            let code = document.getElementById('code')
            code.innerHTML = ev.data[0].replace("spellcheck=\"false\" contenteditable=\"true\" ", "").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(regex_color_3,function color3(str){
                return '<span class="code_color_3">'+str+'</span>'
            })
            .replace(regex_color_1,function color1(str){
                return '<span class="code_color_1">'+str+'</span>'
            })
            .replace(regex_color_2,function color2(str){
                return '<span class="code_color_2">'+str+'</span>'
            })
            
        }
        if(ev.data[1] == "notification"){
            let notification = document.getElementById('notification')
            let text = document.getElementById('notification_text')
            text.textContent = ev.data[0]
            notification.classList.add("show")
            setTimeout(() => {
                notification.classList.remove("show")
            }, 2000);
        }
    }
}

var iframe = document.getElementById('iframe').contentWindow;

var text = document.getElementById('text')
var class_element = document.getElementById('class_element')
var id_element = document.getElementById('id_element')

document.getElementById('p_button').onclick = function() {
    let text_content = text.value
    
    let message =  ["p",document.getElementById('color_text').value,text_content,class_element.value,id_element.value,"text"]; 
    console.log(message)
    iframe.postMessage(message, '*' );
}
document.getElementById('h1_button').onclick = function() {
    let text_content = text.value
    
    let message =  ["h1",document.getElementById('color_text').value,text_content,class_element.value,id_element.value,"text"];

    iframe.postMessage(message, '*' );
}
document.getElementById('h2_button').onclick = function() {
    let text_content = text.value
    
    let message =  ["h2",document.getElementById('color_text').value,text_content,class_element.value,id_element.value,"text"];

    iframe.postMessage(message, '*' );
}
document.getElementById('h3_button').onclick = function() {
    let text_content = text.value
    
    let message =  ["h3",document.getElementById('color_text').value,text_content,class_element.value,id_element.value,"text"];

    iframe.postMessage(message, '*' );
}
document.getElementById('h4_button').onclick = function() {
    let text_content = text.value
    
    let message =  ["h4",document.getElementById('color_text').value,text_content,class_element.value,id_element.value,"text"];
    iframe.postMessage(message, '*' );
}
document.getElementById('h5_button').onclick = function() {
    let text_content = text.value
    
    let message =  ["h5",document.getElementById('color_text').value,text_content,class_element.value,id_element.value,"text"];

    iframe.postMessage(message, '*' );
}
document.getElementById('h6_button').onclick = function() {
    let text_content = text.value
    
    let message =  ["h6",document.getElementById('color_text').value,text_content,class_element.value,id_element.value,"text"];

    iframe.postMessage(message, '*' );
}
document.getElementById('button_button').onclick = function() {
    let text_content = text.value
    
    let message =  ["button",document.getElementById('color_text').value,text_content,class_element.value,id_element.value,"text"];

    iframe.postMessage(message, '*' );
}
document.getElementById('source_button').onclick = function() {
    let message =  ""

    iframe.postMessage(message, '*' );

    document.getElementById("source_code").classList.add("display")
}
document.getElementById('hide_source').onclick = function() {
    let message =  "\n"

    iframe.postMessage(message, '*' );

    document.getElementById("source_code").classList.remove("display")
}
document.getElementById('run_code').onclick = function() {
    let code = document.getElementById('code')
    let message =  [code.innerText,null,null,null,null,"code"]

    iframe.postMessage(message, '*' );
}