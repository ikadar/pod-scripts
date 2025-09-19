import {getElementBoxWidth, getTextNodeLineCount} from "../measurement";
import convertToPt from "../conversion";

const elementsToSqueezeSpacing = [];

function calculateSqueezedLetterSpacing(element, maxWidthPt, {
    pxToPt = 0.74999943307122,          // 1px = 0.75pt (96dpi-n)
    epsilonPt = 0.05,       // pontosság (pt)
    maxIter = 20,           // bináris keresés lépések
    minLSpt = -5,           // korlátok pt-ben
    maxLSpt = 20
} = {}) {

    const toPt = (px) => px * pxToPt;
    const toPx = (pt) => pt / pxToPt;

    // 1) Cél szélesség pt-ben
    const targetPt = maxWidthPt * 1; // már pt-ben érkezik
    const text = element.textContent || "";
    const gaps = Math.max(0, text.length - 1);
    if (gaps === 0) {
        return parseFloat(getComputedStyle(element).letterSpacing) * pxToPt || 0;
    }

    // 2) Jelenlegi állapot (px-ben mérünk → pt-re váltunk)
    let currentLSpx = parseFloat(getComputedStyle(element).letterSpacing);
    if (Number.isNaN(currentLSpx)) currentLSpx = 0;
    let currentLSPt = toPt(currentLSpx);

    let currentWidthPt = getElementBoxWidth(element);

    // 3) Első becslés (lineáris modell)
    let guessPt = currentLSPt;
    if (gaps > 0) {
        const extraPerGapPt = (targetPt - currentWidthPt) / gaps;
        guessPt = currentLSPt + extraPerGapPt;
    }
    guessPt = Math.max(minLSpt, Math.min(maxLSpt, guessPt));

    // alkalmazzuk ideiglenesen (px-ben kell beírni a style-ba!)
    element.style.letterSpacing = toPx(guessPt) + "px";

    // mérés
    let wPt = getElementBoxWidth(element);
    if (Math.abs(wPt - targetPt) <= epsilonPt) {
        return guessPt;
    }

    // 4) Bináris keresés a pontos illesztéshez
    let loPt, hiPt;
    if (wPt < targetPt) { loPt = guessPt; hiPt = maxLSpt; }
    else { loPt = minLSpt; hiPt = guessPt; }

    for (let i = 0; i < maxIter; i++) {
        const midPt = (loPt + hiPt) / 2;
        element.style.letterSpacing = toPx(midPt) + "px";

        wPt = getElementBoxWidth(element);
        const diff = wPt - targetPt;
        if (Math.abs(diff) <= epsilonPt) {
            guessPt = midPt;
            break;
        }
        if (diff < 0) loPt = midPt; else hiPt = midPt;
        guessPt = midPt;
    }

    return guessPt; // PT-ben ad vissza, a te konvencióddal egyezően
}

function squeezeLetterSpacing(s) {

    const rowCount = getTextNodeLineCount(s.element.childNodes[0]);
    if (rowCount <= s.maxRows && s.maxRows > 1) {
        return;
    }

    if (s.maxRows > 1) {
        fitLetterSpacingToMaxRows(s.element.childNodes[0], s.maxRows, {
            minFontSize: s.minLetterSpacingPt
        });
        return;
    }


    const newLetterSpacingPt = calculateSqueezedLetterSpacing(
        s.element,
        s.maxWidthPt,
        // getElementBoxWidth(s.element),
        // originalLetterSpacing
    );

    const finalLetterSpacingPt = Math.max(Math.min(newLetterSpacingPt, s.maxLetterSpacingPt), s.minLetterSpacingPt);

    s.element.style.letterSpacing = finalLetterSpacingPt.toString() + "pt";
    s.element.style.maxWidth = s.maxWidth + "pt";
}

// Adjust letter-spacing for all elements
function squeezeAllLetterSpacing() {
    for (var i in elementsToSqueezeSpacing) {
        squeezeLetterSpacing(elementsToSqueezeSpacing[i]);
    }
}

function getElementsToSqueezeLetterSpacing () {
    const squeezeElements = document.querySelectorAll('.squeeze-spacing');
    const squeezeElementsWithParams = [];

    // convert nodeList to array
    for (var i=0; i<squeezeElements.length; i++) {
        squeezeElementsWithParams.push(squeezeElements[i]);
    }

    return squeezeElementsWithParams;
}

// Preparation logic remains mostly the same
function prepareElementsForLetterSpacing() {
    const elements = getElementsToSqueezeLetterSpacing();
    elements.map(function (element, index) {

        const maxWidth = window.getComputedStyle(element).maxWidth;

        if (!maxWidth || maxWidth === "none") {
            return;
        }

        const maxWidthPt = convertToPt(maxWidth);

        const classArray = Array.from(element.classList);
        const maxMatch = classArray.find(c => c.startsWith('max-letter-spacing-'))?.match(/^max-letter-spacing-\[([^\]]+)\]$/);
        const maxLetterSpacingPt = maxMatch ? convertToPt(maxMatch[1]) : null;
        const minMatch = classArray.find(c => c.startsWith('min-letter-spacing-'))?.match(/^min-letter-spacing-\[([^\]]+)\]$/);
        const minLetterSpacingPt = minMatch ? convertToPt(minMatch[1]) : null;

        const maxRowsMatch = classArray.find(c => c.startsWith('max-rows-'))?.match(/^max-rows-\[([^\]]+)\]$/);
        const maxRows = maxRowsMatch ? maxRowsMatch[1] : 1;

        elementsToSqueezeSpacing[index] = {
            element: elements[index],
            maxWidthPt: maxWidthPt,
            maxLetterSpacingPt: maxLetterSpacingPt,
            minLetterSpacingPt: minLetterSpacingPt,
            maxRows: maxRows,
        };

        // element.style.letterSpacing = "0.1px";
        // element.style.maxWidth = "";
        // element.style.width = "fit-content";
        element.style.display = "inline-block";
        element.style.flex = "0 0 auto";
        element.style.alignSelf = "flex-start";
        // element.style.whiteSpace = "nowrap"; // Prevent wrapping
    });
}

function fitLetterSpacingToMaxRows(textNode, maxRows, {
    minSpacing = -5,   // px – alsó korlát
    step = 0.2,        // px – ennyivel csökkentünk iterációnként
    maxIter = 50,      // véd a végtelen ciklus ellen
} = {}) {
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;

    const parent = textNode.parentElement;
    if (!parent) return;

    const style = window.getComputedStyle(parent);
    let currentSpacing = parseFloat(style.letterSpacing) || 0;
    let iter = 0;

    while (iter < maxIter) {
        const rowCount = getTextNodeLineCount(textNode);
        if (rowCount <= maxRows) break; // elértük vagy alatta vagyunk → kész

        currentSpacing = Math.max(currentSpacing - step, minSpacing);
        parent.style.letterSpacing = `${currentSpacing}px`;

        iter++;
    }

    return currentSpacing; // visszaadja a végső értéket
}

export { prepareElementsForLetterSpacing, squeezeAllLetterSpacing };


