import logInfo from "./log-info";

const handleSeparators = () => {

    logInfo("HANDLING SEPARATORS");

    const results = Array.from(document.querySelectorAll('[class*="separator-["]'))
        .map(el => {
            const m = el.className.match(/separator-\[([^\]]+)\]/);
            return m ? { element: el, value: m[1] } : null;
        })
        .filter(Boolean);

    results.forEach(({ element, value }) => {
        console.log(`Element:`, element, ` → value:`, value);
        const textNodes = getAllTextNodes(element);
        textNodes.forEach(node => wrapMatchesWithSeparatorAndSegments(node, value));
    });

    const separatorNodeList = document.querySelectorAll(".separator");
    const separators = Array.from(separatorNodeList);

    separators.map((separator) => {
        const next = separator.nextElementSibling;
        const prev = separator.previousElementSibling;

        let nextInNewLine = false;
        let prevInNewLine = false;

        if (next) {
            if (getYCoordinate(separator) !== getYCoordinate(next)) {
                nextInNewLine = true;
            }
        }

        if (prev) {
            if (getYCoordinate(separator) !== getYCoordinate(prev)) {
                prevInNewLine = true;
            }
        }

        if (nextInNewLine) {
            console.log("VISIBILIITY HIDDEN");
            separator.style.visibility = "hidden";
        } else {
            console.log("VISIBILIITY VISIBLE");
            separator.style.visibility = "visible";
        }

        if (prevInNewLine) {
            console.log("DISPLAY NONE");
            separator.style.display = "none";
        } else {
            console.log("DISPLAY INLINE-BLOCK");
            separator.style.display = "inline";
        }

    });
};

function getAllTextNodes(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    return nodes;
}

function wrapMatchesWithSeparatorAndSegments(textNode, value) {
    if (!value) return;
    const text = textNode.nodeValue;
    const valLen = value.length;
    if (!valLen) return;

    let idx = text.indexOf(value);
    if (idx === -1) return; // nincs találat ebben a node-ban

    const frag = document.createDocumentFragment();
    let start = 0;

    while (idx !== -1) {
        const before = text.slice(start, idx);

        // 1) value ELŐTTI rész: ha van nem-whitespace tartalom, csomagoljuk <span>-be
        const beforeTrim = before.trim();
        if (beforeTrim.length > 0) {
            const spanBefore = document.createElement('span');
            spanBefore.textContent = beforeTrim;
            frag.appendChild(spanBefore);
        } else {
            // ha csak whitespace volt, azt hagyjuk figyelmen kívül – a separator elé úgyis beszúrunk 1 szóközt
        }

        // 2) kötelező space a separator ELÉ
        frag.appendChild(document.createTextNode(' '));

        // 3) a separator maga
        const sep = document.createElement('span');
        sep.className = 'separator';
        sep.textContent = value;
        frag.appendChild(sep);

        // 4) kötelező space a separator MÖGÉ
        frag.appendChild(document.createTextNode(' '));

        // következő keresési ablak
        start = idx + valLen;
        idx = text.indexOf(value, start);
    }

    // 5) értékeljük a LEGUTOLSÓ találat UTÁNI részt
    const after = text.slice(start);
    const afterTrim = after.trim();

    if (afterTrim.length > 0) {
        // ha van tartalom, az tartalom legyen spanban, a whitespace-ek maradjanak külön text node-ként
        const leadingWs = after.match(/^\s*/)?.[0] ?? '';
        const trailingWs = after.match(/\s*$/)?.[0] ?? '';
        if (leadingWs) frag.appendChild(document.createTextNode(leadingWs));

        const spanAfter = document.createElement('span');
        spanAfter.textContent = afterTrim;
        frag.appendChild(spanAfter);

        if (trailingWs) frag.appendChild(document.createTextNode(trailingWs));
    } else {
        // csak whitespace maradt → tegyük vissza változatlanul
        if (after) frag.appendChild(document.createTextNode(after));
    }

    // 6) cseréljük a text node-ot az új tartalomra
    textNode.parentNode?.replaceChild(frag, textNode);
}

const getYCoordinate = (element) => {
    return element.getBoundingClientRect().top;
};

export default handleSeparators;
