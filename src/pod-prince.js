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

    function init() {

        setTemplateScripts(templateScripts);
        const rendered = renderTemplate({});

        if (!rendered) {
            templateScripts();
        }
    }

    init();

    window.__PROCESSING_DONE__ = true;
}

export default addPodScripts;