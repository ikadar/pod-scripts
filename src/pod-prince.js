import handleSeparators from "./separator-mono.js";
import renderTemplate from "./render-template";

function addPodScripts() {
    Prince.Log.info("TEST01");
    document.addEventListener("DOMContentLoaded", function () {

        const runsInPrince = (typeof Prince !== "undefined");

        function init() {
            Prince.Log.info("TEST02");

            if (runsInPrince) {

                Prince.Log.info("POD_PRINCE");
                Prince.Log.info("TEST03");

                Prince.trackBoxes = true;

                // Prince.addEventListener("complete", function() {
                //     console.log("complete");
                // }, false);

                Prince.registerPostLayoutFunc(function () {
                    // renderTemplate();
                    handleSeparators();
                });

           } else {
                renderTemplate({});
                handleSeparators();
            }

        }

        if (runsInPrince) {
            setTimeout(init, 5000);
        } else {
            init();
        }

    });

}

if (typeof window !== 'undefined') {
    window.addPodScripts = addPodScripts;
}
export default addPodScripts;