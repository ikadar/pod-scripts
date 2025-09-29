import logInfo from "./log-info";
import {ensureFontsReady} from "./measurement";
import {prepareElementsForScaling, squeezeAllScaling} from "./squeeze/squeeze-scaling";

let templateScripts = () => {}

const setTemplateScripts = (scripts) => {
    templateScripts = scripts;
}

function scriptFromTheTemplate() {
    // logInfo("scriptFromTheTemplate");
    // replace by the scriptFromTheTemplate
}

function renderTemplate(data, templateId, orderLineUuid, options, sendData) {

    const sourceNode = document.getElementById('entry-template');

    if (!sourceNode) {
        return false;
    }

    const source = sourceNode.innerHTML;

    // Wrap each string property in SafeString
    const safeData = JSON.parse(JSON.stringify(data), (key, value) =>
        typeof value === 'string' ? value.replace(/\\n/g, "<br />") : value
    );

    var renderer = Twig.twig({
        data: source
    });

    const html = renderer.render(safeData);

    document.getElementsByTagName('body')[0].outerHTML = html;

    ensureFontsReady().then(() => {
        console.log("Betöltődtek a fontok! 2");
        scriptFromTheTemplate();
        templateScripts();
    })

    if (sendData) {
        window.parent.postMessage({source: "template-processor", html: html, data: data, templateId: templateId, orderLineUuid: orderLineUuid, options: options}, "*");
    }

    return true;
}

function zoom(ratio) {
    const scale = ratio + " " + ratio;
    document.getElementsByTagName('body')[0].style.scale = ratio;
}

export {renderTemplate, setTemplateScripts, zoom};
