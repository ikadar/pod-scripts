import logInfo from "./logInfo";

function smartCaps() {

    const ignore = [
        "rue", "avenue", "impasse", "allée", "boulevard", "place", "route", "voie", "de", "la", "le", "les", "lès", "au", "aux", "du", "quai", "promenade", "chemin", "sentier", "passage", "square", "cours", "traverse", "piétonne", "résidence", "esplanade", "rond-point", "carrefour", "giratoire", "faubourg", "cour", "courtil", "clos", "cité", "villa", "hameau", "lieu-dit", "lotissement", "enclos", "chaussée", "parvis", "digue", "port", "berges", "traboule", "estrade", "estay", "rampe", "immeuble", "batiment", "bâtiment"
    ];

    // d' l'

    function getTextNodesInSmartCap(root = document) {
        const result = [];
        const elements = root.querySelectorAll('.smartCap');

        elements.forEach(el => {
            const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
            let node;
            while ((node = walker.nextNode())) {
                const text = node.nodeValue;
                if (text.trim().length > 0) {
                    node.nodeValue = text.replace(/\w\S*/g, function (word) {
                        const lower = word.toLowerCase();
                        if (ignore.includes(lower)) {
                            return word;
                        }
                        return word.charAt(0).toUpperCase() + word.slice(1);                    });
                    result.push(node);
                }
            }
        });

        return result;
    }

    const smartCapsNodeList = getTextNodesInSmartCap();
    const smartCaps = Array.from(smartCapsNodeList);

    smartCaps.forEach(smartCap => {
        logInfo(smartCap);
    })
}

export default smartCaps;