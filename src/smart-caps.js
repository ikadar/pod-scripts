import {map} from "core-js/internals/array-iteration";

function smartCaps() {

    const ignore = [
        "rue", "avenue", "impasse", "allée", "boulevard", "place", "route", "voie", "de", "la", "le", "les", "aux", "du"
    ];

    // d' l'

    const smartCapsNodeList = document.querySelectorAll(".smartCap");
    const smartCaps = Array.from(smartCapsNodeList);

    smartCaps.forEach(smartCap => {
        console.log(smartCap);
    })
}

export default smartCaps;