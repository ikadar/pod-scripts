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

function addPodScripts() {

    function init() {

        setTemplateScripts(templateScripts);

        addPostMessageHandler();

        const rendered = renderTemplate({});

        if (!rendered) {
            templateScripts();
        }
    }

    init();

    window.__PROCESSING_DONE__ = true;
}

export default addPodScripts;