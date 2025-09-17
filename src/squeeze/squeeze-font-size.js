import logInfo, {increaseIndentation, decreaseIndentation} from "../log-info";
import convertToPt from "../conversion";
import {getElementBoxWidth} from "../measurement";

const elementsToSqueeze = [];

function calculateSqueezedFontSize (maxFontSizePt, maxWidthPt, actualWidthPt, actualFontSizePt) {

    logInfo("--- FONT SIZE CALCULATION STARTED");
    logInfo("");
    increaseIndentation();

    const scale = maxWidthPt / actualWidthPt;
    const newFontSizePt = scale;

    logInfo("maxFontSizePt: " + maxFontSizePt);
    logInfo("actualFontSizePt: " + actualFontSizePt);
    logInfo("maxWidthPt: " + maxWidthPt);
    logInfo("actualWidthPt: " + actualWidthPt);
    logInfo("scale: " + scale);
    logInfo("NEW fontSize: " + newFontSizePt);
    logInfo("NEW fontSize: " + Math.min(newFontSizePt, maxFontSizePt));

    decreaseIndentation();

    logInfo("");
    logInfo("--- FONT SIZE CALCULATION ENDED");

    // return newFontSizePt;
    return Math.min(newFontSizePt, maxFontSizePt);
}

function squeeze (s) {
    // console.log(s);
    logInfo("=== " + s.element.id + " ===");
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

        logInfo(element.id);

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

        element.style.fontSize = "1pt";
        // element.style.width = "fit-content";
        element.style.display = "inline-block";
        element.style.flex = "0 0 auto";
        element.style.alignSelf = "flex-start";
        element.style.maxWidth = "";
        element.style.whiteSpace = "nowrap";

    });
}

export { prepareElements, squeezeAll };