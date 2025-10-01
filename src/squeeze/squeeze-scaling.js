import convertToPt from "../conversion";
import {getElementBoxWidth, getRenderedLineCountForNode, getScaleX} from "../measurement";

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

        const maxWidth = window.getComputedStyle(element).maxWidth;
        const maxFontSize = window.getComputedStyle(element).fontSize;
        const currentWidth = window.getComputedStyle(element).width;

        if (!maxWidth || !maxFontSize || maxWidth === "none" || maxFontSize === "none") {
            return;
        }

        // element.innerHTML = "";
        element.style.width = maxWidth;
        const maxWidthPt = getElementBoxWidth(element, false);
        element.style.width = currentWidth;

        const maxFontSizePt = convertToPt(maxFontSize);

        const classArray = Array.from(element.classList);
        const maxMatch = classArray.find(c => c.startsWith('max-scale-'))?.match(/^max-scale-\[([^\]]+)\]$/);
        const maxScale = maxMatch ? maxMatch[1] : null;
        const minMatch = classArray.find(c => c.startsWith('min-scale-'))?.match(/^min-scale-\[([^\]]+)\]$/);
        const minScale = minMatch ? minMatch[1] : null;

        const maxRowsMatch = classArray.find(c => c.startsWith('max-rows-'))?.match(/^max-rows-\[([^\]]+)\]$/);
        const maxRows = maxRowsMatch ? maxRowsMatch[1] : 1;


        elementsToSqueezeScaling[index] = {
            element: elements[index],
            maxWidthPt: maxWidthPt,
            maxFontSizePt: maxFontSizePt,
            maxScale: maxScale,
            minScale: minScale,
            maxRows: maxRows
        };

        element.style.transform = "scale(1, 1)";
        element.style.transformOrigin = "left center";
        element.style.display = "inline-block";
        element.style.flex = "0 0 auto";
        element.style.alignSelf = "flex-start";
        element.style.maxWidth = "";
        // element.style.whiteSpace = "nowrap";

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
        minScale = 0.8,
        maxScale = 1,
        epsilon = 0.05,
        maxIter = 0,
        setOrigin = true,
    } = {}
) {
    const toPt = (px) => px * pxToPt;
    const toPx = (pt) => pt / pxToPt;

    // 1) Cél szélesség px-ben
    const targetPt = maxWidthPt;
    // const targetPx = toPx(maxWidthPt);

    // 2) Eredeti transform elmentése, méréshez ideiglenesen kikapcsoljuk a skálát
    const prevTransform = element.style.transform || '';
    const prevOrigin = element.style.transformOrigin || '';

    // a legegyszerűbb és legstabilabb: ideiglenesen 'none', hogy a nyers szélességet mérjük
    element.style.transform = 'none';
    if (setOrigin) element.style.transformOrigin = 'left center';

    // 3) Nyers (skála nélküli) szélesség
    const baseWidthPt = getElementBoxWidth(element) || 0;
    // const baseWidthPx = element.getBoundingClientRect().width || 0;
    if (baseWidthPt <= 0) {
        // nincs értelmezhető szélesség – ne robbanjon
        element.style.transform = prevTransform;
        element.style.transformOrigin = prevOrigin;
        return 1;
    }

    // 4) Első becslés: arányos skála
    let sx = clamp(targetPt / baseWidthPt, minScale, maxScale);
    console.log(`sx1: ${sx}`);
    let sy = (axis === 'uniform') ? sx : 1;

    // alkalmazzuk: a scale-t előre tesszük, a meglévő transform megmarad
    element.style.transform = `scale(${sx}, ${sy})`.trim();
    // element.style.transform = `scale(${sx}, ${sy}) ${prevTransform}`.trim();

    // 5) Finomhangolás (iteratív, gyors konvergencia)
    for (let i = 0; i < maxIter; i++) {
        const w = getElementBoxWidth(element);
        // const w = element.getBoundingClientRect().width;
        const diffPt = targetPt - w;
        if (Math.abs(diffPt) <= epsilon) break;

        // multiplikatív korrekció: új sx = régi sx * (cél / mért)
        const factor = targetPt / (w || 1);
        sx = clamp(sx * factor, minScale, maxScale);
        console.log(`w: ${w} - sx2: ${sx}`);
        sy = (axis === 'uniform') ? sx : 1;
        element.style.transform = `scale(${sx}, ${sy})`.trim();
        // element.style.transform = `scale(${sx}, ${sy}) ${prevTransform}`.trim();
    }

    // (opcionális) ha nem akarsz origin-t hagyni:
    if (!setOrigin) element.style.transformOrigin = prevOrigin;

    console.log(`sx3: ${sx}`);
    return sx;

    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
}



function squeezeScale(s) {

    const rowCount = getRenderedLineCountForNode(s.element);
    if (rowCount <= s.maxRows && s.maxRows > 1) {
        // console.log(`rowCount: ${rowCount}`);
        return;
    }

    const newScale = calculateSqueezedScale(
        s.element,
        s.maxWidthPt,
        // getElementBoxWidth(s.element),
    );

    const maxScale = s.maxScale ?? newScale;
    const minScale = s.minScale ?? newScale;
    const finalScale = Math.max(Math.min(newScale, Number(maxScale)), Number(minScale));
    const finalScaleString = `scale(${finalScale}, 1)`;

    s.element.style.transform = finalScaleString;
    const scaleX = getScaleX(s.element);
    s.element.style.maxWidth = `${Math.ceil(100*100 / (scaleX))/100}%`;
    s.element.style.width = `${Math.ceil(100*100 / (scaleX))/100}%`;
    // s.element.style.maxWidth = `${s.maxWidthPt / finalScale}pt`;
    // s.element.style.width = `${s.maxWidthPt / finalScale}pt`;

    if (rowCount > s.maxRows && s.maxRows > 1) {
        console.log(`rowCount: ${rowCount}`);
    }

}


function squeezeAllScaling() {
    for (var i in elementsToSqueezeScaling) {
        squeezeScale(elementsToSqueezeScaling[i]);
    }
}

export { prepareElementsForScaling, squeezeAllScaling };
