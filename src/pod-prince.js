import handleSeparators from "./separator-mono.js";
import renderTemplate from "./render-template";

function addPodScripts() {
    console.log("TEST01");
    document.addEventListener("DOMContentLoaded", function () {

        const runsInPrince = (typeof Prince !== "undefined");

        function init() {
            console.log("TEST02");

            if (runsInPrince) {

                Prince.Log.info("POD_PRINCE");
                console.log("TEST03");

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

export default addPodScripts;