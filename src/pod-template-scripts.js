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

    async function init(data) {

        setTemplateScripts(templateScripts);

        addPostMessageHandler();

        if (document.fonts?.ready) {
            try { await document.fonts.ready; } catch {}
        }

        // const rendered = false;
        const rendered = renderTemplate(data);
        // const rendered = renderTemplate({});

        if (!rendered || Object.keys(data)?.[0] === "_") return; {
            templateScripts();
        }
    }

    document.addEventListener("DOMContentLoaded", async (event) => {
        await init(data);
    });

    window.__PROCESSING_DONE__ = true;
}

export default addPodScripts;