window.addEventListener("message", Messages, false);
window.parent.postMessage([source_code(), "code"], '*')

function Messages(ev)
{
    console.log(ev.origin, typeof ev.data, ev.data);

    if(typeof ev.data == "object") {
        let data = ev.data

        if(data[5] == "text") {//Estructura de textos
            if(!data[2]) {
                window.parent.postMessage(["Ingrese un texto", "notification"], '*')
                return
            }
            let element = "        <"+ data[0] +" style=\"color: "+ data[1] +"\" class=\""+ data[3] +"\" id=\"" + data[4] + "\">"+ data[2] +"</"+ data[0] +">\n"
            if(!data[3])
                element = element.replace("class=\"\"", "")
            if(!data[4])
                element = element.replace("id=\"\"", "")
            document.body.innerHTML += element
        }
        else if(data[5] == "code") {
            get_source_code(data[0]);
        }
        window.parent.postMessage([source_code(), "code"], '*')
    }
}
/**
 * @returns {String} Code
**/
function source_code() {
    let code = "<!DOCTYPE html>\n<html>\n    <head>\n        " + document.head.innerHTML.trimStart().trimEnd() + "\n    </head>\n    <body>\n        " + document.body.innerHTML.trimStart().trimEnd() + "\n    </body>\n</html>"
    return code;
}
/** 
 * @param {String} code
*/
function get_source_code(code) {
    let nodeshtml = ["<head>", "</head>", "<body>", "</body>", "<html>", "</html>", "<!DOCTYPE html>"] /* Etiquetas que no pueden faltar en el codigo */ 
    for(let x = 0; x  != nodeshtml.length; x++) {
        if(!code.includes(nodeshtml[x])) {
            window.parent.postMessage(["No se ha podido ejecutar el codigo, no se encontro la etiqueta " + nodeshtml[x], "notification"], '*')
            return
        }
    }
    let head = code.substring(code.indexOf(nodeshtml[0]) + nodeshtml[0].length, code.indexOf(nodeshtml[1]))
    
    let body = code.substring(code.indexOf(nodeshtml[2]) + nodeshtml[2].length, code.indexOf(nodeshtml[3]))

    document.head.innerHTML = head;
    document.body.innerHTML = body;
}