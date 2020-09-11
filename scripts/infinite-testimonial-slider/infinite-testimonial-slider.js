let sliderItem = document.querySelector('.testimonial__slider');
let next_but = document.querySelector('.testimonial__next');
let numberDOM = document.querySelectorAll(".testimonial__number");

function sliderMove(items, next_but) {
    let posX1 = 0;
    let posX2 = 0;
    let posInitial;
    let posFinal;
    let threshold = 100;
    let slides = document.querySelectorAll(".testimonial__slide");
    let slideSize = slides[0].offsetWidth;
    let index = 0;
    let allowShift = true;
    let cloneFirst = slides[0].cloneNode(true);
    let cloneLast = slides[slides.length - 1].cloneNode(true);
    //*copy elemnts

    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, slides[0]);

    
    //*mouse event
    
    items.addEventListener("mousedown", dragStart);
    
    //*touch events
    
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);
    
    //*click events

    next_but.addEventListener('click', function () { shiftSlide(1) });

    for (let item of numberDOM) {
        item.addEventListener('click', numberSlide);
    }

    //*transition event

    items.addEventListener("transitionend", checkIndex);
    
    function dragStart(e) {
        e = e || window.event;
        e.preventDefault();
        posInitial = items.offsetLeft;
        if (e.type === "touchstart") {
            posX1 = e.touches[0].clientX;
        }
        else {
            posX1 = e.clientX;
            document.addEventListener("mouseup", dragEnd);
            document.addEventListener("mousemove", dragAction);
        }
    } 
    
    function dragAction(e) {
        e = e || window.event;
        if (e.type === "touchmove") {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        }
        else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        items.style.left = (items.offsetLeft - posX2) + "px";
    }

    function dragEnd(e) {
        posFinal = items.offsetLeft;

        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, "drag");
        }
        else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, "drag");
        }
        else {
            items.style.left = (posInitial) + "px";
        }

        document.removeEventListener("mouseup", dragEnd);
        document.removeEventListener("mousemove", dragAction)
    }

    function shiftSlide(dir, action) {
        items.classList.add("shifting");
        if (allowShift) {
            if (!action) {
                posInitial = items.offsetLeft;
            }
            if (dir === 1) {
                items.style.left = (posInitial - slideSize) + "px";
                numberChange(1);
                index++;
            }
            else if (dir === -1) {
                items.style.left = (posInitial + slideSize) + "px";
                numberChange(-1);
                index--;
            }
        };
        allowShift = false;
    }

    function numberSlide(e) {
        e.preventDefault();
        if  (e.target === document.querySelector(".testimonial__number__active")) {
            return;
        }
        let newNumber = Number(e.target.innerHTML);
        let oldNumber = Number(document.querySelector(".testimonial__number__active").innerHTML);
        let change = newNumber - oldNumber;
        items.classList.add("shifting");
        if (allowShift) {
            items.style.left = (items.offsetLeft - (change * slideSize)) + "px";
            numberChange(change);
            index += change;
        }
        allowShift = false;
    }

    function numberChange(plus) {
        document.querySelector(".testimonial__number__active").className = document.querySelector(".testimonial__number__active").className.replace(" testimonial__number__active", "");
        if ((index + plus) % slides.length < 0) {
            numberDOM[slides.length - 1].classList.add("testimonial__number__active");
        }
        else {
            numberDOM[(index + plus) % slides.length].classList.add("testimonial__number__active");
        }
    }

    function checkIndex() {
        items.className = items.className.replace(" shifting", "");
        if (index === -1) {
            items.style.left = -(slides.length * slideSize) + "px";
            index = slides.length - 1;
        }
        if (index === slides.length) {
            items.style.left =  -(1 * slideSize) + "px";
            index = 0;
        }
        allowShift = true;
    }
}

sliderMove(sliderItem, next_but);