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
      var textNodes = getAllTextNodes$1(element);
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
  function getAllTextNodes$1(root) {
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
  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
        t && (r = t);
        var n = 0, F = function() {
        };
        return {
          s: F,
          n: function() {
            return n >= r.length ? {
              done: true
            } : {
              done: false,
              value: r[n++]
            };
          },
          e: function(r2) {
            throw r2;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o, a = true, u = false;
    return {
      s: function() {
        t = t.call(r);
      },
      n: function() {
        var r2 = t.next();
        return a = r2.done, r2;
      },
      e: function(r2) {
        u = true, o = r2;
      },
      f: function() {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }
  function getElementBoxWidth(el) {
    var computedStyle = window.getComputedStyle(el);
    var computedMaxWidth = computedStyle.getPropertyValue("maxWidth");
    var computedWhiteSpace = computedStyle.getPropertyValue("whiteSpace");
    el.style.maxWidth = "";
    el.style.whiteSpace = "nowrap";
    var boxWidth = convertToPt(el.getBoundingClientRect().width + "px");
    el.style.maxWidth = computedMaxWidth;
    el.style.whiteSpace = computedWhiteSpace;
    return boxWidth;
  }
  function getTextNodeLineCount(textNode) {
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return 0;
    var range = document.createRange();
    range.selectNodeContents(textNode);
    var rects = range.getClientRects();
    return rects.length;
  }
  function getAllTextNodes(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var out = [];
    var n;
    while (n = walker.nextNode()) {
      if (n.nodeValue && n.nodeValue.trim().length) out.push(n);
    }
    return out;
  }
  function getRenderedLineCountForNode(node) {
    var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$epsilon = _ref.epsilon, epsilon = _ref$epsilon === void 0 ? 0.5 : _ref$epsilon;
    if (!node) return 0;
    var rects = [];
    var _iterator = _createForOfIteratorHelper(getAllTextNodes(node)), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var tn = _step.value;
        var range = document.createRange();
        range.selectNodeContents(tn);
        var rlist = range.getClientRects();
        for (var i = 0; i < rlist.length; i++) {
          var _r = rlist[i];
          if (_r.width > 0 && _r.height > 0) {
            rects.push({
              top: _r.top,
              bottom: _r.bottom,
              left: _r.left,
              right: _r.right,
              height: _r.height
            });
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (rects.length === 0) return 0;
    rects.sort(function(a, b) {
      return a.top - b.top;
    });
    var lines = 0;
    var currentTop = rects[0].top;
    for (var _i = 0, _rects = rects; _i < _rects.length; _i++) {
      var r = _rects[_i];
      if (Math.abs(r.top - currentTop) > epsilon) {
        lines++;
        currentTop = r.top;
      }
    }
    return lines + 1;
  }
  var elementsToSqueeze = [];
  function calculateSqueezedFontSize(maxFontSizePt, maxWidthPt, actualWidthPt, actualFontSizePt) {
    var scale = maxWidthPt / actualWidthPt;
    var newFontSizePt = parseFloat(actualFontSizePt) * scale;
    return Math.min(newFontSizePt, maxFontSizePt);
  }
  function squeeze(s) {
    var rowCount = getRenderedLineCountForNode(s.element);
    if (rowCount <= s.maxRows && s.maxRows > 1) {
      return;
    }
    if (s.maxRows > 1) {
      fitTextToMaxRows(s.element.childNodes[0], s.maxRows, {
        minFontSize: s.minFontSizePt
      });
      return;
    }
    var actualFontSize = convertToPt(window.getComputedStyle(s.element).fontSize);
    var actualWidthPt = getElementBoxWidth(s.element);
    var newFontSizePt = calculateSqueezedFontSize(s.maxFontSizePt, s.maxWidthPt, actualWidthPt, actualFontSize);
    newFontSizePt = Math.max(newFontSizePt, s.minFontSizePt);
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
  function prepareElements() {
    var elements = getElementsToSqueeze();
    elements.map(function(element, index) {
      var _classArray$find, _classArray$find2, _classArray$find3;
      var maxWidth = window.getComputedStyle(element).maxWidth;
      var maxFontSize = window.getComputedStyle(element).fontSize;
      if (!maxWidth || !maxFontSize || maxWidth === "none" || maxFontSize === "none") {
        return;
      }
      var classArray = Array.from(element.classList);
      var maxMatch = (_classArray$find = classArray.find(function(c) {
        return c.startsWith("max-font-size-");
      })) === null || _classArray$find === void 0 ? void 0 : _classArray$find.match(/^max-font-size-\[([^\]]+)\]$/);
      var maxFontSizePt = maxMatch ? convertToPt(maxMatch[1]) : convertToPt(maxFontSize);
      var minMatch = (_classArray$find2 = classArray.find(function(c) {
        return c.startsWith("min-font-size-");
      })) === null || _classArray$find2 === void 0 ? void 0 : _classArray$find2.match(/^min-font-size-\[([^\]]+)\]$/);
      var minFontSizePt = minMatch ? convertToPt(minMatch[1]) : null;
      var maxRowsMatch = (_classArray$find3 = classArray.find(function(c) {
        return c.startsWith("max-rows-");
      })) === null || _classArray$find3 === void 0 ? void 0 : _classArray$find3.match(/^max-rows-\[([^\]]+)\]$/);
      var maxRows = maxRowsMatch ? maxRowsMatch[1] : 1;
      var maxWidthPt = convertToPt(maxWidth);
      elementsToSqueeze[index] = {
        element: elements[index],
        maxWidthPt: maxWidthPt,
        maxFontSizePt: maxFontSizePt,
        minFontSizePt: minFontSizePt,
        maxRows: maxRows
      };
      element.style.display = "inline-block";
      element.style.flex = "0 0 auto";
      element.style.alignSelf = "flex-start";
    });
  }
  function fitTextToMaxRows(textNode, maxRowCount) {
    var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, _ref$minFontSize = _ref.minFontSize, minFontSize = _ref$minFontSize === void 0 ? 6 : _ref$minFontSize, _ref$step = _ref.step, step = _ref$step === void 0 ? 0.5 : _ref$step, _ref$maxIter = _ref.maxIter, maxIter = _ref$maxIter === void 0 ? 50 : _ref$maxIter;
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;
    var parent = textNode.parentElement;
    if (!parent) return;
    var style = window.getComputedStyle(parent);
    var currentFontSizePt = convertToPt("".concat(parseFloat(style.fontSize), "px"));
    var iter = 0;
    while (iter < maxIter) {
      var rowCount = getTextNodeLineCount(textNode);
      if (rowCount <= maxRowCount) break;
      currentFontSizePt = Math.max(currentFontSizePt - step, minFontSize);
      parent.style.fontSize = "".concat(currentFontSizePt, "pt");
      iter++;
    }
    console.log(iter);
  }
  var elementsToSqueezeSpacing = [];
  function calculateSqueezedLetterSpacing(element, maxWidthPt) {
    var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, _ref$pxToPt = _ref.pxToPt, pxToPt = _ref$pxToPt === void 0 ? 0.74999943307122 : _ref$pxToPt, _ref$epsilonPt = _ref.epsilonPt, epsilonPt = _ref$epsilonPt === void 0 ? 0.05 : _ref$epsilonPt, _ref$maxIter = _ref.maxIter, maxIter = _ref$maxIter === void 0 ? 20 : _ref$maxIter, _ref$minLSpt = _ref.minLSpt, minLSpt = _ref$minLSpt === void 0 ? -5 : _ref$minLSpt, _ref$maxLSpt = _ref.maxLSpt, maxLSpt = _ref$maxLSpt === void 0 ? 20 : _ref$maxLSpt;
    var toPt = function toPt2(px) {
      return px * pxToPt;
    };
    var toPx = function toPx2(pt) {
      return pt / pxToPt;
    };
    var targetPt = maxWidthPt * 1;
    var text = element.textContent || "";
    var gaps = Math.max(0, text.length - 1);
    if (gaps === 0) {
      return parseFloat(getComputedStyle(element).letterSpacing) * pxToPt || 0;
    }
    var currentLSpx = parseFloat(getComputedStyle(element).letterSpacing);
    if (Number.isNaN(currentLSpx)) currentLSpx = 0;
    var currentLSPt = toPt(currentLSpx);
    var currentWidthPt = getElementBoxWidth(element);
    var guessPt = currentLSPt;
    if (gaps > 0) {
      var extraPerGapPt = (targetPt - currentWidthPt) / gaps;
      guessPt = currentLSPt + extraPerGapPt;
    }
    guessPt = Math.max(minLSpt, Math.min(maxLSpt, guessPt));
    element.style.letterSpacing = toPx(guessPt) + "px";
    var wPt = getElementBoxWidth(element);
    if (Math.abs(wPt - targetPt) <= epsilonPt) {
      return guessPt;
    }
    var loPt, hiPt;
    if (wPt < targetPt) {
      loPt = guessPt;
      hiPt = maxLSpt;
    } else {
      loPt = minLSpt;
      hiPt = guessPt;
    }
    for (var i = 0; i < maxIter; i++) {
      var midPt = (loPt + hiPt) / 2;
      element.style.letterSpacing = toPx(midPt) + "px";
      wPt = getElementBoxWidth(element);
      var diff = wPt - targetPt;
      if (Math.abs(diff) <= epsilonPt) {
        guessPt = midPt;
        break;
      }
      if (diff < 0) loPt = midPt;
      else hiPt = midPt;
      guessPt = midPt;
    }
    return guessPt;
  }
  function squeezeLetterSpacing(s) {
    var rowCount = getTextNodeLineCount(s.element.childNodes[0]);
    if (rowCount <= s.maxRows && s.maxRows > 1) {
      return;
    }
    if (s.maxRows > 1) {
      fitLetterSpacingToMaxRows(s.element.childNodes[0], s.maxRows, {
        minSpacing: s.minLetterSpacingPt
      });
      return;
    }
    var newLetterSpacingPt = calculateSqueezedLetterSpacing(
      s.element,
      s.maxWidthPt
      // getElementBoxWidth(s.element),
      // originalLetterSpacing
    );
    var finalLetterSpacingPt = Math.max(Math.min(newLetterSpacingPt, s.maxLetterSpacingPt), s.minLetterSpacingPt);
    s.element.style.letterSpacing = finalLetterSpacingPt.toString() + "pt";
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
  function prepareElementsForLetterSpacing() {
    var elements = getElementsToSqueezeLetterSpacing();
    elements.map(function(element, index) {
      var _classArray$find, _classArray$find2, _classArray$find3;
      var maxWidth = window.getComputedStyle(element).maxWidth;
      if (!maxWidth || maxWidth === "none") {
        return;
      }
      var maxWidthPt = convertToPt(maxWidth);
      var classArray = Array.from(element.classList);
      var maxMatch = (_classArray$find = classArray.find(function(c) {
        return c.startsWith("max-letter-spacing-");
      })) === null || _classArray$find === void 0 ? void 0 : _classArray$find.match(/^max-letter-spacing-\[([^\]]+)\]$/);
      var maxLetterSpacingPt = maxMatch ? convertToPt(maxMatch[1]) : null;
      var minMatch = (_classArray$find2 = classArray.find(function(c) {
        return c.startsWith("min-letter-spacing-");
      })) === null || _classArray$find2 === void 0 ? void 0 : _classArray$find2.match(/^min-letter-spacing-\[([^\]]+)\]$/);
      var minLetterSpacingPt = minMatch ? convertToPt(minMatch[1]) : null;
      var maxRowsMatch = (_classArray$find3 = classArray.find(function(c) {
        return c.startsWith("max-rows-");
      })) === null || _classArray$find3 === void 0 ? void 0 : _classArray$find3.match(/^max-rows-\[([^\]]+)\]$/);
      var maxRows = maxRowsMatch ? maxRowsMatch[1] : 1;
      elementsToSqueezeSpacing[index] = {
        element: elements[index],
        maxWidthPt: maxWidthPt,
        maxLetterSpacingPt: maxLetterSpacingPt,
        minLetterSpacingPt: minLetterSpacingPt,
        maxRows: maxRows
      };
      element.style.display = "inline-block";
      element.style.flex = "0 0 auto";
      element.style.alignSelf = "flex-start";
    });
  }
  function fitLetterSpacingToMaxRows(textNode, maxRows) {
    var _ref2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, _ref2$minSpacing = _ref2.minSpacing, minSpacing = _ref2$minSpacing === void 0 ? -5 : _ref2$minSpacing, _ref2$step = _ref2.step, step = _ref2$step === void 0 ? 0.2 : _ref2$step, _ref2$maxIter = _ref2.maxIter, maxIter = _ref2$maxIter === void 0 ? 50 : _ref2$maxIter;
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;
    var parent = textNode.parentElement;
    if (!parent) return;
    var style = window.getComputedStyle(parent);
    var currentSpacingPt = convertToPt("".concat(parseFloat(style.letterSpacing) || 0, "px"));
    var iter = 0;
    while (iter < maxIter) {
      var rowCount = getTextNodeLineCount(textNode);
      if (rowCount <= maxRows) break;
      currentSpacingPt = Math.max(currentSpacingPt - step, minSpacing);
      parent.style.letterSpacing = "".concat(currentSpacingPt, "pt");
      iter++;
    }
    return currentSpacingPt;
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
      if (!maxWidth || !maxFontSize || maxWidth === "none" || maxFontSize === "none") {
        return;
      }
      var maxWidthPt = convertToPt(maxWidth);
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
    });
  }
  function calculateSqueezedScale(element, maxWidthPt) {
    var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, _ref$pxToPt = _ref.pxToPt, pxToPt = _ref$pxToPt === void 0 ? 0.74999943307122 : _ref$pxToPt, _ref$axis = _ref.axis, axis = _ref$axis === void 0 ? "x" : _ref$axis, _ref$minScale = _ref.minScale, minScale = _ref$minScale === void 0 ? 0.2 : _ref$minScale, _ref$maxScale = _ref.maxScale, maxScale = _ref$maxScale === void 0 ? 5 : _ref$maxScale, _ref$epsilon = _ref.epsilon, epsilon = _ref$epsilon === void 0 ? 0.05 : _ref$epsilon, _ref$maxIter = _ref.maxIter, maxIter = _ref$maxIter === void 0 ? 5 : _ref$maxIter, _ref$setOrigin = _ref.setOrigin, setOrigin = _ref$setOrigin === void 0 ? true : _ref$setOrigin;
    var toPt = function toPt2(px) {
      return px * pxToPt;
    };
    var toPx = function toPx2(pt) {
      return pt / pxToPt;
    };
    var targetPx = toPx(maxWidthPt);
    var prevTransform = element.style.transform || "";
    var prevOrigin = element.style.transformOrigin || "";
    element.style.transform = "none";
    if (setOrigin) element.style.transformOrigin = "left center";
    var baseWidthPx = element.getBoundingClientRect().width || 0;
    if (baseWidthPx <= 0) {
      element.style.transform = prevTransform;
      element.style.transformOrigin = prevOrigin;
      return 1;
    }
    var sx = clamp(targetPx / baseWidthPx, minScale, maxScale);
    var sy = axis === "uniform" ? sx : 1;
    element.style.transform = "scale(".concat(sx, ", ").concat(sy, ")").trim();
    for (var i = 0; i < maxIter; i++) {
      var w = element.getBoundingClientRect().width;
      var diffPx = targetPx - w;
      if (Math.abs(toPt(diffPx)) <= epsilon) break;
      var factor = targetPx / (w || 1);
      sx = clamp(sx * factor, minScale, maxScale);
      sy = axis === "uniform" ? sx : 1;
      element.style.transform = "scale(".concat(sx, ", ").concat(sy, ")").trim();
    }
    if (!setOrigin) element.style.transformOrigin = prevOrigin;
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
  function runSqueeze() {
    console.log("SQUEEZING");
    prepareElements();
    prepareElementsForLetterSpacing();
    prepareElementsForScaling();
    squeezeAll();
    squeezeAllLetterSpacing();
    squeezeAllScaling();
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
