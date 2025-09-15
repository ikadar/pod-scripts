const runsInPrince = (typeof Prince !== "undefined");

const handleSeparators = () => {

    console.log("HANDLING SEPARATORS 02 - 100");

    const separatorNodeList = document.querySelectorAll(".separator");
    const separators = Array.from(separatorNodeList);

    separators.map((separator) => {
        const next = separator.nextElementSibling;
        if (next) {
            if (getYCoordinate(separator) !== getYCoordinate(next)) {
                console.log("HIDE SEPARATOR");
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
