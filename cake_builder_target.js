var id_count = 0
window.addEventListener("message", Messages, false);

function Messages(ev)
{ 
    console.log(ev.origin, typeof ev.data, ev.data);

    if(typeof ev.data == "string") {
        id_count++

        if(ev.data.startsWith("p"))
            document.body.innerHTML += "        <p id=\""+id_count+"\">"+ ev.data.substring(1) +"</p>\n"

        else if(ev.data.startsWith("1"))
            document.body.innerHTML += "        <h1 id=\""+id_count+"\">"+ ev.data.substring(1) +"</h1>\n"

        else if(ev.data.startsWith("2"))
            document.body.innerHTML += "        <h2 id=\""+id_count+"\">"+ ev.data.substring(1) +"</h2>\n"

        else if(ev.data.startsWith("3"))
            document.body.innerHTML += "        <h3 id=\""+id_count+"\">"+ ev.data.substring(1) +"</h3>\n"

        else if(ev.data.startsWith("4"))
            document.body.innerHTML += "        <h4 id=\""+id_count+"\">"+ ev.data.substring(1) +"</h4>\n"

        else if(ev.data.startsWith("5"))
            document.body.innerHTML += "        <h5 id=\""+id_count+"\">"+ ev.data.substring(1) +"</h5>\n"

        else if(ev.data.startsWith("6"))
            document.body.innerHTML += "        <h6 id=\""+id_count+"\">"+ ev.data.substring(1) +"</h6>\n"
        
        else if(ev.data.startsWith("\n"))
            window.parent.postMessage(source_code(), '*')
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