import logInfo from "./log-info";

const handleSeparators = () => {

    logInfo("HANDLING SEPARATORS");

    const results = Array.from(document.querySelectorAll('[class*="separator-["]'))
        .map(el => {
            const m = el.className.match(/separator-\[([^\]]+)\]/);
            return m ? { element: el, value: m[1] } : null;
        })
        .filter(Boolean);

    results.forEach(({ element, value }) => {
        console.log(`Element:`, element, ` → value:`, value);
    });

    const separatorNodeList = document.querySelectorAll(".separator");
    const separators = Array.from(separatorNodeList);

    separators.map((separator) => {
        const next = separator.nextElementSibling;
        const prev = separator.previousElementSibling;

        let nextInNewLine = false;
        let prevInNewLine = false;

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
            console.log("VISIBILIITY HIDDEN");
            separator.style.visibility = "hidden";
        } else {
            console.log("VISIBILIITY VISIBLE");
            separator.style.visibility = "visible";
        }

        if (prevInNewLine) {
            console.log("DISPLAY NONE");
            separator.style.display = "none";
        } else {
            console.log("DISPLAY INLINE-BLOCK");
            separator.style.display = "inline";
        }

    });
};

const getYCoordinate = (element) => {
    return element.getBoundingClientRect().top;
};

export default handleSeparators;
