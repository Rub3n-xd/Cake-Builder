let myRules = document.styleSheets[0].cssRules;
console.log(myRules);
console.log(myRules.length);
console.log(myRules[0]);

document.body.setAttribute("spellcheck","false")
document.body.setAttribute("contenteditable","true")
window.addEventListener("message", Messages, false);

function Messages(ev)
{
    console.log(ev.origin, typeof ev.data, ev.data);

    if(typeof ev.data == "object") {
        let data = ev.data

        if(data[6] == "text") {//Agregar un elemento
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
    }
    //Enviar codigo
    source_code()
    source_code_css2()
}
window.onload = function() {
    source_code()
    source_code_css2()
}
/**
 * @returns {String} Code
**/
function source_code() {
    let code = "<!DOCTYPE html>\n<html>\n    <head>\n        " + document.head.innerHTML.trimStart().trimEnd() + "\n    </head>\n    <body>\n        " + document.body.innerHTML.trimStart().trimEnd() + "\n    </body>\n</html>"

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

    document.head.innerHTML = head
    document.body.innerHTML = body
    cancel_drag_and_drop();
}
document.onkeydown = function() {
    window.parent.postMessage([source_code(), "code"], '*')
}
document.onkeyup = function() {
    window.parent.postMessage([source_code(), "code"], '*')
}
document.ondragend = function() {
    window.parent.postMessage([source_code(), "code"], '*')
}

var dragSrcEl = null;
function drag_and_drop() {
    let node_groups = document.querySelectorAll("div, article, div div, article div");
    [].forEach.call(node_groups, function(group) {
        group.style.cursor = "move"
        group.setAttribute("draggable", true)
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
    if (dragSrcEl != this) {
        let fromClass = this.className;
        let toClass = dragSrcEl.className;
        console.log("dragSrcEl: " + dragSrcEl.className)
        console.log("this: " + this.className)
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
    this.style.removeProperty("opacity")
    let node_groups = document.querySelectorAll("div, article, div div, article div");
    [].forEach.call(node_groups, function(group) {
        group.style.removeProperty("border")
    });
}
function source_code_css() {
    Promise.all([
        fetch(document.styleSheets[0].href).then(x => x.text()).catch(() => {
            let error = "&error;No se ha podido obtener el contenido del archivo css"
            return error
        })
    ]).then(([css]) => {
        window.parent.postMessage([css, "style"], '*')
    });
}
function source_code_css2() {
    let code = ""
    try {
        for(let a = 0; a != document.styleSheets[0].cssRules.length; a++) {
            code += document.styleSheets[0].cssRules[a].cssText
        }
    } catch {
        return
    }
    code = 
    code.replace(/{ /g, "{\n    ")
    .replace(/;/g, ";\n    ")
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