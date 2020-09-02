function hamActive() {
    let nav = document.querySelector(".nav");
    if (nav.className === "nav") {
        nav.className += " ham_active";
    }
    else {
        nav.className = "nav";
    }
}

function dropMobile() {
    let span = event.target.closest('li').children[1];
    let drop = event.target.closest('li').lastElementChild;
    if (drop.className === "drop-btn__items") {
        drop.className += " drop_active";
        span.innerHTML = "-";
    } 
    else {
        drop.className = "drop-btn__items";
        span.innerHTML = "+";
    }
}
