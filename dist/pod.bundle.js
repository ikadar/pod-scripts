this.Pod = (function() {
  "use strict";
  var runsInPrince = typeof Prince !== "undefined";
  var handleSeparators = function handleSeparators2() {
    console.log("HANDLING SEPARATORS 02");
    var separatorNodeList = document.querySelectorAll(".separator");
    var separators = Array.from(separatorNodeList);
    separators.map(function(separator) {
      var next = separator.nextElementSibling;
      if (next) {
        if (getYCoordinate(separator) !== getYCoordinate(next)) {
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
  function runPodScripts() {
    console.log("TEST01");
    document.addEventListener("DOMContentLoaded", function() {
      function init() {
        var runsInPrince2 = typeof Prince !== "undefined";
        console.log("TEST02");
        if (runsInPrince2) {
          Prince.Log.info("POD_PRINCE");
          console.log("TEST03");
          Prince.trackBoxes = true;
          Prince.registerPostLayoutFunc(function() {
            handleSeparators();
          });
        }
      }
      setTimeout(init, 5e3);
    });
  }
  return runPodScripts;
})();
//# sourceMappingURL=pod.bundle.js.map
