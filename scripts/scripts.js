/*eslint-env browser*/

var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

function CreditCard() {
    "use strict";
    return {
        validateNumber: function (ccn) {
            var sum = 0, digit, doubleThis = false;

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

            return (sum % 10 === 0) ? true : false;
        }
    };
}

var gSizes = {
    "Hand Tossed": [
        {
            size: "Small",
            cost: 9.99
        },
        {
            size: "Medium",
            cost: 12.99,
            check: true
        },
        {
            size: "Large",
            cost: 14.99
        }
    ],
    "Thin Crust": [
        {
            size: "Medium",
            cost: 11.99,
            check: true
        },
        {
            size: "Large",
            cost: 13.99
        }
    ],
    "New York Style": [
        {
            size: "Large",
            cost: 14.99,
            check: true
        },
        {
            size: "Extra Large",
            cost: 19.99
        }
    ],
    "Gluten Free": [
        {
            size: "Small",
            cost: 10.99,
            check: true
        }
    ]
};

function Pizza(iDough) {
    "use strict";
    var dough, size, sizes = [], cheese, sauce, toppings;
    dough = iDough;
    return {
        getSizes: function () {
            switch (dough) {
            case "Hand Tossed":
            case "Thin Crust":
            case "New York Style":
            case "Gluten Free":
                sizes = gSizes[dough];
                break;
            default:
                break;
            }
            return sizes;
        },
        setDough: function (iDough) {
            dough = iDough;
            if (sizes.length !== 0) {
                sizes.length = 0;
            }
            this.getSizes();
        }
    };
}

function validateCard(ccn) {
    "use strict";
    var sum = 0, digit, doubleThis = false;
    
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
    
    return (sum % 10 === 0) ? true : false;
}

function parsePizza(form) {
    "use strict";
    var dough, size, cheese, sauce, toppings = [], pizza;
    dough = form.elements.dough_type.value;
    size = form.elements.size.value;
    cheese = form.elements.cheese.value;
    sauce = form.elements.sauce.value;
    form.elements.topping.forEach(function (e) {
        if (e.checked) {
            toppings.push(e.value);
        }
    });
    pizza = new Pizza(dough);
    window.console.log(pizza.getSizes());
}

function doughSelectedHandler(e) {
    "use strict";
    var size = $("size"), pizza, sizes, i, opt, sel;
    pizza = new Pizza(e.target.value);
    sizes = pizza.getSizes();
    
    // Reset dropdown menu
    while (size.firstChild) {
        size.removeChild(size.firstChild);
    }
    // Set dropdown menu
    for (i = 0; i < sizes.length; i += 1) {
        opt = document.createElement("option");
        opt.value = sizes[i].size;
        opt.innerHTML = sizes[i].size + " ($" + sizes[i].cost + ")";
        if (sizes[i].check) {
            sel = sizes[i].size;
        }
        size.appendChild(opt);
    }
    size.value = sel;
}

function takeOrderHandler(e) {
    "use strict";
    e.preventDefault();
    window.console.log("Clicked");
    parsePizza($("pizzaForm"));
}

window.addEventListener("load", function () {
    "use strict";
    var test;
    
    window.console.log("Hello");
    
    $("orderPizzaBtn").addEventListener("click", takeOrderHandler);
    $("doughDiv").addEventListener("click", doughSelectedHandler);
    
    test = 4512113014843252;
    window.console.log(test + ": " + (new CreditCard().validateNumber(test) ? "valid" : "invalid"));
    
    test = 4512113014643252;
    window.console.log(test + ": " + (validateCard(test) ? "valid" : "invalid"));
});