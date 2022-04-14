const slider = document.getElementById(`categoriesList`);
let isDragging = 0,
    prevTranslate = 0,
    startPos = 0;
//Mobile Events
slider.addEventListener(`touchstart`, touchStart);
slider.addEventListener(`touchmove`, touchMove);
slider.addEventListener(`touchend`, touchEnd);
//Browser Events
slider.addEventListener(`mousedown`, touchStart);
slider.addEventListener(`mousemove`, touchMove);
slider.addEventListener(`mouseleave`, touchEnd);
slider.addEventListener(`mouseup`, touchEnd);

function touchStart(event) {
    isDragging = true;
    startPos = getPositionX(event)
}

function touchMove(event) {
    if(isDragging) {
        const moveX = getPositionX(event);
        const currentTranslate = prevTranslate + moveX - startPos;
    if(currentTranslate > -4500 && currentTranslate < 0) {
        slider.style.transform = `translateX(${ currentTranslate}px)`;
        prevTranslate = prevTranslate + moveX - startPos;
    }
    }
}

function getPositionX (event) {
    return event.type.includes(`mouse`) ? event.pageX : event.touches[0].clientX;
}

function touchEnd() {
    isDragging = false;
}