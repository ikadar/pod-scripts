import convertToPt from "./conversion";

/**
 * Megméri egy elem „természetes” szélességét: max-width nélkül, egy sorban.
 * A mérés előtt megvárja a webfontok betöltését.
 * Visszatérési érték: px (number). Ha pt kell, szorozd 0.75-tel (96dpi).
 */
function getElementBoxWidth(el, overflown=false) {
    if (!(el instanceof Element)) throw new Error('measureInlineWidthNowrap: el must be Element');

    // 2) eredeti inline stílusok mentése
    const prev = {
        maxWidth: el.style.maxWidth,
        whiteSpace: el.style.whiteSpace,
        transform: el.style.transform,
        display: el.style.display,
    };

    try {
        // 3) mérési állapot
        el.style.maxWidth   = 'none';
        el.style.whiteSpace = 'nowrap';
        // el.style.transform  = 'none'; // scale/rotate ne torzítson
        el.style.display = 'inline';
        // el.style.display = 'inline-block';

        // 4) reflow trigger (biztos ami biztos)
        // eslint-disable-next-line no-unused-expressions
        el.offsetWidth;

        // // 5) mérés
        // const wPx = window.getComputedStyle(el).width;
        // console.log(`${el.id}: ${wPx}`);
        // return convertToPt(`${wPx}`);
        // 5) mérés
        const wPx = el.getBoundingClientRect().width;
        let wPx2 = 0;
        if (overflown) {
            el.style.display = 'inline-block';
            wPx2 = el.getBoundingClientRect().width;
        }
        // console.log(`${el.id}: ${wPx}`);
        return convertToPt(`${Math.max(wPx, wPx2)}px`);
    } finally {
        // 6) visszaállítás
        el.style.maxWidth   = prev.maxWidth;
        el.style.whiteSpace = prev.whiteSpace;
        // el.style.transform  = prev.transform;
        el.style.display = prev.display;
    }
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