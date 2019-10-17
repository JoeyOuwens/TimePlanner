module.exports = {
    zipcode: function (str) {
        if (str.length != 6) {
            return false
        } else if (isZipcodeFormat(str)) {
            return true
        } else {
            return false
        }
    },

    telephone: function (str) {
        if (containsAlpha(str)) {
            return false
        } else {
            return true
        }
    },

    birthdate: function (str) {
        if (str.length != 10) {
            return false
        } else if (isBirthDateFormat(str)) {
            return true
        } else {
            return false
        }
    },

    rights: function (str) {
        if (str == "MANAGER" || str == "USER") {
            return true
        } else {
            return false
        }
    },

    hours: function (str) {
        return isNumeric(str)
    },

    email: function (str) {
        return isEmailAddress(str)
    },

    firstName: function (str) {
        return isAlphaWithSpaces(str)
    },

    lastName: function (str) {
        return isLastName(str)
    },

    middleName: function (str) {
        if (str != "") {
            return isAlphaWithSpaces(str)
        }
        else {
            return true
        }
    },


    place: function (str) {
        return isAlphaWithSpaces(str)
    },


    address: function (str) {
        return isAddress(str)
    }
};

function containsAlpha(str) {
    return /^[a-zA-Z]+/.test(str);
}

function isLastName(str) {
    return /^[a-zA-Z- ]+$/.test(str);
}

function isAddress(str) {
    return /^([a-zA-Z -]+)(\ {1})([0-9]+)([a-zA-Z]*)$/.test(str);
}

function isAlphaWithSpaces(str) {
    return /^[a-zA-Z ]+$/.test(str);
}

function isAlphaNoSpaces(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function isNumeric(str) {
    return /^\d*$/.test(str);
}

function removeSpaces(str) {
    return str.replace(/\s/g, '');
}

//1234AA
function isZipcodeFormat(str) {
    return /^\d{4}[a-zA-Z]{2}$/.test(str);
}

//YYYY-MM-DD
function isBirthDateFormat(str) {
    return /^\d{4}(\-)([0][0-9]|[1][0-2])(\-)([0-2][0-9]|[3][0-1]$)/.test(str)
}


//https://emailregex.com/
function isEmailAddress(str) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
}