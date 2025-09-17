import logInfo from "../log-info";
import convertToPt from "../conversion";

const elementsToSqueezeScaling = [];

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
        pxToPt = 0.74999943307122,
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


function squeezeAllScaling() {
    for (var i in elementsToSqueezeScaling) {
        squeezeScale(elementsToSqueezeScaling[i]);
    }
}

export { prepareElementsForScaling, squeezeAllScaling };
