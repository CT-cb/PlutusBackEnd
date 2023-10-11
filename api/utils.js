export{
    isString,
    isNumber,
    isDate
}

const isString = function(assumed_string){
    if (assumed_string == null) return false;
    return typeof(assumed_string) == typeof(String());
}

const isNumber = function(assumed_number){
    if (assumed_number == null) return false;
    return Number.isSafeInteger(assumed_number);
}

const isDate = function(assumed_date){
    if (assumed_date == null) return false;
    return Object.getPrototypeOf(assumed_date) == Date.prototype;
}