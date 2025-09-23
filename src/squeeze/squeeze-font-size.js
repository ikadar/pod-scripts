import convertToPt from "../conversion";
import {getElementBoxWidth, getTextNodeLineCount} from "../measurement";

const elementsToSqueeze = [];

function calculateSqueezedFontSize (maxFontSizePt, maxWidthPt, actualWidthPt, actualFontSizePt) {

    const scale = maxWidthPt / actualWidthPt;
    const newFontSizePt = parseFloat(actualFontSizePt) * scale;
    // return newFontSizePt;
    return Math.min(newFontSizePt, maxFontSizePt);
}

function squeeze (s) {
    // console.log(s);

    const rowCount = getTextNodeLineCount(s.element.childNodes[0]);
    if (rowCount <= s.maxRows && s.maxRows > 1) {
        return;
    }

    if (s.maxRows > 1) {
        fitTextToMaxRows(s.element.childNodes[0], s.maxRows, {
            minFontSize: s.minFontSizePt
        });
        return;
    }

    const actualFontSize = convertToPt(window.getComputedStyle(s.element).fontSize);
    const actualWidthPt = getElementBoxWidth(s.element);

    var newFontSizePt = calculateSqueezedFontSize(s.maxFontSizePt, s.maxWidthPt, actualWidthPt, actualFontSize);
    // var newFontSizePt = calculateSqueezedFontSize(s.maxFontSizePt, s.maxWidthPt, getElementBoxWidth(s.element), s.element.style.fontSize);
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

        const maxRowsMatch = classArray.find(c => c.startsWith('max-rows-'))?.match(/^max-rows-\[([^\]]+)\]$/);
        const maxRows = maxRowsMatch ? maxRowsMatch[1] : 1;

        const maxWidthPt = convertToPt(maxWidth);
        // const maxFontSizePt = convertToPt(maxFontSize);

        elementsToSqueeze[index] = {
            element: elements[index],
            maxWidthPt: maxWidthPt,
            maxFontSizePt: maxFontSizePt,
            minFontSizePt: minFontSizePt,
            maxRows: maxRows,
        };

        // element.style.fontSize = "1pt";
        element.style.display = "inline-block";
        element.style.flex = "0 0 auto";
        element.style.alignSelf = "flex-start";
        // element.style.maxWidth = "";
        // element.style.whiteSpace = "nowrap";

    });
}

// ---------

function fitTextToMaxRows(textNode, maxRowCount, {
    minFontSize = 6,         // px
    step = 0.5,              // mennyivel csökkentsen egy lépésben
    maxIter = 50,            // végtelen ciklus elkerülésére
} = {}) {
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;

    const parent = textNode.parentElement;
    if (!parent) return;

    let style = window.getComputedStyle(parent);
    let currentFontSizePt = convertToPt(`${parseFloat(style.fontSize)}px`); // px-ben
    let iter = 0;

    while (iter < maxIter) {
        const rowCount = getTextNodeLineCount(textNode);
        if (rowCount <= maxRowCount) break;

        currentFontSizePt = Math.max(currentFontSizePt - step, minFontSize);
        parent.style.fontSize = `${currentFontSizePt}pt`;

        iter++;
    }

    console.log(iter);

}

export { prepareElements, squeezeAll };