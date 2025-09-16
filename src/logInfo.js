const runsInPrince = false;
// const runsInPrince = (typeof Prince !== "undefined");

function logInfo (info) {
    if (runsInPrince) {
        Prince.Log.info(info);
    } else {
        console.log(info);
    }
}

export default logInfo;