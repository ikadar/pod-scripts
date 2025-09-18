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
        textNodes.forEach(node => wrapMatchesInTextNode(node, value));
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

function wrapMatchesInTextNode(textNode, value) {
    if (!value) return;
    const text = textNode.nodeValue;
    const valLen = value.length;
    if (valLen === 0) return;

    let idx = text.indexOf(value);
    if (idx === -1) return; // nincs találat

    const frag = document.createDocumentFragment();
    let start = 0;

    while (idx !== -1) {
        if (idx > start) {
            frag.appendChild(document.createTextNode(text.slice(start, idx)));
        }
        const span = document.createElement('span');
        span.className = 'separator';
        span.textContent = value; // pontos egyezés, nem HTML
        frag.appendChild(span);

        start = idx + valLen;
        idx = text.indexOf(value, start);
    }

    if (start < text.length) {
        frag.appendChild(document.createTextNode(text.slice(start)));
    }

    textNode.parentNode.replaceChild(frag, textNode);
}

const getYCoordinate = (element) => {
    return element.getBoundingClientRect().top;
};

export default handleSeparators;
