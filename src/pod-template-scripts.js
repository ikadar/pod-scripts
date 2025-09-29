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



    // 1) Események
    document.fonts?.addEventListener?.('loading', () => {
        console.log('[fonts] loading… status=', document.fonts.status);
    });

    document.fonts?.addEventListener?.('loadingdone', (e) => {
        console.log('[fonts] DONE. Faces:');
        e.fontfaces?.forEach(ff => {
            console.log('  family:', ff.family,
                'style:', ff.style,
                'weight:', ff.weight,
                'stretch:', ff.stretch,
                'status:', ff.status);
        });
    });

    document.fonts?.addEventListener?.('loadingerror', (e) => {
        console.warn('[fonts] ERROR. Faces:', e.fontfaces);
    });

// 2) Monkey-patch: logold, ha BÁRKI hívja a document.fonts.load-ot
    if (document.fonts?.load) {
        const _origLoad = document.fonts.load.bind(document.fonts);
        document.fonts.load = function(descriptor, test) {
            console.log('[fonts.load] called:', descriptor, 'test:', test);
            const p = _origLoad(descriptor, test);
            p.then(() => console.log('[fonts.load] resolved:', descriptor))
                .catch(err => console.warn('[fonts.load] error:', descriptor, err));
            return p;
        };
    }

    async function waitFontsForElement(el, test='A') {
        const cs = getComputedStyle(el);
        const desc = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontStretch || 'normal'} ${cs.fontSize} ${cs.fontFamily}`;
        console.log('[fonts.check]', desc, '=>', document.fonts?.check?.(desc));
        await document.fonts?.load?.(desc, test);
    }




    function init(data) {

        setTemplateScripts(templateScripts);

        addPostMessageHandler();

        document.fonts?.addEventListener?.('loading', (e) => {
            console.log('[fonts] loading…', e);
        });
        document.fonts?.addEventListener?.('loadingdone', (e) => {
            console.log('[fonts] loading done', e);
        });
        document.fonts?.addEventListener?.('loadingerror', (e) => console.warn('[fonts] error', e));

        const rendered = renderTemplate(data);
        // const rendered = renderTemplate({});

        if (!rendered) {
            templateScripts();
        }
    }

    document.addEventListener("DOMContentLoaded", async (event) => {

        await waitFontsForElement(yourElement);

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