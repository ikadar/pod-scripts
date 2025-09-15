this.Pod = (function() {
  "use strict";
  var runsInPrince = typeof Prince !== "undefined";
  var handleSeparators = function handleSeparators2() {
    console.log("HANDLING SEPARATORS 02 - 101");
    var separatorNodeList = document.querySelectorAll(".separator");
    var separators = Array.from(separatorNodeList);
    console.log("SEPARATORS", separators.length);
    separators.map(function(separator) {
      var next = separator.nextElementSibling;
      if (next) {
        console.log("NEXT", next);
        console.log("getYCoordinate(separator)", getYCoordinate(separator));
        console.log("getYCoordinate(next)", getYCoordinate(next));
        if (getYCoordinate(separator) !== getYCoordinate(next)) {
          console.log("HIDE SEPARATOR");
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
    console.log("scriptFromTheTemplate");
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
        html,
        data,
        templateId,
        orderLineUuid,
        options
      }, "*");
    }
  }
  function zoom(ratio) {
    document.getElementsByTagName("body")[0].style.scale = ratio;
  }
  function addPodScripts() {
    console.log("TEST01");
    document.addEventListener("DOMContentLoaded", function() {
      var runsInPrince2 = typeof Prince !== "undefined";
      function init() {
        console.log("TEST02");
        if (runsInPrince2) {
          Prince.Log.info("POD_PRINCE");
          console.log("TEST03");
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
        setTimeout(init, 5e3);
      } else {
        init();
      }
    });
  }
  if (typeof window !== "undefined") {
    window.addPodScripts = addPodScripts;
  }
  return addPodScripts;
})();
//# sourceMappingURL=pod.bundle.js.map
