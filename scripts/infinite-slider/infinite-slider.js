let infiniteSliders = document.querySelectorAll(".infinite__slider");

function infWrap(infiniteSlider) {

let sliderWrapper = infiniteSlider.querySelector('.infinite__wrapper');
let wrapperWidth = sliderWrapper.clientWidth;
let sliderItems = infiniteSlider.querySelector('.infinite__slides');
sliderItems.style.left = -wrapperWidth + 'px';
let prev = infiniteSlider.querySelector('.infinite__prev');
let next = infiniteSlider.querySelector('.infinite__next');
let numberList = infiniteSlider.querySelectorAll(".infinite__number");

function sliderMove(items, prev, next) {
    let posX1 = 0;
    let posX2 = 0;
    let posInitial;
    let posFinal;
    let threshold = 100;
    let slides = infiniteSlider.querySelectorAll(".infinite__slide");
    slides.forEach(function (elem) {
        elem.style.width = wrapperWidth + 'px';
    });
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

    prev.addEventListener('click', function () { shiftSlide(-1) });
    next.addEventListener('click', function () { shiftSlide(1) });

    for (let item of numberList) {
        item.addEventListener('click', numberSlide);
    }

    //*transition event

    items.addEventListener("transitionend", checkIndex);
    
    window.addEventListener("resize", resizing);

    function resizing() {
        infiniteSlider.querySelectorAll(".infinite__slide").forEach(function (elem) {
            elem.style.width = sliderWrapper.clientWidth + 'px';
        });
        slideSize = slides[0].offsetWidth;
        resizeLeftChange();
    }

    function resizeLeftChange() {
        let currentSlide = Number(infiniteSlider.querySelector(".infinite__number__active").innerHTML);
        items.style.left = (-currentSlide * slideSize) + 'px';
    }

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
        if  (e.target === infiniteSlider.querySelector(".infinite__number__active")) {
            return;
        }
        let newNumber = Number(e.target.innerHTML);
        let oldNumber = Number(infiniteSlider.querySelector(".infinite__number__active").innerHTML);
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
        infiniteSlider.querySelector(".infinite__number__active").className = infiniteSlider.querySelector(".infinite__number__active").className.replace(" infinite__number__active", "");
        if ((index + plus) % slides.length < 0) {
            numberList[slides.length - 1].classList.add("infinite__number__active");
        }
        else {
            numberList[(index + plus) % slides.length].classList.add("infinite__number__active");
        }
    }

    function checkIndex() {
        // console.log(item.className);
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

sliderMove(sliderItems, prev, next);
};

for (let div of infiniteSliders) {
    infWrap(div);
}