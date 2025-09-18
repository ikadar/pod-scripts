import convertToPt from "./conversion";

function getElementBoxWidth (el) {

    const computedStyle = window.getComputedStyle(el);
    el.style.maxWidth = "";
    el.style.whiteSpace = "nowrap";

    const boxWidth = convertToPt(el.getBoundingClientRect().width + "px");

    el.style.maxWidth = computedStyle.maxWidth;
    el.style.whiteSpace = computedStyle.whiteSpace; //

    return boxWidth;
}

export {getElementBoxWidth};