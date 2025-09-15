import handleSeparators from "./separator-mono.js";

console.log("TEST01");
document.addEventListener("DOMContentLoaded", function () {

    function init() {
        const runsInPrince = (typeof Prince !== "undefined");
        console.log("TEST02");

        if (runsInPrince) {

            Prince.Log.info("POD_PRINCE");
            console.log("TEST03");
            
            Prince.trackBoxes = true;

            // Prince.addEventListener("complete", function() {
            //     console.log("complete");
            // }, false);

            Prince.registerPostLayoutFunc(function () {
                handleSeparators();
            });

//        } else {
//            document.addEventListener("DOMContentLoaded", function () {
//               handleSeparators();
//            });
        }

    }

    setTimeout(init, 5000);

});
