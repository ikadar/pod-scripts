import handleSeparators from "./separator";
import {prepareElements, squeezeAll} from "./squeeze/squeeze-font-size";

function getElementBoxWidth (el) {
    return convertToPt(el.getBoundingClientRect().width + "px");
}


function getElementsToScaling () {
    const squeezeElements = document.querySelectorAll('.squeeze-scaling');
    const squeezeElementsWithParams = [];

    // convert nodeList to array
    for (var i=0; i<squeezeElements.length; i++) {
        squeezeElementsWithParams.push(squeezeElements[i]);
    }

    return squeezeElementsWithParams;
}



function prepareElementsForScaling() {
    const elements = getElementsToScaling();
    elements.map(function (element, index) {

        logInfo(element.id);

        const maxWidth = window.getComputedStyle(element).maxWidth;
        const maxFontSize = window.getComputedStyle(element).fontSize;

        if (!maxWidth || !maxFontSize || maxWidth === "none" || maxFontSize === "none") {
            return;
        }

        const maxWidthPt = convertToPt(maxWidth);
        const maxFontSizePt = convertToPt(maxFontSize);

        elementsToSqueezeScaling[index] = {
            element: elements[index],
            maxWidthPt: maxWidthPt,
            maxFontSizePt: maxFontSizePt,
        };

        element.style.transform = "scale(1, 1)";
        element.style.transformOrigin = "left center";
        element.style.display = "inline-block";
        element.style.flex = "0 0 auto";
        element.style.alignSelf = "flex-start";
        element.style.maxWidth = "";
        element.style.whiteSpace = "nowrap";

    });
}

/**
 * A szöveg szélességét scale-lel illeszti a kívánt maxWidthPt-re.
 * - csak X irányban skáláz (alapértelmezés), Y-t 1-en hagyja
 * - pt-ben (printer world) számol, a style-ba px alapú scale kerül
 * - megtartja az eredeti transformot (előre teszi a scale-t)
 *
 * @param {HTMLElement} element   - a skálázandó elem
 * @param {number}      maxWidthPt- cél szélesség pt-ben
 * @param {object}      opts
 *    pxToPt=0.75       - 1px = 0.75pt (96 dpi)
 *    axis='x'          - 'x' | 'uniform'  ('uniform' esetén X=Y skála)
 *    minScale=0.2      - skála alsó korlát
 *    maxScale=5        - skála felső korlát
 *    epsilon=0.05      - engedett hiba (pt)
 *    maxIter=5         - legfeljebb ennyiszer finomít
 *    setOrigin=true    - bal szélre állítja a transform-origin-t
 *
 * @returns {number}    - a végső X scale érték
 */
function calculateSqueezedScale(
    element,
    maxWidthPt,
    {
        pxToPt = 0.75,
        axis = 'x',         // 'x' vagy 'uniform'
        minScale = 0.2,
        maxScale = 5,
        epsilon = 0.05,
        maxIter = 5,
        setOrigin = true,
    } = {}
) {
    const toPt = (px) => px * pxToPt;
    const toPx = (pt) => pt / pxToPt;

    // 1) Cél szélesség px-ben
    const targetPx = toPx(maxWidthPt);

    // 2) Eredeti transform elmentése, méréshez ideiglenesen kikapcsoljuk a skálát
    const prevTransform = element.style.transform || '';
    const prevOrigin = element.style.transformOrigin || '';

    // a legegyszerűbb és legstabilabb: ideiglenesen 'none', hogy a nyers szélességet mérjük
    element.style.transform = 'none';
    if (setOrigin) element.style.transformOrigin = 'left center';

    // 3) Nyers (skála nélküli) szélesség
    const baseWidthPx = element.getBoundingClientRect().width || 0;
    if (baseWidthPx <= 0) {
        // nincs értelmezhető szélesség – ne robbanjon
        element.style.transform = prevTransform;
        element.style.transformOrigin = prevOrigin;
        return 1;
    }

    // 4) Első becslés: arányos skála
    let sx = clamp(targetPx / baseWidthPx, minScale, maxScale);
    let sy = (axis === 'uniform') ? sx : 1;

    // alkalmazzuk: a scale-t előre tesszük, a meglévő transform megmarad
    element.style.transform = `scale(${sx}, ${sy}) ${prevTransform}`.trim();

    // 5) Finomhangolás (iteratív, gyors konvergencia)
    for (let i = 0; i < maxIter; i++) {
        const w = element.getBoundingClientRect().width;
        const diffPx = targetPx - w;
        if (Math.abs(toPt(diffPx)) <= epsilon) break;

        // multiplikatív korrekció: új sx = régi sx * (cél / mért)
        const factor = targetPx / (w || 1);
        sx = clamp(sx * factor, minScale, maxScale);
        sy = (axis === 'uniform') ? sx : 1;
        element.style.transform = `scale(${sx}, ${sy}) ${prevTransform}`.trim();
    }

    // (opcionális) ha nem akarsz origin-t hagyni:
    if (!setOrigin) element.style.transformOrigin = prevOrigin;

    return sx;

    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
}

function calculateSqueezedLetterSpacing(element, maxWidthPt, {
    pxToPt = 0.75,          // 1px = 0.75pt (96dpi-n)
    epsilonPt = 0.05,       // pontosság (pt)
    maxIter = 20,           // bináris keresés lépések
    minLSpt = -5,           // korlátok pt-ben
    maxLSpt = 20
} = {}) {

    const toPt = (px) => px * pxToPt;
    const toPx = (pt) => pt / pxToPt;

    logInfo("--- CALCULATION STARTED"); logInfo(""); increaseIndentation();

    // 1) Cél szélesség pt-ben
    const targetPt = maxWidthPt * 1; // már pt-ben érkezik
    const text = element.textContent || "";
    const gaps = Math.max(0, text.length - 1);
    if (gaps === 0) {
        decreaseIndentation(); logInfo(""); logInfo("--- CALCULATION ENDED");
        return parseFloat(getComputedStyle(element).letterSpacing) * pxToPt || 0;
    }

    // 2) Jelenlegi állapot (px-ben mérünk → pt-re váltunk)
    let currentLSpx = parseFloat(getComputedStyle(element).letterSpacing);
    if (Number.isNaN(currentLSpx)) currentLSpx = 0;
    let currentLSPt = toPt(currentLSpx);

    let currentWidthPt = getElementBoxWidth(element);
    // let currentWidthPx = getElementBoxWidth(element);
    // let currentWidthPt = toPt(currentWidthPx);

    logInfo("targetPt: " + targetPt);
    logInfo("currentWidthPt: " + currentWidthPt);
    logInfo("text length: " + text.length);
    logInfo("currentLSPt: " + currentLSPt + "pt");
    logInfo("deltaPt: " + (targetPt - currentWidthPt));

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
        logInfo("newLetterSpacing (pt): " + guessPt);
        decreaseIndentation(); logInfo(""); logInfo("--- CALCULATION ENDED");
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

    logInfo("newLetterSpacing (pt): " + guessPt);
    decreaseIndentation(); logInfo(""); logInfo("--- CALCULATION ENDED");
    return guessPt; // PT-ben ad vissza, a te konvencióddal egyezően
}

function calculateSqueezedLetterSpacing_ (element, maxWidthPt) {

    const dpi = 0.74999943307122;
    // const dpi = (runsInPrince ? 1 : 0.74999943307122);

    logInfo("--- CALCULATION STARTED");
    logInfo("");
    increaseIndentation();

    maxWidthPt = maxWidthPt * dpi;

    // Gather current info
    const text = element.textContent || "";

    let currentLetterSpacing = parseFloat(window.getComputedStyle(element).letterSpacing) || 0;
    currentLetterSpacing = currentLetterSpacing * dpi;

    let currentWidth = getElementBoxWidth(element); // width in points or px, depending on environment
    currentWidth = currentWidth * dpi;

    logInfo("maxWidthPt: " + maxWidthPt);
    logInfo("currentWidth: " + currentWidth);
    logInfo("text: " + (typeof text == "undefined"));
    logInfo("text: " + (typeof text == "string"));
    logInfo("text: " + (!!text));
    logInfo("text: " + ((!!text) ? "AAA" : "BBB"));
    logInfo("text length: " + ((!!text) ? text.length : 0));
    logInfo("currentLetterSpacing: " + currentLetterSpacing + "pt (assuming)");
    logInfo("scale: " + (maxWidthPt - currentWidth));

    // If there is at least 2 characters, we have (text.length - 1) gaps
    let newLetterSpacing = currentLetterSpacing;
    if (text.length > 1) {
        const extraSpacing = (maxWidthPt - currentWidth) / (text.length - 1);
        newLetterSpacing = currentLetterSpacing + extraSpacing;
    }

    logInfo("newLetterSpacing: " + newLetterSpacing);
    decreaseIndentation();
    logInfo("");
    logInfo("--- CALCULATION ENDED");


    return newLetterSpacing;
}

function squeezeScale(s) {
    logInfo("=== " + s.element.id + " ===");

    const originalLetterSpacing = parseFloat(window.getComputedStyle(s.element).letterSpacing) || 0;

    console.log("originalLetterSpacing: " + originalLetterSpacing);

    const newScalePt = calculateSqueezedScale(
        s.element,
        s.maxWidthPt,
        // getElementBoxWidth(s.element),
        // originalLetterSpacing
    );

    s.element.style.scale = newScalePt.toString() + "pt" + " 0";
    s.element.style.maxWidth = s.maxWidth + "pt";
}

function squeezeLetterSpacing(s) {
    logInfo("=== " + s.element.id + " ===");

    const newLetterSpacingPt = calculateSqueezedLetterSpacing(
        s.element,
        s.maxWidthPt,
        // getElementBoxWidth(s.element),
        // originalLetterSpacing
    );

    s.element.style.letterSpacing = newLetterSpacingPt.toString() + "pt";
    s.element.style.maxWidth = s.maxWidth + "pt";
}

// Adjust letter-spacing for all elements
function squeezeAllLetterSpacing() {
    for (var i in elementsToSqueezeSpacing) {
        squeezeLetterSpacing(elementsToSqueezeSpacing[i]);
    }
}

function squeezeAllScaling() {
    for (var i in elementsToSqueezeScaling) {
        squeezeScale(elementsToSqueezeScaling[i]);
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


const elementsToSqueezeSpacing = [];
const elementsToSqueezeScaling = [];

// Preparation logic remains mostly the same
function prepareElementsForLetterSpacing() {
    console.log("----------------------- prepareElementsForLetterSpacing");
    const elements = getElementsToSqueezeLetterSpacing();
    elements.map(function (element, index) {
        logInfo(element.id);

        const maxWidth = window.getComputedStyle(element).maxWidth;

        if (!maxWidth || maxWidth === "none") {
            return;
        }

        const maxWidthPt = convertToPt(maxWidth);

        elementsToSqueezeSpacing[index] = {
            element: elements[index],
            maxWidthPt: maxWidthPt,
        };

        element.style.letterSpacing = "0.1px";
        element.style.maxWidth = "";
        // element.style.width = "fit-content";
        element.style.display = "inline-block";
        element.style.flex = "0 0 auto";
        element.style.alignSelf = "flex-start";
        element.style.whiteSpace = "nowrap"; // Prevent wrapping
    });
}

function convertToPt(size) {

    var dpi = 74.999943307122;

    const pointsPerInch = 72; // 1 inch = 72 points
    // const pointsPerInch = dpi; // 1 inch = 72 points
    const conversionFactors = {
        pt: 1,                         // 1 pt = 1 pt
//        px: pointsPerInch / dpi,       // px to pt depends on DPI
        px: dpi / 100,       // px to pt depends on DPI
        mm: 3.7795275591 * dpi / 100,  // 1 mm = 1 inch / 25.4
        // mm: pointsPerInch / 25.4,   // 1 mm = 1 inch / 25.4
        cm: pointsPerInch / 2.54,      // 1 cm = 1 inch / 2.54
        in: 96 * dpi / 100,            // 1 inch = 72 pt
        // in: pointsPerInch,          // 1 inch = 72 pt
        pc: 16 * dpi,                  // 1 pica (pc) = 12 pt
        em: 16 * dpi,                  // Assuming 1 em ≈ 12 pt (adjust if needed)
        rem: 16 * dpi                  // Assuming 1 rem ≈ 12 pt (adjust if needed)
    };

    // Extract the numeric value and the unit from the size string
    const match = size.match(/^([\d.]+)([a-z%]*)$/i);

    if (!match) {
        throw new Error("Invalid size format: " + size);
    }

    const value = parseFloat(match[1]);
    let unit = match[2].toLowerCase();

    // If no unit is provided, assume 'px' by default
    if (!unit) {
        unit = "px";
    }

    if (!conversionFactors[unit]) {
        throw new Error("Unsupported unit: " + unit);
    }

    // logInfo("IN: " + size);
    // logInfo("OUT: " + value * conversionFactors[unit]);

    return value * conversionFactors[unit];

}

function runSqueeze() {
    prepareElements();
    prepareElementsForLetterSpacing();
    prepareElementsForScaling();

    squeezeAll();
    squeezeAllLetterSpacing();
    squeezeAllScaling();

    handleSeparators();
}

export default runSqueeze;