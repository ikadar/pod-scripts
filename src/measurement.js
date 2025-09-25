import convertToPt from "./conversion";

function getElementBoxWidth (el) {

    const computedStyle = window.getComputedStyle(el);
    const computedMaxWidth = computedStyle.getPropertyValue("maxWidth");
    const computedWhiteSpace = computedStyle.getPropertyValue("whiteSpace");

    el.style.maxWidth = "";
    el.style.whiteSpace = "nowrap";

    const boxWidth = convertToPt(el.getBoundingClientRect().width + "px");
    console.log(`${el.id}: ${boxWidth}`);

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

function getAllTextNodes(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    const out = [];
    let n;
    while ((n = walker.nextNode())) {
        // üres/whitespace-only node-ok nem érdekelnek
        if (n.nodeValue && n.nodeValue.trim().length) out.push(n);
    }
    return out;
}

/**
 * Sorok számát adja vissza bármilyen DOM node leszármazott textjeire.
 * A rect-eket top szerint csoportosítja (epsilon toleranciával),
 * így elkerüli a túl-számolást inline fragmentek miatt.
 */
function getRenderedLineCountForNode(node, { epsilon = 0.5 } = {}) {
    if (!node) return 0;

    const rects = [];

    // 1) gyűjtsük ki minden text node sor-fragment rectjeit
    for (const tn of getAllTextNodes(node)) {
        const range = document.createRange();
        range.selectNodeContents(tn);
        const rlist = range.getClientRects();
        for (let i = 0; i < rlist.length; i++) {
            const r = rlist[i];
            // 0 szélességű/magasságú vagy display:none esetek kiszűrése
            if (r.width > 0 && r.height > 0) {
                rects.push({ top: r.top, bottom: r.bottom, left: r.left, right: r.right, height: r.height });
            }
        }
    }

    if (rects.length === 0) return 0;

    // 2) top szerint rendezzük
    rects.sort((a, b) => a.top - b.top);

    // 3) klaszterezés top alapján (epsilon px tűrés)
    let lines = 0;
    let currentTop = rects[0].top;

    for (const r of rects) {
        if (Math.abs(r.top - currentTop) > epsilon) {
            lines++;
            currentTop = r.top;
        }
    }
    // az első klaszter is számít:
    return lines + 1;
}

export {getElementBoxWidth, getTextNodeLineCount, getRenderedLineCountForNode};