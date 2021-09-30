window.addEventListener("message", Messages, false);

function Messages(ev)
{    
    console.log(ev.origin, typeof ev.data, ev.data);
    if(typeof ev.data == "object") {
        if(ev.data[1] == "code"){
            let color_1 = ["&lt;!DOCTYPE", "&lt;([a-z]|[0-9])+&gt;", "&lt;([a-z]|[0-9])+", "&lt;\/([a-z]|[0-9])+&gt;"];
            //Etiquetas
            let regex_color_1 = new RegExp(color_1.join("|"), 'ig');
            //Comentarios
            let regex_color_2 = new RegExp(/&lt;!--(([^&][^g][^t][^;])*|[^\-]*|[^\-]{2,}([^&][^g][^t][^;])+)--&gt;/g);
            //Cadenas
            let regex_color_3 = new RegExp(/\"[^\"]*\"/g);
            //Lineas
            let regex_color_4 = new RegExp(/.*\n/g);
            //Errores
            let regex_color_error = new RegExp(/&error;.+/g);

            let code = document.getElementById('html_code')
            let dummy = document.getElementById('html_dummy')

            code.innerHTML = ev.data[0].replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/ style=\"\"/g, "").replace("&error;","")
            .replace(/ data-node-name=\".*\"/, "")
            .replace(/ id=\"\"/, "")
            .replace(/ id=\"element_selected_cake_builder\"/, "")
            
            dummy.innerHTML = ev.data[0].replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/ style=\"\"/g, "")
            .replace(/ data-node-name=\".*\"/, "")
            .replace(/ id=\"\"/, "")
            .replace(/ id=\"element_selected_cake_builder\"/, "")

            .replace(regex_color_3,function color3(str){
                return '<span class="code_color_3">'+str+'</span>'
            })
            .replace(regex_color_error,function colorError(str){
                return '<span class="code_color_error">'+str.substring(7)+'</span>'
            })
            .replace(regex_color_1,function color1(str){
                return '<span class="code_color_1">'+str+'</span>'
            })
            .replace(regex_color_2,function color2(str){
                return '<span class="code_color_2">'+str+'</span>'
            })
            .replace(regex_color_4,function color2(str){
                return '<span class="line">'+str+'</span>'
            })

            //Aquí agregamos el contador de lineas

            let lines = count_lines(code.innerText)
            let code_lines = document.getElementById("html_lines")
            code_lines.innerHTML = "";
            let lines_html = "";
            for(let a = 0; a != lines; a++) {
                lines_html += "<li>"+(a+1)+"</li>"
            }
            code_lines.innerHTML = lines_html
        }
        else if(ev.data[1] == "style"){
            let code = document.getElementById('css_code')
            let dummy = document.getElementById('css_dummy')

            let regex_color_1 = new RegExp(/(?<={[^}]*)([a-z]|-)+:[^:]/g);
            let regex_color_2 = new RegExp(/(\.|\#)[^0-9]([a-zA-Z0-9]|-|_)+/g);
            let regex_color_3 = new RegExp(/\"[^\"]*\"/g);
            let regex_color_4 = new RegExp(/(?<=( |\(|:))-?([0-9])+(\.[0-9]+)?(deg|%|px|ch|cm|mm|em|ex|fr|in|pc|pt|rem|vh|vw|vmin|max|s|ms|)/g);
            let regex_color_5 = new RegExp(/url\(.+\)/g);
            let regex_color_6 = new RegExp(/@([a-z]|[A-Z]|[0-9]|-|_)+/g);
            let regex_color_7 = new RegExp(/([a-z]|[A-Z]|[0-9]|-|_)+\(.*\)/g);
            let regex_color_error = new RegExp(/&error;.+/g);

            code.innerHTML = ev.data[0].replace("&error;","")

            dummy.innerHTML = ev.data[0]
            .replace(regex_color_3,function color3(str){
                return '<span class="code_color_3">'+str+'</span>'
            })
            .replace(regex_color_error,function colorError(str){
                return '<span class="code_color_error">'+str.substring(7)+'</span>'
            })
            .replace(regex_color_1,function color1(str){
                return '<span class="code_color_4">'+str.substring(0, str.length - 2)+'</span>'+str.substring(str.length - 2)
            })
            .replace(regex_color_2,function color2(str){
                return '<span class="code_color_5">'+str+'</span>'
            })
            .replace(regex_color_4,function color4(str){
                return '<span class="code_color_6">'+str+'</span>'
            })
            .replace(regex_color_5,function color5(str){
                return str.substring(0, 4)+'<span class="code_color_3">'+str.substring(4, str.length - 1)+'</span>'+str.substring(str.length - 1)
            })
            .replace(regex_color_6,function color6(str){
                return '<span class="code_color_7">'+str+'</span>'
            })
            .replace(regex_color_7,function color7(str){
                return '<span class="code_color_8">'+str.substring(0,str.indexOf("("))+'</span>'+str.substring(str.indexOf("("))
            })


            let lines = count_lines(code.innerText)
            let code_lines = document.getElementById("css_lines")
            code_lines.innerHTML = "";
            let lines_html = "";

            for(let a = 0; a != lines; a++) {
                lines_html += "<li>"+(a+1)+"</li>"
            }

            code_lines.innerHTML = lines_html
        }
        else if(ev.data[1] == "notification"){
            let notification = document.getElementById('notification')
            let text = document.getElementById('notification_text')
            text.textContent = ev.data[0]
            notification.classList.add("show")
            setTimeout(() => {
                notification.classList.remove("show")
            }, 3000);
        }
        else if(ev.data[1] == "element_selected"){
            let modify_element_menu = document.getElementById('modify_element')
            let element_color = document.getElementById('text_color_selected')
            let text_type = document.getElementById('text_type_selected')
            
            modify_element_menu.classList.add("display")
            element_color.value = ev.data[0][0]
            text_type.value = ev.data[0][1]
        }
        else if(ev.data[1] == "element_deselected"){
            let modify_element_menu = document.getElementById('modify_element')
            
            modify_element_menu.classList.remove("display")
        }
    }
}
var iframe = document.getElementById('iframe').contentWindow;
var text = document.getElementById('text')
var class_element = document.getElementById('class_element')
var id_element = document.getElementById('id_element')
let text_menu = document.getElementById('text_menu')
let cssrule_menu = document.getElementById('cssrule_menu')
let del_cssrule_menu = document.getElementById('del_cssrule_menu')
let div_menu = document.getElementById('div_menu')

document.getElementById('toggle_text_menu').onclick = function() {
    let windows_layer = document.getElementById('windows_layer')

    windows_layer.classList.add("show")
    cssrule_menu.classList.remove("show")
    text_menu.classList.add("show")
    div_menu.classList.remove("show")
    del_cssrule_menu.classList.remove("show")
}
document.getElementById('toggle_cssrule_menu').onclick = function() {
    let windows_layer = document.getElementById('windows_layer')

    windows_layer.classList.add("show")
    cssrule_menu.classList.add("show")
    text_menu.classList.remove("show")
    div_menu.classList.remove("show")
    del_cssrule_menu.classList.remove("show")
}
document.getElementById('toggle_del_cssrule_menu').onclick = function() {
    let windows_layer = document.getElementById('windows_layer')

    windows_layer.classList.add("show")
    cssrule_menu.classList.remove("show")
    text_menu.classList.remove("show")
    div_menu.classList.remove("show")
    del_cssrule_menu.classList.add("show")
}
document.getElementById('toggle_div_menu').onclick = function() {
    let windows_layer = document.getElementById('windows_layer')

    windows_layer.classList.add("show")
    cssrule_menu.classList.remove("show")
    text_menu.classList.remove("show")
    div_menu.classList.add("show")
    del_cssrule_menu.classList.remove("show")
}
document.getElementById("add_cssrule").onclick = function() {
    let selector = document.getElementById("css_selector_text")
    let rules = document.getElementById("css_rules_text")
    let end_pos = document.getElementById("end_index")
    let pos = (end_pos.checked) ? -1: 0;
    let cssrule = selector.value + " { " + rules.value + " } "

    let message =  [cssrule,pos,null,null,null,null,"add_cssrule"]

    iframe.postMessage(message, '*' );

    windows_layer.classList.remove("show")
    cssrule_menu.classList.remove("show")
}


document.getElementById('add_text_button').onclick = function() {
    add_text(document.getElementById("text_type").value)
}

document.getElementById('source_button').onclick = function() {
    this.classList.add("active")
    document.getElementById('drag_button').classList.remove("active")
    document.getElementById('edit_button').classList.remove("active")
    let message =  ""

    iframe.postMessage(message, '*' );

    message =  [null,null,null,null,null,null,"drag_desactive"]

    iframe.postMessage(message, '*' );

    message =  [null,null,null,null,null,null,"cancel_select_text"]

    iframe.postMessage(message, '*' );

    document.getElementById("source_code").classList.add("display")
    document.getElementById("code_page_selector").classList.add("display")
    document.getElementById("html").classList.add("display")
    document.getElementById("hide_source").classList.add("display")
    document.getElementById("run_code").classList.add("display")
}


document.getElementById("drag_button").onclick = function() {
    this.classList.add("active")
    document.getElementById('source_button').classList.remove("active")
    document.getElementById('edit_button').classList.remove("active")
    let message =  [null,null,null,null,null,null,"drag_active"]

    iframe.postMessage(message, '*' );

    message =  [null,null,null,null,null,null,"cancel_select_text"]

    iframe.postMessage(message, '*' );

    document.getElementById("source_code").classList.remove("display")
    document.getElementById("code_page_selector").classList.remove("display")
    document.getElementById("hide_source").classList.remove("display")
    document.getElementById("run_code").classList.remove("display")
}
document.getElementById("edit_button").onclick = function() {
    this.classList.add("active")
    document.getElementById('drag_button').classList.remove("active")
    document.getElementById('source_button').classList.remove("active")
    let message =  [null,null,null,null,null,null,"drag_desactive"]

    iframe.postMessage(message, '*' );
    
    message =  [null,null,null,null,null,null,"select_text"]

    iframe.postMessage(message, '*' );

    document.getElementById("source_code").classList.remove("display")
    document.getElementById("code_page_selector").classList.remove("display")
    document.getElementById("hide_source").classList.remove("display")
    document.getElementById("run_code").classList.remove("display")
}

document.getElementById("delete_element_modify").onclick = function() {
    iframe.postMessage([null,null,null,null,null,null,"delete_selected"], '*')
}
document.getElementById("confirm_element_modify").onclick = function() {
    let color = document.getElementById("text_color_selected")
    let type = document.getElementById("text_type_selected")

    iframe.postMessage([color.value,type.value,null,null,null,null,"change_selected"], '*')
    iframe.postMessage([null,null,null,null,null,null,"change_selected"], '*')
}

document.getElementById('cancel_text_menu').onclick = function() {
    windows_layer.classList.remove("show")
    text_menu.classList.remove("show")
}
document.getElementById('cancel_cssrule_menu').onclick = function() {
    windows_layer.classList.remove("show")
    cssrule_menu.classList.remove("show")
}
document.getElementById('cancel_div_menu').onclick = function() {
    windows_layer.classList.remove("show")
    div_menu.classList.remove("show")
    div_menu.classList.remove("show")
}
document.getElementById('hide_source').onclick = function() {
    let message =  "\n"

    iframe.postMessage(message, '*' );

    document.getElementById("source_code").classList.remove("display")
    document.getElementById("code_page_selector").classList.remove("display")
    document.getElementById("html").classList.remove("display")
    document.getElementById("css").classList.remove("display")
    document.getElementById("hide_source").classList.remove("display")
    document.getElementById("run_code").classList.remove("display")
}
document.getElementById('run_code').onclick = function() {
    let code = document.getElementById('html_code')
    let message =  [code.innerText,null,null,null,null,null,"code"]

    iframe.postMessage(message, '*' );

    message =  [null,null,null,null,null,null,"select_text"]

    iframe.postMessage(message, '*' );
}
document.getElementById("html_code").onkeyup = function(ev) {
    let code = document.getElementById("html_code")
    let dummy = document.getElementById('html_dummy')
    let code_lines = document.getElementById("html_lines")

    let color_1 = ["&lt;!DOCTYPE", "&lt;([a-z]|[0-9])+&gt;", "&lt;([a-z]|[0-9])+", "&lt;\/([a-z]|[0-9])+&gt;"];
    //Etiquetas
    let regex_color_1 = new RegExp(color_1.join("|"), 'ig');

    dummy.innerHTML = code.innerHTML
    .replace(/\"[^\"]*\"/g,function color3(str){
        return '<span class="code_color_3">'+str+'</span>'
    })
    .replace(regex_color_1,function color1(str){
        return '<span class="code_color_1">'+str+'</span>'
    })
    .replace(/&lt;!--(([^&][^g][^t][^;])*|[^\-]*|[^\-]*([^&][^g][^t][^;])+)--&gt;/g,function color2(str){
        return '<span class="code_color_2">'+str+'</span>'
    })
    .replace(/.*\n/,function color2(str){
        return '<span class="line">'+str+'</span>'
    })
    .replace(/&error;.*/g,function color1(str){
        return '<span class="code_color_error">'+str.substring(7)+'</span>'
    })

    if(code.clientHeight == code_lines.clientHeight)
        return
    let lines = count_lines(code.innerText)
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
document.getElementById("html_page").onclick = function(ev) {
    document.getElementById("html").classList.add("display")
    document.getElementById("css").classList.remove("display")
}
document.getElementById("css_page").onclick = function(ev) {
    document.getElementById("html").classList.remove("display")
    document.getElementById("css").classList.add("display")
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
/**
 * @param {String[]} id_checkboxs_off ID del checkbox a encender
 */
function off_checkboxs(id_checkboxs_off) {
    for (let a = 0; a != id_checkboxs_off.length; a++) {
        document.getElementById(id_checkboxs_off[a]).checked = false
    }
}