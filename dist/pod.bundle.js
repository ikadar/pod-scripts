this.Pod = (function() {
  "use strict";
  function logInfo$1(info) {
    console.log(info);
  }
  var handleSeparators = function handleSeparators2() {
    logInfo$1("HANDLING SEPARATORS");
    var separatorNodeList = document.querySelectorAll(".separator");
    var separators = Array.from(separatorNodeList);
    separators.map(function(separator) {
      var next = separator.nextElementSibling;
      var prev = separator.previousElementSibling;
      var nextInNewLine = false;
      var prevInNewLine = false;
      if (next) {
        if (getYCoordinate(separator) !== getYCoordinate(next)) {
          nextInNewLine = true;
        }
      }
      if (prev) {
        if (getYCoordinate(separator) !== getYCoordinate(prev)) {
          prevInNewLine = true;
        }
      }
      if (nextInNewLine || prevInNewLine) {
        separator.style.visibility = "hidden";
      } else {
        separator.style.visibility = "visible";
      }
    });
  };
  var getYCoordinate = function getYCoordinate2(element) {
    return element.getBoundingClientRect().top;
  };
  function smartCaps() {
    var ignore = ["rue", "avenue", "impasse", "allée", "boulevard", "place", "route", "voie", "de", "la", "le", "les", "lès", "au", "aux", "du", "quai", "promenade", "chemin", "sentier", "passage", "square", "cours", "traverse", "piétonne", "résidence", "esplanade", "rond-point", "carrefour", "giratoire", "faubourg", "cour", "courtil", "clos", "cité", "villa", "hameau", "lieu-dit", "lotissement", "enclos", "chaussée", "parvis", "digue", "port", "berges", "traboule", "estrade", "estay", "rampe", "immeuble", "batiment", "bâtiment"];
    function getTextNodesInSmartCap() {
      var root = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
      var result = [];
      var elements = root.querySelectorAll(".smartCap");
      elements.forEach(function(el) {
        var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        var node;
        while (node = walker.nextNode()) {
          var text = node.nodeValue;
          if (text.trim().length > 0) {
            node.nodeValue = text.replace(/\w\S*/g, function(word) {
              var lower = word.toLowerCase();
              if (ignore.includes(lower)) {
                return word;
              }
              if (lower.startsWith("d'") || lower.startsWith("l'")) {
                var prefix = lower.slice(0, 2);
                var rest = lower.slice(2);
                return prefix + rest.charAt(0).toUpperCase() + rest.slice(1);
              }
              return word.charAt(0).toUpperCase() + word.slice(1);
            });
            result.push(node);
          }
        }
      });
      return result;
    }
    var smartCapsNodeList = getTextNodesInSmartCap();
    var smartCaps2 = Array.from(smartCapsNodeList);
    smartCaps2.forEach(function(smartCap) {
    });
  }
  var indentIncrement = 4;
  var indent = 0;
  function logInfo(info) {
    {
      console.log("|" + getIndentation() + info);
    }
  }
  function getIndentation() {
    var indentation = "";
    for (var i = 0; i < indent; i++) {
      indentation = indentation + " ";
    }
    return indentation;
  }
  function increaseIndentation() {
    indent += indentIncrement;
  }
  function decreaseIndentation() {
    indent -= indentIncrement;
  }
  function calculateSqueezedFontSize(maxFontSizePt, maxWidthPt, actualWidthPt, actualFontSizePt) {
    logInfo("--- FONT SIZE CALCULATION STARTED");
    logInfo("");
    increaseIndentation();
    var scale = maxWidthPt / actualWidthPt;
    var newFontSizePt = scale;
    logInfo("maxFontSizePt: " + maxFontSizePt);
    logInfo("actualFontSizePt: " + actualFontSizePt);
    logInfo("maxWidthPt: " + maxWidthPt);
    logInfo("actualWidthPt: " + actualWidthPt);
    logInfo("scale: " + scale);
    logInfo("NEW fontSize: " + newFontSizePt);
    logInfo("NEW fontSize: " + Math.min(newFontSizePt, maxFontSizePt));
    decreaseIndentation();
    logInfo("");
    logInfo("--- FONT SIZE CALCULATION ENDED");
    return Math.min(newFontSizePt, maxFontSizePt);
  }
  function getElementBoxWidth(el) {
    return convertToPt(el.clientWidth + "px");
  }
  function squeeze(s) {
    logInfo("=== " + s.element.id + " ===");
    var newFontSizePt = calculateSqueezedFontSize(s.maxFontSizePt, s.maxWidthPt, getElementBoxWidth(s.element), s.element.style.fontSize);
    s.element.style.fontSize = newFontSizePt.toString() + "pt";
    s.element.style.maxWidth = s.maxWidth + "pt";
  }
  function getElementsToSqueeze() {
    var squeezeElements = document.querySelectorAll(".squeeze");
    var squeezeElementsWithParams = [];
    for (var i = 0; i < squeezeElements.length; i++) {
      squeezeElementsWithParams.push(squeezeElements[i]);
    }
    return squeezeElementsWithParams;
  }
  function squeezeAll() {
    for (var i in elementsToSqueeze) {
      squeeze(elementsToSqueeze[i]);
    }
  }
  var elementsToSqueeze = [];
  function prepareElements() {
    var elements = getElementsToSqueeze();
    elements.map(function(element, index) {
      logInfo(element.id);
      var maxWidth = window.getComputedStyle(element).maxWidth;
      var maxFontSize = window.getComputedStyle(element).fontSize;
      if (!maxWidth || !maxFontSize || maxWidth === "none" || maxFontSize === "none") {
        return;
      }
      var maxWidthPt = convertToPt(maxWidth);
      var maxFontSizePt = convertToPt(maxFontSize);
      elementsToSqueeze[index] = {
        element: elements[index],
        maxWidthPt: maxWidthPt,
        maxFontSizePt: maxFontSizePt
      };
      element.style.fontSize = "1pt";
      element.style.width = "fit-content";
      element.style.maxWidth = "";
      element.style.whiteSpace = "nowrap";
    });
  }
  function calculateSqueezedLetterSpacing(element, maxWidthPt) {
    var dpi = 0.74999943307122;
    logInfo("--- CALCULATION STARTED");
    logInfo("");
    increaseIndentation();
    maxWidthPt = maxWidthPt * dpi;
    var text = element.textContent || "";
    var currentLetterSpacing = parseFloat(window.getComputedStyle(element).letterSpacing) || 0;
    currentLetterSpacing = currentLetterSpacing * dpi;
    var currentWidth = getElementBoxWidth(element);
    currentWidth = currentWidth * dpi;
    logInfo("maxWidthPt: " + maxWidthPt);
    logInfo("currentWidth: " + currentWidth);
    logInfo("text: " + (typeof text == "undefined"));
    logInfo("text: " + (typeof text == "string"));
    logInfo("text: " + !!text);
    logInfo("text: " + (!!text ? "AAA" : "BBB"));
    logInfo("text length: " + (!!text ? text.length : 0));
    logInfo("currentLetterSpacing: " + currentLetterSpacing + "pt (assuming)");
    logInfo("scale: " + (maxWidthPt - currentWidth));
    var newLetterSpacing = currentLetterSpacing;
    if (text.length > 1) {
      var extraSpacing = (maxWidthPt - currentWidth) / (text.length - 1);
      newLetterSpacing = currentLetterSpacing + extraSpacing;
    }
    logInfo("newLetterSpacing: " + newLetterSpacing);
    decreaseIndentation();
    logInfo("");
    logInfo("--- CALCULATION ENDED");
    return newLetterSpacing;
  }
  function squeezeLetterSpacing(s) {
    logInfo("=== " + s.element.id + " ===");
    var originalLetterSpacing = parseFloat(window.getComputedStyle(s.element).letterSpacing) || 0;
    console.log("originalLetterSpacing: " + originalLetterSpacing);
    var newLetterSpacingPt = calculateSqueezedLetterSpacing(
      s.element,
      s.maxWidthPt
      // getElementBoxWidth(s.element),
      // originalLetterSpacing
    );
    s.element.style.letterSpacing = newLetterSpacingPt.toString() + "pt";
    s.element.style.maxWidth = s.maxWidth + "pt";
  }
  function squeezeAllLetterSpacing() {
    for (var i in elementsToSqueezeSpacing) {
      squeezeLetterSpacing(elementsToSqueezeSpacing[i]);
    }
  }
  function getElementsToSqueezeLetterSpacing() {
    var squeezeElements = document.querySelectorAll(".squeeze-spacing");
    var squeezeElementsWithParams = [];
    for (var i = 0; i < squeezeElements.length; i++) {
      squeezeElementsWithParams.push(squeezeElements[i]);
    }
    return squeezeElementsWithParams;
  }
  var elementsToSqueezeSpacing = [];
  function prepareElementsForLetterSpacing() {
    console.log("----------------------- prepareElementsForLetterSpacing");
    var elements = getElementsToSqueezeLetterSpacing();
    elements.map(function(element, index) {
      logInfo(element.id);
      var maxWidth = window.getComputedStyle(element).maxWidth;
      if (!maxWidth || maxWidth === "none") {
        return;
      }
      var maxWidthPt = convertToPt(maxWidth);
      elementsToSqueezeSpacing[index] = {
        element: elements[index],
        maxWidthPt: maxWidthPt
      };
      element.style.letterSpacing = "0.1px";
      element.style.maxWidth = "";
      element.style.whiteSpace = "nowrap";
    });
  }
  function convertToPt(size) {
    var dpi = 74.999943307122;
    var pointsPerInch = 72;
    var conversionFactors = {
      pt: 1,
      // 1 pt = 1 pt
      //        px: pointsPerInch / dpi,       // px to pt depends on DPI
      px: dpi / 100,
      // px to pt depends on DPI
      mm: 3.7795275591 * dpi / 100,
      // 1 mm = 1 inch / 25.4
      // mm: pointsPerInch / 25.4,   // 1 mm = 1 inch / 25.4
      cm: pointsPerInch / 2.54,
      // 1 cm = 1 inch / 2.54
      in: 96 * dpi / 100,
      // 1 inch = 72 pt
      // in: pointsPerInch,          // 1 inch = 72 pt
      pc: 16 * dpi,
      // 1 pica (pc) = 12 pt
      em: 16 * dpi,
      // Assuming 1 em ≈ 12 pt (adjust if needed)
      rem: 16 * dpi
      // Assuming 1 rem ≈ 12 pt (adjust if needed)
    };
    var match = size.match(/^([\d.]+)([a-z%]*)$/i);
    if (!match) {
      throw new Error("Invalid size format: " + size);
    }
    var value = parseFloat(match[1]);
    var unit = match[2].toLowerCase();
    if (!unit) {
      unit = "px";
    }
    if (!conversionFactors[unit]) {
      throw new Error("Unsupported unit: " + unit);
    }
    logInfo("IN: " + size);
    logInfo("OUT: " + value * conversionFactors[unit]);
    return value * conversionFactors[unit];
  }
  function runSqueeze() {
    prepareElements();
    prepareElementsForLetterSpacing();
    squeezeAll();
    squeezeAllLetterSpacing();
    handleSeparators();
  }
  var templateScripts$1 = function templateScripts2() {
  };
  var setTemplateScripts = function setTemplateScripts2(scripts) {
    templateScripts$1 = scripts;
  };
  window.addEventListener("message", function(event) {
    var sourceNode = document.getElementById("entry-template");
    if (!event.data.data || !sourceNode) {
      return;
    }
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
    logInfo$1("scriptFromTheTemplate");
  }
  function renderTemplate(data, templateId, orderLineUuid, options, sendData) {
    var sourceNode = document.getElementById("entry-template");
    if (!sourceNode) {
      return false;
    }
    var source = sourceNode.innerHTML;
    var safeData = JSON.parse(JSON.stringify(data), function(key, value) {
      return typeof value === "string" ? value.replace(/\\n/g, "<br />") : value;
    });
    var renderer = Twig.twig({
      data: source
    });
    var html = renderer.render(safeData);
    document.getElementsByTagName("body")[0].outerHTML = html;
    scriptFromTheTemplate();
    templateScripts$1();
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
    return true;
  }
  function zoom(ratio) {
    document.getElementsByTagName("body")[0].style.scale = ratio;
  }
  var templateScripts = function templateScripts2() {
    smartCaps();
    runSqueeze();
    handleSeparators();
  };
  function addPodScripts() {
    function init() {
      setTemplateScripts(templateScripts);
      var rendered = renderTemplate({});
      if (!rendered) {
        templateScripts();
      }
    }
    init();
    window.__PROCESSING_DONE__ = true;
  }
  return addPodScripts;
})();
//# sourceMappingURL=pod.bundle.js.map
