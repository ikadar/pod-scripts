import handleSeparators from "https://cdn.jsdelivr.net/gh/ikadar/hanging-separator@2a0c97666036c036abfa6f8bd7316efcbfb19808/separator-mono.js";


document.addEventListener("DOMContentLoaded", function () {

    function init() {
        const runsInPrince = (typeof Prince !== "undefined");

        if (runsInPrince) {
            Prince.trackBoxes = true;

            // Prince.addEventListener("complete", function() {
            //     console.log("complete");
            // }, false);

            Prince.registerPostLayoutFunc(function () {
                handleSeparators();
            });

        } else {
            document.addEventListener("DOMContentLoaded", function () {
                handleSeparators();
            });
        }

    }

    setTimeout(init, 5000);

});
