import logInfo from "./logInfo";
// const runsInPrince = (typeof Prince !== "undefined");
const runsInPrince = false;

const handleSeparators = () => {

    logInfo("HANDLING SEPARATORS 02 - 101");

    const separatorNodeList = document.querySelectorAll(".separator");
    const separators = Array.from(separatorNodeList);

    logInfo("SEPARATORS", separators.length);

    separators.map((separator) => {
        const next = separator.nextElementSibling;
        if (next) {
            logInfo("NEXT", next);
            logInfo("getYCoordinate(separator)", getYCoordinate(separator));
            logInfo("getYCoordinate(next)", getYCoordinate(next));
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
    if (runsInPrince) {
        return element.getPrinceBoxes()[0].y;
    } else {
        return element.getBoundingClientRect().top;
    }
};

export default handleSeparators;
