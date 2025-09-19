import convertToPt from "./conversion";

function getElementBoxWidth (el) {

    const computedStyle = window.getComputedStyle(el);
    const computedMaxWidth = computedStyle.getPropertyValue("maxWidth");
    const computedWhiteSpace = computedStyle.getPropertyValue("whiteSpace");

    el.style.maxWidth = "";
    el.style.whiteSpace = "nowrap";

    const boxWidth = convertToPt(el.getBoundingClientRect().width + "px");

    el.style.maxWidth = computedMaxWidth;
    el.style.whiteSpace = computedWhiteSpace; //

    return boxWidth;
}

function getTextNodeLineCount(textNode) {
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return 0;

    const range = document.createRange();
    range.selectNodeContents(textNode);

    // Ez egy NodeList-szerű objektum, minden rect egy sor vagy fragment
    const rects = range.getClientRects();

    return rects.length;
}

export {getElementBoxWidth, getTextNodeLineCount};