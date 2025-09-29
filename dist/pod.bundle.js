this.Pod = (function() {
  "use strict";
  var handleSeparators = function handleSeparators2() {
    var results = Array.from(document.querySelectorAll('[class*="separator-["]')).map(function(el) {
      var m = el.className.match(/separator-\[([^\]]+)\]/);
      return m ? {
        element: el,
        value: m[1]
      } : null;
    }).filter(Boolean);
    results.forEach(function(_ref) {
      var element = _ref.element, value = _ref.value;
      var textNodes = getAllTextNodes(element);
      textNodes.forEach(function(node) {
        return wrapMatchesWithSeparatorAndSegments(node, value);
      });
    });
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
      if (nextInNewLine) {
        separator.style.visibility = "hidden";
      } else {
        separator.style.visibility = "visible";
      }
      if (prevInNewLine) {
        separator.style.display = "none";
      } else {
        separator.style.display = "inline";
      }
    });
  };
  function getAllTextNodes(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [];
    var n;
    while (n = walker.nextNode()) nodes.push(n);
    return nodes;
  }
  function wrapMatchesWithSeparatorAndSegments(textNode, value) {
    var _textNode$parentNode;
    if (!value) return;
    var text = textNode.nodeValue;
    var valLen = value.length;
    if (!valLen) return;
    var idx = text.indexOf(value);
    if (idx === -1) return;
    var frag = document.createDocumentFragment();
    var start = 0;
    while (idx !== -1) {
      var before = text.slice(start, idx);
      var beforeTrim = before.trim();
      if (beforeTrim.length > 0) {
        var spanBefore = document.createElement("span");
        spanBefore.textContent = beforeTrim;
        frag.appendChild(spanBefore);
      }
      frag.appendChild(document.createTextNode(" "));
      var sep = document.createElement("span");
      sep.className = "separator";
      sep.textContent = value;
      frag.appendChild(sep);
      frag.appendChild(document.createTextNode(" "));
      start = idx + valLen;
      idx = text.indexOf(value, start);
    }
    var after = text.slice(start);
    var afterTrim = after.trim();
    if (afterTrim.length > 0) {
      var _after$match$, _after$match, _after$match$2, _after$match2;
      var leadingWs = (_after$match$ = (_after$match = after.match(/^\s*/)) === null || _after$match === void 0 ? void 0 : _after$match[0]) !== null && _after$match$ !== void 0 ? _after$match$ : "";
      var trailingWs = (_after$match$2 = (_after$match2 = after.match(/\s*$/)) === null || _after$match2 === void 0 ? void 0 : _after$match2[0]) !== null && _after$match$2 !== void 0 ? _after$match$2 : "";
      if (leadingWs) frag.appendChild(document.createTextNode(leadingWs));
      var spanAfter = document.createElement("span");
      spanAfter.textContent = afterTrim;
      frag.appendChild(spanAfter);
      if (trailingWs) frag.appendChild(document.createTextNode(trailingWs));
    } else {
      if (after) frag.appendChild(document.createTextNode(after));
    }
    (_textNode$parentNode = textNode.parentNode) === null || _textNode$parentNode === void 0 || _textNode$parentNode.replaceChild(frag, textNode);
  }
  var getYCoordinate = function getYCoordinate2(element) {
    return element.getBoundingClientRect().top;
  };
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
    var match = size.match(/^(-?[\d.]+)([a-z%]*)$/i);
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
    return value * conversionFactors[unit];
  }
  function getElementBoxWidth(el) {
    var _document$fonts, _document$fonts2;
    if (!(el instanceof Element)) throw new Error("measureInlineWidthNowrap: el must be Element");
    console.log("document.fonts?.status: ".concat((_document$fonts = document.fonts) === null || _document$fonts === void 0 ? void 0 : _document$fonts.status));
    if (((_document$fonts2 = document.fonts) === null || _document$fonts2 === void 0 ? void 0 : _document$fonts2.status) === "loading") {
      console.log("!!!");
    }
    var prev = {
      maxWidth: el.style.maxWidth,
      whiteSpace: el.style.whiteSpace,
      transform: el.style.transform,
      display: el.style.display
    };
    try {
      el.style.maxWidth = "none";
      el.style.whiteSpace = "nowrap";
      el.style.display = "inline-block";
      el.offsetWidth;
      var wPx = el.getBoundingClientRect().width;
      console.log("".concat(el.id, ": ").concat(wPx));
      return convertToPt("".concat(wPx, "px"));
    } finally {
      el.style.maxWidth = prev.maxWidth;
      el.style.whiteSpace = prev.whiteSpace;
      el.style.display = prev.display;
    }
  }
  function ensureFontsReady$1() {
    var interval = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 50;
    return new Promise(function(resolve) {
      function check() {
        if (document.fonts && document.fonts.status === "loaded") {
          resolve();
        } else {
          setTimeout(check, interval);
        }
      }
      console.log("CHECK");
      check();
    });
  }
  var elementsToSqueezeScaling = [];
  function getElementsToScaling() {
    var squeezeElements = document.querySelectorAll(".squeeze-scaling");
    var squeezeElementsWithParams = [];
    for (var i = 0; i < squeezeElements.length; i++) {
      squeezeElementsWithParams.push(squeezeElements[i]);
    }
    return squeezeElementsWithParams;
  }
  function prepareElementsForScaling() {
    var elements = getElementsToScaling();
    elements.map(function(element, index) {
      var _classArray$find, _classArray$find2;
      var maxWidth = window.getComputedStyle(element).maxWidth;
      var maxFontSize = window.getComputedStyle(element).fontSize;
      var currentWidth = window.getComputedStyle(element).width;
      if (!maxWidth || !maxFontSize || maxWidth === "none" || maxFontSize === "none") {
        return;
      }
      element.width = maxWidth;
      var maxWidthPt = convertToPt("".concat(getElementBoxWidth(element), "px"));
      element.width = currentWidth;
      var maxFontSizePt = convertToPt(maxFontSize);
      var classArray = Array.from(element.classList);
      var maxMatch = (_classArray$find = classArray.find(function(c) {
        return c.startsWith("max-scale-");
      })) === null || _classArray$find === void 0 ? void 0 : _classArray$find.match(/^max-scale-\[([^\]]+)\]$/);
      var maxScale = maxMatch ? maxMatch[1] : null;
      var minMatch = (_classArray$find2 = classArray.find(function(c) {
        return c.startsWith("min-scale-");
      })) === null || _classArray$find2 === void 0 ? void 0 : _classArray$find2.match(/^min-scale-\[([^\]]+)\]$/);
      var minScale = minMatch ? minMatch[1] : null;
      elementsToSqueezeScaling[index] = {
        element: elements[index],
        maxWidthPt: maxWidthPt,
        maxFontSizePt: maxFontSizePt,
        maxScale: maxScale,
        minScale: minScale
      };
      element.style.transform = "scale(1, 1)";
      element.style.transformOrigin = "left center";
      element.style.display = "inline-block";
      element.style.flex = "0 0 auto";
      element.style.alignSelf = "flex-start";
      element.style.maxWidth = "";
      element.style.whiteSpace = "nowrap";
    });
  }
  function calculateSqueezedScale(element, maxWidthPt) {
    var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    _ref.pxToPt;
    var _ref$axis = _ref.axis, axis = _ref$axis === void 0 ? "x" : _ref$axis, _ref$minScale = _ref.minScale, minScale = _ref$minScale === void 0 ? 0.2 : _ref$minScale, _ref$maxScale = _ref.maxScale, maxScale = _ref$maxScale === void 0 ? 1 : _ref$maxScale, _ref$epsilon = _ref.epsilon, epsilon = _ref$epsilon === void 0 ? 0.05 : _ref$epsilon, _ref$maxIter = _ref.maxIter, maxIter = _ref$maxIter === void 0 ? 5 : _ref$maxIter, _ref$setOrigin = _ref.setOrigin, setOrigin = _ref$setOrigin === void 0 ? true : _ref$setOrigin;
    var targetPt = maxWidthPt;
    var prevTransform = element.style.transform || "";
    var prevOrigin = element.style.transformOrigin || "";
    element.style.transform = "none";
    if (setOrigin) element.style.transformOrigin = "left center";
    var baseWidthPt = getElementBoxWidth(element) || 0;
    if (baseWidthPt <= 0) {
      element.style.transform = prevTransform;
      element.style.transformOrigin = prevOrigin;
      return 1;
    }
    var sx = clamp(targetPt / baseWidthPt, minScale, maxScale);
    console.log("sx1: ".concat(sx));
    var sy = axis === "uniform" ? sx : 1;
    element.style.transform = "scale(".concat(sx, ", ").concat(sy, ")").trim();
    for (var i = 0; i < maxIter; i++) {
      var w = getElementBoxWidth(element);
      var diffPt = targetPt - w;
      if (Math.abs(diffPt) <= epsilon) break;
      var factor = targetPt / (w || 1);
      sx = clamp(sx * factor, minScale, maxScale);
      console.log("w: ".concat(w, " - sx2: ").concat(sx));
      sy = axis === "uniform" ? sx : 1;
      element.style.transform = "scale(".concat(sx, ", ").concat(sy, ")").trim();
    }
    if (!setOrigin) element.style.transformOrigin = prevOrigin;
    console.log("sx3: ".concat(sx));
    return sx;
    function clamp(v, lo, hi) {
      return Math.max(lo, Math.min(hi, v));
    }
  }
  function squeezeScale(s) {
    var _s$maxScale, _s$minScale;
    parseFloat(window.getComputedStyle(s.element).letterSpacing) || 0;
    var newScale = calculateSqueezedScale(
      s.element,
      s.maxWidthPt
      // getElementBoxWidth(s.element),
      // originalLetterSpacing
    );
    var maxScale = (_s$maxScale = s.maxScale) !== null && _s$maxScale !== void 0 ? _s$maxScale : newScale;
    var minScale = (_s$minScale = s.minScale) !== null && _s$minScale !== void 0 ? _s$minScale : newScale;
    var finalScale = Math.max(Math.min(newScale, Number(maxScale)), Number(minScale));
    var finalScaleString = "scale(".concat(finalScale, ", 1)");
    s.element.style.transform = finalScaleString;
    s.element.style.maxWidth = s.maxWidth + "pt";
  }
  function squeezeAllScaling() {
    for (var i in elementsToSqueezeScaling) {
      squeezeScale(elementsToSqueezeScaling[i]);
    }
  }
  var templateScripts$1 = function templateScripts2() {
  };
  var setTemplateScripts = function setTemplateScripts2(scripts) {
    templateScripts$1 = scripts;
  };
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
    ensureFontsReady$1().then(function() {
      console.log("Betöltődtek a fontok! 2");
      templateScripts$1();
    });
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
  function runSqueeze() {
    console.log("SQUEEZING");
    ensureFontsReady$1().then(function() {
      console.log("Betöltődtek a fontok! 3");
      prepareElementsForScaling();
      squeezeAllScaling();
    });
  }
  function addPostMessageHandler() {
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
  }
  var templateScripts = function templateScripts2() {
    smartCaps();
    runSqueeze();
    handleSeparators();
  };
  function addPodScripts(data) {
    function init(data2) {
      var _document$fonts, _document$fonts$addEv, _document$fonts2, _document$fonts2$addE, _document$fonts3, _document$fonts3$addE;
      setTemplateScripts(templateScripts);
      addPostMessageHandler();
      (_document$fonts = document.fonts) === null || _document$fonts === void 0 || (_document$fonts$addEv = _document$fonts.addEventListener) === null || _document$fonts$addEv === void 0 || _document$fonts$addEv.call(_document$fonts, "loading", function(e) {
        console.log("[fonts] loading…", e);
      });
      (_document$fonts2 = document.fonts) === null || _document$fonts2 === void 0 || (_document$fonts2$addE = _document$fonts2.addEventListener) === null || _document$fonts2$addE === void 0 || _document$fonts2$addE.call(_document$fonts2, "loadingdone", function(e) {
        console.log("[fonts] loading done", e);
      });
      (_document$fonts3 = document.fonts) === null || _document$fonts3 === void 0 || (_document$fonts3$addE = _document$fonts3.addEventListener) === null || _document$fonts3$addE === void 0 || _document$fonts3$addE.call(_document$fonts3, "loadingerror", function(e) {
        return console.warn("[fonts] error", e);
      });
      var rendered = renderTemplate(data2);
      if (!rendered) {
        templateScripts();
      }
    }
    document.addEventListener("DOMContentLoaded", function(event) {
      ensureFontsReady(function() {
        console.log("Betöltődtek a fontok! 1");
        init(data);
      }, 50);
    });
    window.__PROCESSING_DONE__ = true;
  }
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
  return addPodScripts;
})();
//# sourceMappingURL=pod.bundle.js.map
