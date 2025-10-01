import {renderTemplate, zoom} from "./render-template";
function addPostMessageHandler() {
    window.addEventListener('message', (event) => {
        // console.log('Message received from parent:', event.data);

        const sourceNode = document.getElementById('entry-template');

        if (!event.data.data || !sourceNode) {
            return;
        }

        const data = {};
        Object.keys(event.data.data).map((key) => {
            if (Array.isArray(event.data.data[key]) && (event.data.data[key].length > 0)) {
                if (event.data.data[key][0]?.uuid) {
                    data[key] = event.data.data[key][0].uuid;
                } else {
                    data[key] = event.data.data[key][0].label;
                }
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
}

export {addPostMessageHandler};