import logInfo from "./logInfo";

const handleSeparators = () => {

    logInfo("HANDLING SEPARATORS 02 - 101");

    const separatorNodeList = document.querySelectorAll(".separator");
    const separators = Array.from(separatorNodeList);

    logInfo("SEPARATORS", separators.length);

    separators.map((separator) => {
        const next = separator.nextElementSibling;
        if (next) {
            logInfo("NEXT", next);
            if (getYCoordinate(separator) !== getYCoordinate(next)) {
                logInfo("HIDE SEPARATOR");
                separator.style.visibility = "hidden";
            } else {
                separator.style.visibility = "visible";
            }
        }
    });
};

const getYCoordinate = (element) => {
    return element.getBoundingClientRect().top;
};

export default handleSeparators;
