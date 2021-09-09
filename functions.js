function Toggle_class(element_id, class_name, opposite_element_id) {
    let element = document.getElementById(element_id)

    if(element == null)
        return console.error(`The element with id ${element_id} was not found`)

    if(element.classList.contains(class_name)) {
        element.classList.remove(class_name)
    } else {
        element.classList.add(class_name)

        if(opposite_element_id) {

            let opposite_element = document.getElementById(opposite_element_id)
            
            if(opposite_element.classList.contains(class_name))
                opposite_element.classList.remove(class_name)
        }
    }
}
function Verify_scroll() {
    let header = document.getElementById("header")
    const currentScroll = window.pageYOffset;
    if (currentScroll == 0) {
        header.classList.add("trasparent");
        return;
    }
    else {
        if(header.classList.contains("trasparent"))
            header.classList.remove("trasparent");
    }
} 
function Statistics_view() {
    document.getElementById("statistics")
    let elements_collection = statistics.getElementsByClassName("progress_style")
    var elements = [].slice.call(elements_collection);

    for(let a = 0 ; a != elements.length; a++) {
        let interval =  setInterval(() => {

            if(parseInt(elements[a].value) < parseInt(elements[a].dataset.toValue)) {
                elements[a].value = parseInt(elements[a].value) + 1
            } else {
                clearInterval(interval)
            }
        }, 50);
    }
}

window.addEventListener("scroll", () => {
    Verify_scroll();
});

Verify_scroll();

var intersectionObserver = new IntersectionObserver(function(entries) {
    if (entries[0].intersectionRatio <= 0) return;

    if(entries.entries(document.getElementById("statistics")))
        Statistics_view();
});
let statistics = document.getElementById("statistics")

intersectionObserver.observe(statistics);
