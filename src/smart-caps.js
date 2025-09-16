import {map} from "core-js/internals/array-iteration";

function smartCaps() {

    const ignore = [
        "rue", "avenue", "impasse", "allée", "boulevard", "place", "route", "voie", "de", "la", "le", "les", "aux", "du"
    ];

    // d' l'

    function getTextNodesInSmartCap(root = document) {
        const result = [];
        const elements = root.querySelectorAll('.smartCap');

        elements.forEach(el => {
            const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
            let node;
            while ((node = walker.nextNode())) {
                if (node.nodeValue.trim().length > 0) {
                    result.push(node);
                }
            }
        });

        return result;
    }

    const smartCapsNodeList = getTextNodesInSmartCap();
    const smartCaps = Array.from(smartCapsNodeList);

    smartCaps.forEach(smartCap => {
        console.log(smartCap);
    })
}

export default smartCaps;