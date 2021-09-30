document.body.setAttribute("spellcheck","false")
document.body.setAttribute("contenteditable","true")
window.addEventListener("message", Messages, false);

function Messages(ev)
{
    console.log(ev.origin, typeof ev.data, ev.data);

    if(typeof ev.data == "object") {
        let data = ev.data

        if(data[6] == "text") {//Agregar un elemento de texto
            if(!data[2]) {
                window.parent.postMessage(["Ingrese un texto", "notification"], '*')
                return
            }
            let element = "        <"+ data[0] +" style=\"color: "+ data[1] +"; text-decoration: underline;\" class=\""+ data[3] +"\" id=\"" + data[4] + "\">"+ data[2] +"</"+ data[0] +">\n"
            if(!data[1] && !data[5])
                element = element.replace("style=\"color: ; text-decoration: underline;\"", "")
            else {
                if (!data[1]) {
                    element = element.replace("color: ; ", "")
                }
                else if (!data[5]) {
                    element = element.replace(" text-decoration: underline;", "")
                }
            }
            if(!data[3])
                element = element.replace("class=\"\"", "")
            if(!data[4])
                element = element.replace("id=\"\"", "")
            document.body.innerHTML += element
        }
        else if(data[6] == "code") {//Sustituir codigo
            get_source_code(data[0]);
        }
        else if(data[6] == "style") {//Sustituir codigo
            get_source_code_css2(data[0])
        }
        else if(data[6] == "drag_active") {//Activar desplazamiento de divs
            drag_and_drop();
        }
        else if(data[6] == "drag_desactive") {//Desactivar desplazamiento de divs
            cancel_drag_and_drop();
        }
        else if(data[6] == "add_cssrule") {//Añadir regla CSS
            add_cssrule(data[0], data[1])
        } 
        else if(data[6] == "delete_selected") {
            if(document.getElementById("element_selected_cake_builder"))
                document.getElementById("element_selected_cake_builder").remove()
            else 
                window.parent.postMessage(["No hay ningun elemento seleccionado", "notification"], '*')
        }
        else if(data[6] == "change_selected") {
            if(document.getElementById("element_selected_cake_builder")) {
                let element = document.getElementById("element_selected_cake_builder");
                element.style.color = data[0]
                ChangeNodeName(element, data[1])
            }
            else 
                window.parent.postMessage(["No hay ningun elemento seleccionado", "notification"], '*')
        }
        else if(data[6] == "select_text") {
            select_text();
        }
        else if(data[6] == "cancel_select_text") {
            cancel_select_text();
        }
    }
    //Enviar codigo
    source_code()
    source_code_css()
}
window.onload = function() {
    source_code()
    source_code_css()
}
/**
 * @returns {String} Code
**/
function source_code() {
    let code
    try {
        code = "<!DOCTYPE html>\n<html>\n    <head>\n        " + document.head.innerHTML.trimStart().trimEnd() + "\n    </head>\n    <body>\n        " + document.body.innerHTML.trimStart().trimEnd() + "\n    </body>\n</html>"
    } catch {
        code = "&error;No se ha podido obtener el codigo HTML"
    }
    window.parent.postMessage([code, "code"], '*')
}
/** 
 * @param {String} code
*/
function get_source_code(code) {
    let nodeshtml = ["<!DOCTYPE html>", "<html>", "</html>", "<head>", "</head>", "<body>", "</body>"] /* Etiquetas que no pueden faltar en el código */ 
    for(let x = 0; x  != nodeshtml.length; x++) {
        if(!code.includes(nodeshtml[x])) {
            return window.parent.postMessage(["No se ha podido ejecutar el código, no se encontro la etiqueta " + nodeshtml[x], "notification"], '*')
            
        }
    }

    let head = code.substring(code.indexOf(nodeshtml[3]) + nodeshtml[3].length, code.indexOf(nodeshtml[4]))
    let body = code.substring(code.indexOf(nodeshtml[5]) + nodeshtml[1].length, code.indexOf(nodeshtml[6]))

    if(!body.includes("<script src=\"js/cake_builder_target.js\"></script>"))
        return window.parent.postMessage(["No se ha podido ejecutar el código, no se encontro el script cake_builder_target.js", "notification"], '*')
    if(body.includes("<link href=\"css/cake_builder_target.css\" rel=\"stylesheet\" id=\"selected_style_cake_builer\">"))
        return window.parent.postMessage(["No se ha podido ejecutar el código, has agregado un estilo usado para el IDE", "notification"], '*')

    document.head.innerHTML = head
    document.body.innerHTML = body
    cancel_drag_and_drop();
}
document.onkeydown = function() {
    source_code()
}
document.onkeyup = function() {
    source_code()
}
document.ondragend = function() {
    source_code()
}

var dragSrcEl = null;
function drag_and_drop() {
    let node_groups = document.querySelectorAll("div, article, div div, article div");
    [].forEach.call(node_groups, function(group) {
        group.style.cursor = "move"
        group.setAttribute("draggable", true)
        group.classList.remove("drag_group")
        group.addEventListener('dragstart', handleDragStart, false);
        group.addEventListener('dragenter', handleDragEnter, false)
        group.addEventListener('dragover', handleDragOver, false);
        group.addEventListener('dragleave', handleDragLeave, false);
        group.addEventListener('drop', handleDrop, false);
        group.addEventListener('dragend', handleDragEnd, false);
    });
}
function cancel_drag_and_drop() {
    let node_groups = document.querySelectorAll("div, article, div div, article div");
    [].forEach.call(node_groups, function(group) {
        group.style.removeProperty("cursor")
        group.classList.add("drag_group")
        group.removeAttribute("draggable")
        group.addEventListener('dragstart', null, false);
        group.addEventListener('dragenter', null, false)
        group.addEventListener('dragover', null, false);
        group.addEventListener('dragleave', null, false);
        group.addEventListener('drop', null, false);
        group.addEventListener('dragend', null, false);
    });
}

function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
}

function handleDragEnter(e) {
    this.style.border = "2px dashed white";
}

function handleDragLeave(e) {
    this.style.border = "none"; 
}
function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation(); 
    }
    if (dragSrcEl != this && (dragSrcEl.nodeName == "DIV" || dragSrcEl.nodeName == "ARTICLE" )) {
        let fromClass = this.className;
        let toClass = dragSrcEl.className;
        
        
        dragSrcEl.className = fromClass;
        this.className = toClass;

        dragSrcEl.innerHTML = this.innerHTML;
        
        dragSrcEl.style.removeProperty("opacity")
        this.style.removeProperty("opacity")
        let node_groups = document.querySelectorAll("div, article, div div, article div");
        [].forEach.call(node_groups, function(group) {
            group.style.removeProperty("border")
        });
        
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
}
function handleDragEnd(e) {
    dragSrcEl.style.removeProperty("opacity")
    this.style.removeProperty("opacity")
    let node_groups = document.querySelectorAll("div, article, div div, article div");
    [].forEach.call(node_groups, function(group) {
        group.style.removeProperty("border")
    });
}
function source_code_css() {
    let code = ""
    try {
        for(let a = 0; a != document.styleSheets[0].cssRules.length; a++) {
            code += document.styleSheets[0].cssRules[a].cssText
        }
    } catch {
        code = "&error;No se ha podido obtener el codigo CSS"
    }
    code = 
    code.replace(/{ /g, "{\n    ")
    .replace(/(?<=[^&][^e][^r][^r][^o][^r]);/g, ";\n    ")
    .replace(/     }/g, "}\n")

    window.parent.postMessage([code, "style"], '*')
}
function add_cssrule(rule, pos) {
    if(pos == -1)
        pos = document.styleSheets[0].cssRules.length
    try {
        document.styleSheets[0].insertRule(rule, pos)
    }
    catch {
        window.parent.postMessage(["No se ha podido insertar la regla CSS", "notification"], '*')
    }
}
function delete_cssrule(pos) {
    if(pos == -1)
        pos = document.styleSheets[0].cssRules.length
    try {
        document.styleSheets[0].deleteRule(pos)
    }
    catch {
        window.parent.postMessage(["No se ha podido borrar la regla CSS", "notification"], '*')
    }
}

function select_text() {
    console.log("select_text")
    let node_groups = document.querySelectorAll("button,p,span,h1,h2,h3,h4,h5,h6,button");
    [].forEach.call(node_groups, function(group) {
        group.addEventListener('click', text_onclick, false);
        group.addEventListener('mouseenter', onmouseenter, false);
    });
    onmousedown = deselect_text();
    let css = document.createElement("link")
    css.href = "css/cake_builder_target.css"
    css.rel = "stylesheet"
    css.id = "selected_style_cake_builer"
    document.head.appendChild(css)
}
function cancel_select_text() {
    console.log("cancel_select_text")
    let node_groups = document.querySelectorAll("button,p,span,h1,h2,h3,h4,h5,h6,button");
    [].forEach.call(node_groups, function(group) {
        group.addEventListener('click', null, false);
        group.addEventListener('mouseenter', null, false);
    });
    onmousedown = null;

    let selected_css = document.getElementById("selected_style_cake_builer")
    if(selected_css)
        selected_css.remove()
    
    let selected = document.getElementById("element_selected_cake_builder")
    if(selected)
        selected.id = selected.id.replace("element_selected_cake_builder", "")
    
    let message = [null, "element_deselected"]

    window.parent.postMessage(message, '*')
}
onmousedown = deselect_text();
function deselect_text() {
    let after_selected = document.getElementById("element_selected_cake_builder")
    if(after_selected)
        after_selected.id = after_selected.id.replace("element_selected_cake_builder", "")
    
    let message = [null, "element_deselected"]

    window.parent.postMessage(message, '*')
}
function onmouseenter(ev) {
    let selected_css = document.getElementById("selected_style_cake_builer")
    if(!selected_css)
        return
    if(this.dataset)
        this.dataset.nodeName = this.nodeName.toLowerCase()
}
function text_onclick() {
    let selected_css = document.getElementById("selected_style_cake_builer")
    if(!selected_css)
        return
    let after_selected = document.getElementById("element_selected_cake_builder")
    if(after_selected)
        after_selected.id = after_selected.id.replace("element_selected_cake_builder", "")
    
    this.id = "element_selected_cake_builder"
    
    let style = window.getComputedStyle(this)
    
    let message = [[rgb_to_hex(style.color), this.nodeName.toLowerCase()], "element_selected"]

    window.parent.postMessage(message, '*')
}
/**
 * 
 * @param {String} colorval 
 * @returns 
 */
function rgb_to_hex(colorval){
    var colorval = colorval.replace("rgba", "rgb");
    var colorval = colorval.replace(/(?<=\([0-9]+, [0-9]+, [0-9]+), ([0-9]|\.)+/, "");

    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    
    if(!parts)
        return colorval
    delete(parts[0]);
    
    for (var i = 1; i <= 3; ++i) {
        parts[i]= parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i]= '0' + parts[i];
    }
    
    return '#' + parts.join('');

}
/**
 * 
 * @param {HTMLElement} element 
 * @param {String} newNode
 */
function ChangeNodeName(element, newNode) {
    let nodeStart = /<[a-zA-Z0-9]+/;
    let nodeEnd = /<\/[a-zA-Z0-9]+>$/;
    console.log(element.outerHTML)
    element.outerHTML = element.outerHTML
    .replace(nodeStart, "<"+newNode)
    .replace(nodeEnd, "</"+newNode+">");

    return element;
}