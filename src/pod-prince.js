import handleSeparators from "./separator-mono.js";
import renderTemplate from "./render-template";
import squeeze from "./squeeze";
import smartCaps from "./smart-caps";
import runSqueeze from "./squeeze";

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
            renderTemplate({});
            smartCaps();
            runSqueeze();
            handleSeparators();
        }

    }

    if (runsInPrince) {
        init();
    } else {
        init();
    }

}

export default addPodScripts;