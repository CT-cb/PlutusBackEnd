

// function to check if an incoming new expense has the right attributes
const hasCorrectAttributes = function (obj) {
    if (obj == null) {
        return false;
    }

    if (Object.getPrototypeOf(obj) != Object.prototype) {
        return false;
    }

    let attribs = [
        "user",
        "type",
        "amount",
        "currency",
        "incomeDate",
    ];

    for (let i = 0; i < attribs.length; i++) {
        let attrib = attribs[i];
        if (obj[attrib] == undefined) {
            return false;
        }
    }

    return true;
}

module.exports = { hasCorrectAttributes }