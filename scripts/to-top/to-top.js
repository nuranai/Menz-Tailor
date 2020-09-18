myBtn = document.querySelector(".scroll__up");

function toTop() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        myBtn.style.display = "block";
    }
    else {
        myBtn.style.display = "none";
    }
}

window.addEventListener("scroll", toTop);