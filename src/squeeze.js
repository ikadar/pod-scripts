import handleSeparators from "./separator";
import { prepareElements, squeezeAll } from "./squeeze/squeeze-font-size";
import { prepareElementsForLetterSpacing, squeezeAllLetterSpacing } from "./squeeze/squeeze-letter-spacing";
import { prepareElementsForScaling, squeezeAllScaling } from "./squeeze/squeeze-scaling";
import {ensureFontsReady} from "./measurement";

function runSqueeze() {
    console.log("SQUEEZING");

    ensureFontsReady().then(() => {
        console.log("Betöltődtek a fontok! 3", document.fonts);
        // prepareElements();
        // prepareElementsForLetterSpacing();
        prepareElementsForScaling();

        // squeezeAll();
        // squeezeAllLetterSpacing();
        squeezeAllScaling();

        // handleSeparators();
    })


}

export default runSqueeze;