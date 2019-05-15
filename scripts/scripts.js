/*eslint-env browser*/

var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

function validateCard(ccn) {
    "use strict";
    var sum = 0, digit;
    
    /*
    while (ccn >= 1) {
        digit = ccn % 10;
        ccn = (ccn - digit) / 10;
        
        if (doubleThis === true) {
            // Double this digit
            digit *= 2;
            
            // Re-adjust digit/sum if greater than 10
            if (digit >= 10) {
                sum += 1;
                digit = digit % 10;
            }
        }
        
        sum += digit;
        doubleThis = !doubleThis;
    }
    */
    
    while (ccn >= 10) {
        // Parse and add odd digits
        digit = ccn % 10;
        ccn = (ccn - digit) / 10;
        
        sum += digit;
        
        // Parse even digit and calculate value to add
        digit = ccn % 10;
        ccn = (ccn - digit) / 10;
        digit *= 2;
        
        if (digit >= 10) {
            digit = digit % 10;
            sum += 1;
        }
        
        sum += digit;
    }
    // If the number has odd number of digits, add the last digit to the sum.
    if (ccn >= 1) {
        sum += digit;
    }
    
    return (sum % 10 === 0) ? true : false;
}

function takeOrderHandler(e) {
    "use strict";
    e.preventDefault();
    window.console.log("Clicked");
}

window.addEventListener("load", function () {
    "use strict";
    var test;
    
    window.console.log("Hello");
    
    $("orderPizzaBtn").addEventListener("click", takeOrderHandler);
    
    test = 4512113014843252;
    window.console.log(test + ": " + (validateCard(test) ? "valid" : "invalid"));
    
    test = 4512113014643252;
    window.console.log(test + ": " + (validateCard(test) ? "valid" : "invalid"));
});