import convertToPt from "../conversion";
import {getElementBoxWidth} from "../measurement";

const elementsToSqueeze = [];

function calculateSqueezedFontSize (maxFontSizePt, maxWidthPt, actualWidthPt, actualFontSizePt) {

    const scale = maxWidthPt / actualWidthPt;
    const newFontSizePt = scale;
    // return newFontSizePt;
    return Math.min(newFontSizePt, maxFontSizePt);
}

function squeeze (s) {
    // console.log(s);

    console.log(getTextNodeLineCount(s.element.childNodes[0]));
    // return;

    var newFontSizePt = calculateSqueezedFontSize(s.maxFontSizePt, s.maxWidthPt, getElementBoxWidth(s.element), s.element.style.fontSize);
    newFontSizePt = Math.max(newFontSizePt, s.minFontSizePt);
    s.element.style.fontSize = newFontSizePt.toString() + "pt";
    s.element.style.maxWidth = s.maxWidth + "pt";
}

// get elements with squeeze and squeeze-[*] classes
function getElementsToSqueeze () {
    const squeezeElements = document.querySelectorAll('.squeeze');
    const squeezeElementsWithParams = [];

    // convert nodeList to array
    for (var i=0; i<squeezeElements.length; i++) {
        squeezeElementsWithParams.push(squeezeElements[i]);
    }

    return squeezeElementsWithParams;
}

function squeezeAll () {
    // prepareElements();
    for (var i in elementsToSqueeze) {
        squeeze(elementsToSqueeze[i]);
    }
}

function prepareElements () {
    const elements = getElementsToSqueeze();
    elements.map(function (element, index) {

        const maxWidth = window.getComputedStyle(element).maxWidth;
        let maxFontSize = window.getComputedStyle(element).fontSize;

        if (!maxWidth || !maxFontSize || maxWidth === "none" || maxFontSize === "none") {
            return;
        }

        const classArray = Array.from(element.classList);
        const maxMatch = classArray.find(c => c.startsWith('max-font-size-'))?.match(/^max-font-size-\[([^\]]+)\]$/);
        const maxFontSizePt = maxMatch ? convertToPt(maxMatch[1]) : convertToPt(maxFontSize);
        const minMatch = classArray.find(c => c.startsWith('min-font-size-'))?.match(/^min-font-size-\[([^\]]+)\]$/);
        const minFontSizePt = minMatch ? convertToPt(minMatch[1]) : null;


        const maxWidthPt = convertToPt(maxWidth);
        // const maxFontSizePt = convertToPt(maxFontSize);

        elementsToSqueeze[index] = {
            element: elements[index],
            maxWidthPt: maxWidthPt,
            maxFontSizePt: maxFontSizePt,
            minFontSizePt: minFontSizePt,
        };

        element.style.fontSize = "10pt";
        element.style.display = "inline-block";
        element.style.flex = "0 0 auto";
        element.style.alignSelf = "flex-start";
        element.style.maxWidth = "";
        element.style.whiteSpace = "nowrap";

    });
}

// ---------

function getTextNodeLineCount(textNode) {
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return 0;

    const range = document.createRange();
    range.selectNodeContents(textNode);

    // Ez egy NodeList-szerű objektum, minden rect egy sor vagy fragment
    const rects = range.getClientRects();

    return rects.length;
}

export { prepareElements, squeezeAll };