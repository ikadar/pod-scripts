import handleSeparators from "./separator-mono.js";
import {renderTemplate, setTemplateScripts} from "./render-template";
import smartCaps from "./smart-caps";
import runSqueeze from "./squeeze";

const templateScripts = () => {
    smartCaps();
    runSqueeze();
    handleSeparators();
}

function addPodScripts() {

    const runsInPrince = (typeof Prince !== "undefined");

    function init() {

        if (runsInPrince) {

            Prince.Log.info("POD_PRINCE");
            Prince.trackBoxes = true;

            // Prince.addEventListener("complete", function() {
            //     console.log("complete");
            // }, false);

            Prince.registerPostLayoutFunc(function () {
                // renderTemplate();
                smartCaps();
                runSqueeze();
                handleSeparators();
            });

       } else {

            setTemplateScripts(templateScripts);
            const rendered = renderTemplate({});

            if (!rendered) {
                templateScripts();
            }
        }

    }

    if (runsInPrince) {
        init();
    } else {
        init();
    }

    window.__PROCESSING_DONE__ = true;

}

export default addPodScripts;