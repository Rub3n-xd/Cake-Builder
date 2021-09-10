window.addEventListener("message", Messages, false);
window.parent.postMessage(source_code(), '*')

function Messages(ev)
{ 
    console.log(ev.origin, typeof ev.data, ev.data);

    if(typeof ev.data == "string") {
        let data = ev.data.split(",")

        for(let x = 0; data[2].includes("\n"); x++) {
            data[2] = data[2].replace("\n",",")
        }

        if(data[5] == "text" && data[2]) {//Estructura de textos
            let element = "        <"+ data[0] +" style=\"color: "+ data[1] +"\" class=\""+ data[3] +"\" id=\"" + data[4] + "\">"+ data[2] +"</"+ data[0] +">\n"
            if(!data[3])
                element = element.replace("class=\"\"", "")
            if(!data[4])
                element = element.replace("id=\"\"", "")
            document.body.innerHTML += element
        }
        window.parent.postMessage(source_code(), '*')
    }
}
/**
 * @returns {String} Code
**/
function source_code() {
    let code = "<!DOCTYPE html>\n<html>\n    <head>\n        " + document.head.innerHTML + "\n    </head>\n    <body>\n        " + document.body.innerHTML + "\n    </body>\n</html>"
    return code;
}
function get_source_code(code) {
    //TODO: hacer una función que obtenga el codigo
    //y lo divida en dos partes, el head y el body,
    //Lo demás puede ser omitido. Tras obtener esos
    //dos strings sustituir por su correspondiente
    //innerHTML ("document.head.innerHTML", 
    //"document.body.innerHTML").
}