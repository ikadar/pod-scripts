import logInfo from "./log-info";

const handleSeparators = () => {

    logInfo("HANDLING SEPARATORS");

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
