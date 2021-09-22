window.addEventListener("message", Messages, false);

function Messages(ev)
{    
    console.log(ev.origin, typeof ev.data, ev.data);
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

            //<!--Esto se colorea--> Esto se colorea (no debería) <!--Esto se colorea-->
            var regex_color_2 = new RegExp(/&lt;!--.*--&gt;/g);
            //Cadenas
            var regex_color_3 = new RegExp(/\"[^\"]*\"/g);
            let code = document.getElementById('code')
            code.innerHTML = ev.data[0].replace("spellcheck=\"false\" contenteditable=\"true\" ", "").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/ style=\"\"/g, "")
            .replace(regex_color_3,function color3(str){
                return '<span class="code_color_3">'+str+'</span>'
            })
            .replace(regex_color_1,function color1(str){
                return '<span class="code_color_1">'+str+'</span>'
            })
            .replace(regex_color_2,function color2(str){
                return '<span class="code_color_2">'+str+'</span>'
            })
            //Aquí agregamos el contador de lineas

            let lines = count_lines(code.innerText)
            let code_lines = document.getElementById("code_lines")
            code_lines.innerHTML = "";
            let lines_html = "";
            for(let a = 0; a != lines; a++) {
                lines_html += "<li>"+(a+1)+"</li>"
            }
            code_lines.innerHTML = lines_html
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

let text_menu = document.getElementById('text_menu')
document.getElementById('toggle_text_menu').onclick = function() {
    let windows_layer = document.getElementById('windows_layer')

    windows_layer.classList.add("show")
    text_menu.classList.add("show")
}
document.getElementById('p_button').onclick = function() {
    add_text("p")
}
document.getElementById('h1_button').onclick = function() {
    add_text("h1")
}
document.getElementById('h2_button').onclick = function() {
    add_text("h2")
}
document.getElementById('h3_button').onclick = function() {
    add_text("h3")
}
document.getElementById('h4_button').onclick = function() {
    add_text("h4")
}
document.getElementById('h5_button').onclick = function() {
    add_text("h5")
}
document.getElementById('h6_button').onclick = function() {
    add_text("h6")
}
document.getElementById('button_button').onclick = function() {
    add_text("button")
}

document.getElementById('source_button').onclick = function() {
    this.classList.add("active")
    document.getElementById('drag_button').classList.remove("active")
    let message =  ""

    iframe.postMessage(message, '*' );

    message =  [null,null,null,null,null,null,"drag_desactive"]

    iframe.postMessage(message, '*' );

    document.getElementById("source_code").classList.add("display")
    document.getElementById("hide_source").classList.add("display")
    document.getElementById("run_code").classList.add("display")
}

document.getElementById("drag_button").onclick = function() {
    this.classList.add("active")
    document.getElementById('source_button').classList.remove("active")
    document.getElementById('source_button').classList.remove("active")
    let message =  [null,null,null,null,null,null,"drag_active"]

    iframe.postMessage(message, '*' );

    document.getElementById("source_code").classList.remove("display")
    document.getElementById("hide_source").classList.remove("display")
    document.getElementById("run_code").classList.remove("display")
}

document.getElementById('cancel_text_menu').onclick = function() {
    windows_layer.classList.remove("show")
    text_menu.classList.remove("show")
}
document.getElementById('hide_source').onclick = function() {
    let message =  "\n"

    iframe.postMessage(message, '*' );

    document.getElementById("source_code").classList.remove("display")
    document.getElementById("hide_source").classList.remove("display")
    document.getElementById("run_code").classList.remove("display")
}
document.getElementById('run_code').onclick = function() {
    let code = document.getElementById('code')
    let message =  [code.innerText,null,null,null,null,null,"code"]

    iframe.postMessage(message, '*' );
}
document.getElementById("code").onkeyup = function(ev) {
    let code = document.getElementById("code")
    let lines = count_lines(code.innerText)
    let code_lines = document.getElementById("code_lines")
    let lines_html = "";
    
    for(let b = 0; code.clientHeight != code_lines.clientHeight; b++) {
        if(code.clientHeight < code_lines.clientHeight) {
            for(let a = 0; a != lines; a++) {
                if(code.clientHeight < code_lines.clientHeight) {
                    let last_li = code_lines.innerHTML.substring(code_lines.innerHTML.lastIndexOf("<li>"))
                    code_lines.innerHTML = code_lines.innerHTML.replace(last_li, "");
                } else {
                    break;
                }
            }
        }
        else if(code.clientHeight > code_lines.clientHeight) {
            for(let a = 0; a != lines; a++) {
                if(!code_lines.innerHTML.includes("<li>"+(a+1)+"</li>"))
                    lines_html += "<li>"+(a+1)+"</li>"
            }
            code_lines.innerHTML += lines_html
        }
    }
}
/**
 * @param {String} text
 * @returns {Number}
 */
function count_lines(text) {
    let lines = 1;
    for (let a = 0; a < text.length; a++) {
        if (text.charAt(a) == "\n") {
            lines++;
        }
    }
    return lines;
}
function add_text(node_name) {
    let text_content = text.value
    let color = (document.getElementById('letter_color').checked != true) ? document.getElementById('color_text').value: "";
    let underline = document.getElementById('underline').checked;
 
    
    let message =  [node_name,color,text_content,class_element.value,id_element.value,underline,"text"]; 

    iframe.postMessage(message, '*' );

    windows_layer.classList.remove("show")
    text_menu.classList.remove("show") 
}