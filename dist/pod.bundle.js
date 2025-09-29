this.Pod = (function() {
  "use strict";
  function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
      var i = n[a](c), u = i.value;
    } catch (n2) {
      return void e(n2);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
  }
  function _asyncToGenerator(n) {
    return function() {
      var t = this, e = arguments;
      return new Promise(function(r, o) {
        var a = n.apply(t, e);
        function _next(n2) {
          asyncGeneratorStep(a, r, o, _next, _throw, "next", n2);
        }
        function _throw(n2) {
          asyncGeneratorStep(a, r, o, _next, _throw, "throw", n2);
        }
        _next(void 0);
      });
    };
  }
  function _regenerator() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
    var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
    function i(r2, n2, o2, i2) {
      var c2 = n2 && n2.prototype instanceof Generator ? n2 : Generator, u2 = Object.create(c2.prototype);
      return _regeneratorDefine(u2, "_invoke", (function(r3, n3, o3) {
        var i3, c3, u3, f2 = 0, p = o3 || [], y = false, G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function(t2, r4) {
            return i3 = t2, c3 = 0, u3 = e, G.n = r4, a;
          }
        };
        function d(r4, n4) {
          for (c3 = r4, u3 = n4, t = 0; !y && f2 && !o4 && t < p.length; t++) {
            var o4, i4 = p[t], d2 = G.p, l = i4[2];
            r4 > 3 ? (o4 = l === n4) && (u3 = i4[(c3 = i4[4]) ? 5 : (c3 = 3, 3)], i4[4] = i4[5] = e) : i4[0] <= d2 && ((o4 = r4 < 2 && d2 < i4[1]) ? (c3 = 0, G.v = n4, G.n = i4[1]) : d2 < l && (o4 = r4 < 3 || i4[0] > n4 || n4 > l) && (i4[4] = r4, i4[5] = n4, G.n = l, c3 = 0));
          }
          if (o4 || r4 > 1) return a;
          throw y = true, n4;
        }
        return function(o4, p2, l) {
          if (f2 > 1) throw TypeError("Generator is already running");
          for (y && 1 === p2 && d(p2, l), c3 = p2, u3 = l; (t = c3 < 2 ? e : u3) || !y; ) {
            i3 || (c3 ? c3 < 3 ? (c3 > 1 && (G.n = -1), d(c3, u3)) : G.n = u3 : G.v = u3);
            try {
              if (f2 = 2, i3) {
                if (c3 || (o4 = "next"), t = i3[o4]) {
                  if (!(t = t.call(i3, u3))) throw TypeError("iterator result is not an object");
                  if (!t.done) return t;
                  u3 = t.value, c3 < 2 && (c3 = 0);
                } else 1 === c3 && (t = i3.return) && t.call(i3), c3 < 2 && (u3 = TypeError("The iterator does not provide a '" + o4 + "' method"), c3 = 1);
                i3 = e;
              } else if ((t = (y = G.n < 0) ? u3 : r3.call(n3, G)) !== a) break;
            } catch (t2) {
              i3 = e, c3 = 1, u3 = t2;
            } finally {
              f2 = 1;
            }
          }
          return {
            value: t,
            done: y
          };
        };
      })(r2, o2, i2), true), u2;
    }
    var a = {};
    function Generator() {
    }
    function GeneratorFunction() {
    }
    function GeneratorFunctionPrototype() {
    }
    t = Object.getPrototypeOf;
    var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function() {
      return this;
    }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
    function f(e2) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e2, GeneratorFunctionPrototype) : (e2.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e2, o, "GeneratorFunction")), e2.prototype = Object.create(u), e2;
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function() {
      return this;
    }), _regeneratorDefine(u, "toString", function() {
      return "[object Generator]";
    }), (_regenerator = function() {
      return {
        w: i,
        m: f
      };
    })();
  }
  function _regeneratorDefine(e, r, n, t) {
    var i = Object.defineProperty;
    try {
      i({}, "", {});
    } catch (e2) {
      i = 0;
    }
    _regeneratorDefine = function(e2, r2, n2, t2) {
      function o(r3, n3) {
        _regeneratorDefine(e2, r3, function(e3) {
          return this._invoke(r3, n3, e3);
        });
      }
      r2 ? i ? i(e2, r2, {
        value: n2,
        enumerable: !t2,
        configurable: !t2,
        writable: !t2
      }) : e2[r2] = n2 : (o("next", 0), o("throw", 1), o("return", 2));
    }, _regeneratorDefine(e, r, n, t);
  }
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
    var _document$fonts, _document$fonts$addEv, _document$fonts2, _document$fonts2$addE, _document$fonts3, _document$fonts3$addE, _document$fonts4;
    (_document$fonts = document.fonts) === null || _document$fonts === void 0 || (_document$fonts$addEv = _document$fonts.addEventListener) === null || _document$fonts$addEv === void 0 || _document$fonts$addEv.call(_document$fonts, "loading", function() {
      console.log("[fonts] loading… status=", document.fonts.status);
    });
    (_document$fonts2 = document.fonts) === null || _document$fonts2 === void 0 || (_document$fonts2$addE = _document$fonts2.addEventListener) === null || _document$fonts2$addE === void 0 || _document$fonts2$addE.call(_document$fonts2, "loadingdone", function(e) {
      var _e$fontfaces;
      console.log("[fonts] DONE. Faces:");
      (_e$fontfaces = e.fontfaces) === null || _e$fontfaces === void 0 || _e$fontfaces.forEach(function(ff) {
        console.log("  family:", ff.family, "style:", ff.style, "weight:", ff.weight, "stretch:", ff.stretch, "status:", ff.status);
      });
    });
    (_document$fonts3 = document.fonts) === null || _document$fonts3 === void 0 || (_document$fonts3$addE = _document$fonts3.addEventListener) === null || _document$fonts3$addE === void 0 || _document$fonts3$addE.call(_document$fonts3, "loadingerror", function(e) {
      console.warn("[fonts] ERROR. Faces:", e.fontfaces);
    });
    if ((_document$fonts4 = document.fonts) !== null && _document$fonts4 !== void 0 && _document$fonts4.load) {
      var _origLoad = document.fonts.load.bind(document.fonts);
      document.fonts.load = function(descriptor, test) {
        console.log("[fonts.load] called:", descriptor, "test:", test);
        var p = _origLoad(descriptor, test);
        p.then(function() {
          return console.log("[fonts.load] resolved:", descriptor);
        }).catch(function(err) {
          return console.warn("[fonts.load] error:", descriptor, err);
        });
        return p;
      };
    }
    function waitFontsForElement(_x) {
      return _waitFontsForElement.apply(this, arguments);
    }
    function _waitFontsForElement() {
      _waitFontsForElement = _asyncToGenerator(/* @__PURE__ */ _regenerator().m(function _callee2(el) {
        var _document$fonts8, _document$fonts8$chec, _document$fonts9, _document$fonts9$load;
        var test, cs, desc, _args2 = arguments;
        return _regenerator().w(function(_context2) {
          while (1) switch (_context2.n) {
            case 0:
              test = _args2.length > 1 && _args2[1] !== void 0 ? _args2[1] : "A";
              cs = getComputedStyle(el);
              desc = "".concat(cs.fontStyle, " ").concat(cs.fontWeight, " ").concat(cs.fontStretch || "normal", " ").concat(cs.fontSize, " ").concat(cs.fontFamily);
              console.log("[fonts.check]", desc, "=>", (_document$fonts8 = document.fonts) === null || _document$fonts8 === void 0 || (_document$fonts8$chec = _document$fonts8.check) === null || _document$fonts8$chec === void 0 ? void 0 : _document$fonts8$chec.call(_document$fonts8, desc));
              _context2.n = 1;
              return (_document$fonts9 = document.fonts) === null || _document$fonts9 === void 0 || (_document$fonts9$load = _document$fonts9.load) === null || _document$fonts9$load === void 0 ? void 0 : _document$fonts9$load.call(_document$fonts9, desc, test);
            case 1:
              return _context2.a(2);
          }
        }, _callee2);
      }));
      return _waitFontsForElement.apply(this, arguments);
    }
    function init(data2) {
      var _document$fonts5, _document$fonts5$addE, _document$fonts6, _document$fonts6$addE, _document$fonts7, _document$fonts7$addE;
      setTemplateScripts(templateScripts);
      addPostMessageHandler();
      (_document$fonts5 = document.fonts) === null || _document$fonts5 === void 0 || (_document$fonts5$addE = _document$fonts5.addEventListener) === null || _document$fonts5$addE === void 0 || _document$fonts5$addE.call(_document$fonts5, "loading", function(e) {
        console.log("[fonts] loading…", e);
      });
      (_document$fonts6 = document.fonts) === null || _document$fonts6 === void 0 || (_document$fonts6$addE = _document$fonts6.addEventListener) === null || _document$fonts6$addE === void 0 || _document$fonts6$addE.call(_document$fonts6, "loadingdone", function(e) {
        console.log("[fonts] loading done", e);
      });
      (_document$fonts7 = document.fonts) === null || _document$fonts7 === void 0 || (_document$fonts7$addE = _document$fonts7.addEventListener) === null || _document$fonts7$addE === void 0 || _document$fonts7$addE.call(_document$fonts7, "loadingerror", function(e) {
        return console.warn("[fonts] error", e);
      });
      var rendered = renderTemplate(data2);
      if (!rendered) {
        templateScripts();
      }
    }
    document.addEventListener("DOMContentLoaded", /* @__PURE__ */ (function() {
      var _ref = _asyncToGenerator(/* @__PURE__ */ _regenerator().m(function _callee(event) {
        return _regenerator().w(function(_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return waitFontsForElement(yourElement);
            case 1:
              ensureFontsReady(function() {
                console.log("Betöltődtek a fontok! 1");
                init(data);
              }, 50);
            case 2:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function(_x2) {
        return _ref.apply(this, arguments);
      };
    })());
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
