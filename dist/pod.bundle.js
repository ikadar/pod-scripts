this.Pod = (function() {
  "use strict";
  var runsInPrince$1 = typeof Prince !== "undefined";
  function logInfo(info) {
    if (runsInPrince$1) {
      Prince.Log.info(info);
    } else {
      console.log(info);
    }
  }
  var runsInPrince = typeof Prince !== "undefined";
  var handleSeparators = function handleSeparators2() {
    logInfo("HANDLING SEPARATORS 02 - 101");
    var separatorNodeList = document.querySelectorAll(".separator");
    var separators = Array.from(separatorNodeList);
    logInfo("SEPARATORS", separators.length);
    separators.map(function(separator) {
      var next = separator.nextElementSibling;
      if (next) {
        logInfo("NEXT");
        logInfo("getYCoordinate(separator)", getYCoordinate(separator));
        logInfo("getYCoordinate(next)", getYCoordinate(next));
        if (getYCoordinate(separator) !== getYCoordinate(next)) {
          logInfo("HIDE SEPARATOR");
          separator.style.visibility = "hidden";
        } else {
          separator.style.visibility = "visible";
        }
      }
    });
  };
  var getYCoordinate = function getYCoordinate2(element) {
    if (runsInPrince) {
      return element.getPrinceBoxes()[0].y;
    } else {
      return element.getBoundingClientRect().top;
    }
  };
  window.addEventListener("message", function(event) {
    var data = {};
    Object.keys(event.data.data).map(function(key) {
      if (Array.isArray(event.data.data[key]) && event.data.data[key].length > 0) {
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
  }
  function renderTemplate(data, templateId, orderLineUuid, options, sendData) {
    var source = document.getElementById("entry-template").innerHTML;
    var safeData = JSON.parse(JSON.stringify(data), function(key, value) {
      return typeof value === "string" ? value.replace(/\\n/g, "<br />") : value;
    });
    var renderer = Twig.twig({
      data: source
    });
    var html = renderer.render(safeData);
    document.getElementsByTagName("body")[0].outerHTML = html;
    scriptFromTheTemplate();
    handleSeparators();
    if (sendData) {
      window.parent.postMessage({
        source: "template-processor",
        html: html,
        data: data,
        templateId: templateId,
        orderLineUuid: orderLineUuid,
        options: options
      }, "*");
    }
  }
  function zoom(ratio) {
    document.getElementsByTagName("body")[0].style.scale = ratio;
  }
  function addPodScripts() {
    var runsInPrince2 = typeof Prince !== "undefined";
    function init() {
      if (runsInPrince2) {
        Prince.Log.info("POD_PRINCE");
        Prince.trackBoxes = true;
        Prince.registerPostLayoutFunc(function() {
          handleSeparators();
        });
      } else {
        renderTemplate({});
        handleSeparators();
      }
    }
    if (runsInPrince2) {
      init();
    } else {
      init();
    }
  }
  return addPodScripts;
})();
//# sourceMappingURL=pod.bundle.js.map
