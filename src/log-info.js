const indentIncrement = 4;
var indent = 0;
const debug = true;

function logInfo (info) {
    if (debug) {
        console.log("|" + getIndentation() + info);
    }
}

function getIndentation () {
    var indentation = "";
    for (var i=0; i<indent; i++) {
        indentation = indentation + " ";
    }

    return indentation;
}

function increaseIndentation () {
    indent += indentIncrement;
}

function decreaseIndentation () {
    indent -= indentIncrement;
}

export default logInfo;
export { increaseIndentation, decreaseIndentation };