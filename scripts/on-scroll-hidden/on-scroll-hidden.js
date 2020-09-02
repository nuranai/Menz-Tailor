function isVisible(elem) {
    //* getting coords of the element
    let coords = elem.getBoundingClientRect();
    let windowHeight = window.innerHeight;
    //* is top of the element is visible?
    let topVisible = coords.top > 0 && coords.top < windowHeight;
    //* is bottom of the element is visible?
    let bottomVisible = coords.bottom > 0 && coords.bottom < windowHeight;
    return topVisible || bottomVisible;
}

function showVisible() {
    for (let elem of document.querySelectorAll("[data-on-scroll]")) {
        if (isVisible(elem)) {
            scrollDelete(elem);
            elem.dataset.onScroll = "";
        }
    }
}

function scrollDelete(elem) {
    for (let child of elem.children) {
        child.dataset.onScroll = "";
    }
}

showVisible();

window.addEventListener("scroll", showVisible);