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

        if(data[0].startsWith("p"))
            document.body.innerHTML += "        <p style=\"color: "+ data[1] +"\">"+ data[2] +"</p>\n"

        else if(data[0].startsWith("h1"))
            document.body.innerHTML += "        <h1 style=\"color: "+ data[1] +"\">"+ data[2] +"</h1>\n"

        else if(data[0].startsWith("h2"))
            document.body.innerHTML += "        <h2 style=\"color: "+ data[1] +"\">"+ data[2] +"</h2>\n"

        else if(data[0].startsWith("h3"))
            document.body.innerHTML += "        <h3 style=\"color: "+ data[1] +"\">"+ data[2] +"</h3>\n"

        else if(data[0].startsWith("h4"))
            document.body.innerHTML += "        <h4 style=\"color: "+ data[1] +"\">"+ data[2] +"</h4>\n"

        else if(data[0].startsWith("h5"))
            document.body.innerHTML += "        <h5 style=\"color: "+ data[1] +"\">"+ data[2] +"</h5>\n"

        else if(data[0].startsWith("h6"))
            document.body.innerHTML += "        <h6 style=\"color: "+ data[1] +"\">"+ data[2] +"</h6>\n"

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