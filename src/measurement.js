import convertToPt from "./conversion";

function getElementBoxWidth (el) {
    return convertToPt(el.getBoundingClientRect().width + "px");
}

export {getElementBoxWidth};