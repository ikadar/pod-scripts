import handleSeparators from "./separator";
import { prepareElements, squeezeAll } from "./squeeze/squeeze-font-size";
import { prepareElementsForLetterSpacing, squeezeAllLetterSpacing } from "./squeeze/squeeze-letter-spacing";
import { prepareElementsForScaling, squeezeAllScaling } from "./squeeze/squeeze-scaling";

function runSqueeze() {
    prepareElements();
    prepareElementsForLetterSpacing();
    prepareElementsForScaling();

    squeezeAll();
    squeezeAllLetterSpacing();
    squeezeAllScaling();

    // handleSeparators();
}

export default runSqueeze;