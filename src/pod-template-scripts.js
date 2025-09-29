import handleSeparators from "./separator.js";
import {renderTemplate, setTemplateScripts} from "./render-template";
import smartCaps from "./smart-caps";
import runSqueeze from "./squeeze";
import {addPostMessageHandler} from "./post-msg-handler";

const templateScripts = () => {
    smartCaps();
    runSqueeze();
    handleSeparators();
}

function addPodScripts(data) {

    function init(data) {

        setTemplateScripts(templateScripts);

        addPostMessageHandler();

        const rendered = renderTemplate(data);
        // const rendered = renderTemplate({});

        if (!rendered) {
            templateScripts();
        }
    }

    document.addEventListener("DOMContentLoaded", (event) => {

        ensureFontsReady(function () {
            console.log("Betöltődtek a fontok! 1");
            init(data);
        }, 50);
    });

    window.__PROCESSING_DONE__ = true;
}

/**
 * Meghívja a run() függvényt, amint a dokumentum fontjai betöltődtek.
 * Nem használ async/await-et, csak setTimeout-ot.
 *
 * @param {Function} run    - a te indító függvényed
 * @param {number} interval - milliszekundumok két próbálkozás között (alap: 50ms)
 */
function ensureFontsReady(run, interval) {
    interval = interval || 50;

    function check() {
        if (document.fonts && document.fonts.status === "loaded") {
            run();
        } else {
            setTimeout(check, interval);
        }
    }
    check();
}

export default addPodScripts;