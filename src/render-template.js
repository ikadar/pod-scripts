import logInfo from "./log-info";

let templateScripts = () => {}

const setTemplateScripts = (scripts) => {
    templateScripts = scripts;
}

window.addEventListener('message', (event) => {
    // console.log('Message received from parent:', event.data);

    const sourceNode = document.getElementById('entry-template');

    if (!event.data.data || !sourceNode) {
        return;
    }

    const data = {};
    Object.keys(event.data.data).map((key) => {
        if (Array.isArray(event.data.data[key]) && (event.data.data[key].length > 0)) {
            data[key] = event.data.data[key][0].label;
        } else {
            data[key] = event.data.data[key];
        }
    });

    if (event.data.msgId === "dataChanged") {
        renderTemplate(data, event.data.templateId, event.data.orderLineUuid, event.data.options, false);
        zoom(event.data.zoom / 100);
    }

    if (event.data.msgId === "getRenderedMarkup") {
        renderTemplate(data, event.data.templateId, event.data.orderLineUuid, event.data.options, true);
        zoom(event.data.zoom / 100);
    }

    if (event.data.msgId === "zoom") {
        zoom(event.data.data / 100);
    }

});

function scriptFromTheTemplate() {
    logInfo("scriptFromTheTemplate");
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
    scriptFromTheTemplate();
    templateScripts();
    // smartCaps();
    // runSqueeze();
    // handleSeparators();
    if (sendData) {
        window.parent.postMessage({source: "template-processor", html: html, data: data, templateId: templateId, orderLineUuid: orderLineUuid, options: options}, "*");
    }

    return true;
}

function zoom(ratio) {
    const scale = ratio + " " + ratio;
    document.getElementsByTagName('body')[0].style.scale = ratio;
}

export {renderTemplate, setTemplateScripts};
