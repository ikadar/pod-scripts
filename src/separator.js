import logInfo from "./logInfo";

const handleSeparators = () => {

    logInfo("HANDLING SEPARATORS 02 - 101");

    const separatorNodeList = document.querySelectorAll(".separator");
    const separators = Array.from(separatorNodeList);

    logInfo("SEPARATORS", separators.length);

    separators.map((separator) => {
        const next = separator.nextElementSibling;
        const prev = separator.previousElementSibling;

        let nextInNewLine = false;
        let prevInNewLine = false;

        if (next) {
            logInfo("NEXT", next);
            if (getYCoordinate(separator) !== getYCoordinate(next)) {
                logInfo("HIDE SEPARATOR");
                nextInNewLine = true;
                // separator.style.visibility = "hidden";
            // } else {
            //     separator.style.visibility = "visible";
            }
        }

        if (prev) {
            logInfo("PREV", prev);
            if (getYCoordinate(separator) !== getYCoordinate(prev)) {
                logInfo("HIDE SEPARATOR");
                prevInNewLine = true;
                // separator.style.visibility = "hidden";
            // } else {
            //     separator.style.visibility = "visible";
            }
        }

        if (nextInNewLine || prevInNewLine) {
            separator.style.visibility = "hidden";
        } else {
            separator.style.visibility = "visible";
        }

    });
};

const getYCoordinate = (element) => {
    return element.getBoundingClientRect().top;
};

export default handleSeparators;
