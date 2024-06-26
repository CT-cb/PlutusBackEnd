const GlobalHelpers = require('./global-helpers');

// function to check if an incoming new limit has the right attributes
const hasCorrectAttributes = function (obj) {
    if (obj == null) {
        return false;
    }

    if (Object.getPrototypeOf(obj) != Object.prototype) {
        return false;
    }

    let attribs = [
        "email",
        "timeDivision",
        "maxLimit"
    ];

    for (let i = 0; i < attribs.length; i++) {
        let attrib = attribs[i];
        if (obj[attrib] == undefined) {
            return false;
        }
    }

    return true;
}


module.exports = { 
    hasCorrectAttributes
}