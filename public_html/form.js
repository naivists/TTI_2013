//a shorthand for finding items in document faster
var $ = function(id) {
    return document.getElementById(id);
};

window.onload = function() {

    //we set instant checks on some fields.
    setInstantlyRequired("person-name");
    setInstantlyRequired("person-surname");
    setInstantlyRequired("travel-days");
    setInstantlyRequired("travel-begin");

    setInstantlyNumeric("travel-days");
    setInstantlyFormat("travel-begin", /^\d{2}\.\d{2}\.\d{4}$/);

    //while others, such as radio buttons and option buttons cannot 
    //be checked dynamically. 
    $("mainForm").onsubmit = validateFormSubmit;
};

function setInstantlyRequired(fieldId) {
    var obj = $(fieldId);
    addListener(obj, "blur", validateInstantlyRequired);
    addListener(obj, "change", validateInstantlyRequired);
    addListener(obj, "keyup", validateInstantlyRequired);
}

function setInstantlyNumeric(fieldId) {
    var obj = $(fieldId);
    addListener(obj, "blur", validateInstantlyNumeric);
    addListener(obj, "change", validateInstantlyNumeric);
    addListener(obj, "keyup", validateInstantlyNumeric);
}

function setInstantlyFormat(fieldId, expression) {
    var obj = $(fieldId);
    obj["data-validationexpression"] = expression; //save it here, use from the validation function
    addListener(obj, "blur", validateInstantlyFormat);
    addListener(obj, "change", validateInstantlyFormat);
    addListener(obj, "keyup", validateInstantlyFormat);
}

function validateInstantlyRequired(eventInfo) {
    var event, targetObject, i, explanations, explanationState;
    //IE has different naming, sorry
    event = eventInfo || window.event;
    targetObject = event.target || event.srcElement;


    if (targetObject.value.trim() === "") { //this is the actual validation!
        toggleError(targetObject, "required", true);
    } else {
        toggleError(targetObject, "required", false);
    }
}

function validateInstantlyNumeric(eventInfo) {
    var event, targetObject, i, explanations, explanationState;
    //IE has different naming, sorry
    event = eventInfo || window.event;
    targetObject = event.target || event.srcElement;


    if (isNaN(targetObject.value)) { //this is the actual validation!
        toggleError(targetObject, "numeric", true);
    } else {
        toggleError(targetObject, "numeric", false);
    }
}

function validateInstantlyFormat(eventInfo) {
    var event, targetObject, i, explanations, explanationState;
    //IE has different naming, sorry
    event = eventInfo || window.event;
    targetObject = event.target || event.srcElement;


    if (!targetObject.value.match(targetObject["data-validationexpression"])) { //this is the actual validation!
        toggleError(targetObject, "format", true);
    } else {
        toggleError(targetObject, "format", false);
    }
}



function validateFormSubmit() {

    //poga nospiesta, apstaigā visus lauciņus 
    //pēta to vērtības
    var i, errors;
    errors = [];

    var personName = $("person-name");
    if ((personName.value.trim() === "")) {
        errors.push("Please, fill out your name");
        toggleError(personName, "required", true);
    } else {
        toggleError(personName, "required", false);
    }
    
    var personSurname = $("person-surname");
    if ((personSurname.value.trim() === "")) {
        errors.push("Please, fill out your surname");
        toggleError(personSurname, "required", true);
    } else {
        toggleError(personSurname, "required", false);
    }
    
    var personTitle = $("person-title");
    toggleError(personTitle, "required", personTitle.selectedIndex === 0);
    
    if ( ! $("travel-type-vacation").checked && 
         ! $("travel-type-business").checked && 
         ! $("travel-type-religious").checked ) {
        errors.push("Please, choose the travel type");
        toggleError($("travel-type-vacation"), "required", true);
     } else {
        toggleError($("travel-type-vacation"), "required", true); 
     }
    
    var travelDays = $("travel-days");
    if ((travelDays.value.trim() === "")) {
        errors.push("Please, fill out the number of days");
        toggleError(travelDays, "required", true);
    }
    if (isNaN(travelDays.value)) {
        errors.push("The number of days should be a number");
        toggleError(travelDays, "numeric", true);
    }
    
    var travelBegin = $("travel-begin");
    if ((travelBegin.value.trim() === "")) {
        errors.push("Please, fill out the begin date");
        toggleError(travelBegin, "required", true);
    }
    if (! travelBegin.value.match(/^\d{2}\.\d{2}\.\d{4}$/) ) {
        errors.push("The number of days should be a date");
        toggleError(travelBegin, "format", true);
    }


    if (errors.length >0){
        var summary = $("validation-summary");
        for (i = 0; i < errors.length; i=i+1) {
            var err = document.createElement("LI");
            err.innerHTML = errors[i];
            
            summary.appendChild(err);
        }
        
        return false;
        
    }

    return true;
}



/* Looks for an "explanation" element next 
 * to the current field and displays it. 
 * */
function toggleError(targetObject, reason, show) {
    var i, explanations;

    if (show) {
        addClass(targetObject, "error-" + reason);
    } else {
        removeClass(targetObject, "error-" + reason);
    }

    explanations = targetObject.parentElement.querySelectorAll(".explanation-" + reason);
    for (i = 0; i < explanations.length; i = i + 1) {
        //explanations[i].style.display = (show) ? "inline" : "none";
        if (show) {
            addClass(explanations[i], "visible");
        } else {
            removeClass(explanations[i], "visible");
        }
    }
}

/**
 * Assigns an event listener to a DOM object, allows multiple listeners at once
 * @param {DOMobject} obj - the target object which the event is added to
 * @param {string} eventtype - the event that has to be caught, without the "on" prefix
 * @param {function} handler - the actual function to be called
 * @returns {undefined}
 */
function addListener(obj, eventtype, handler) {
    if (obj.addEventListener) {
        obj.addEventListener(eventtype, handler, false);
    } else if (obj.attachEvent) { //we are in IE (omg!)
        obj.attachEvent("on" + eventtype, handler);
    }
}


/*
 *  Helpers for working with CSS classes.
 * Borrowed from http://toddmotto.com/creating-jquery-style-functions-in-javascript-hasclass-addclass-removeclass-toggleclass/
 */
function hasClass(elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}

function addClass(elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
    }
}
function removeClass(elem, className) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

/*
 *Adding a "trim" method to all strings 
 */
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}