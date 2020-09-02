const slides = document.querySelectorAll(".slider__slide");
const slider = document.querySelector(".slider");
let  slideIndex = 0;
window.onload = function() {
    sliderChange(slideIndex)
    slides[slideIndex].className += " slider__active";
    let text = slides[slideIndex].firstElementChild.firstElementChild;
    text.className += " slider__text__active";
    let subText = slides[slideIndex].firstElementChild.lastElementChild;
    subText.className += " slider__sub-text__active";
};

function slidePlus(n) {
    sliderChange(slideIndex+=n);
    sliderActive();
}

function sliderChange(n) {
    if (n >= slides.length) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = slides.length - 1;
    }
}

function sliderActive() {
    let activeSlide = document.querySelector(".slider__active");
    activeSlide.className = "slider__slide";
    slides[slideIndex].className += " slider__active";
    let activeText = document.querySelector(".slider__text__active");
    activeText.className = "slider__text";
    let text = slides[slideIndex].firstElementChild.firstElementChild;
    text.className += " slider__text__active";
    let activeSubText = document.querySelector(".slider__sub-text__active");
    activeSubText.className = "slider__sub-text";
    let subText = slides[slideIndex].firstElementChild.lastElementChild;
    subText.className += " slider__sub-text__active";
}

let isDown = false;
let startX;
let scrollLeft;
let walk;

slider.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.changedTouches[0].clientX;
    console.log(e.changedTouches[0].clientX);
    scrollLeft = slider.scrollLeft;
    console.log(scrollLeft);
})

slider.addEventListener('touchend', () => {
    dragEnd();
})

slider.addEventListener('touchcansel', () => {
    dragEnd();
})

slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.changedTouches[0].clientX - slider.offsetLeft;
    walk = x - startX;
})

function dragEnd() {
    isDown = false;
    if (walk >= 100) slidePlus(1);
    if (walk <= -100) slidePlus(-1);
}
