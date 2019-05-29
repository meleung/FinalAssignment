/*eslint-env browser*/
/*global Pizza*/

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
    pizza.setSize(size);
    pizza.setCheese(cheese);
    pizza.setSauce(sauce);
    pizza.setToppings(toppings);
    window.console.log(pizza.getSizes());
    window.console.log("dough: " + pizza.getDough());
    window.console.log("size: " + pizza.getSize());
    window.console.log("cheese: " + pizza.getCheese());
    window.console.log("sauce: " + pizza.getSauce());
    window.console.log("toppings: " + pizza.getToppings());
}

function populateSize(pizza) {
    "use strict";
    var sizes = pizza.getSizes(), size = $("size"), i, opt, sel;
    
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

function doughSelectedHandler(e) {
    "use strict";
    var pizza;
    
    if (e.target.value === undefined) {
        return;
    }
    
    pizza = new Pizza(e.target.value);
    populateSize(pizza);
}

function sizeSelectedHandler(e) {
    "use strict";
    
    if (e.target.value === undefined) {
        return;
    }
    
    window.console.log("sizeSelectedHandler");
    window.console.log(e.target.value);
}

function cheeseSelectedHandler(e) {
    "use strict";
    
    if (e.target.value === undefined) {
        return;
    }
    
    window.console.log("cheeseSelectedHandler");
    window.console.log(e.target.value);
}

function sauceSelectedHandler(e) {
    "use strict";
    
    if (e.target.value === undefined) {
        return;
    }
    
    window.console.log("sauceSelectedHandler");
    window.console.log(e.target);
}

function toppingsSelectedHandler(e) {
    "use strict";
    
    if (e.target.value === undefined) {
        return;
    }
    
    window.console.log("toppingsSelectedHandler");
    window.console.log(e.target.value);
}

function takeOrderHandler(e) {
    "use strict";
    e.preventDefault();
    window.console.log("Clicked");
    parsePizza($("pizzaForm"));
}

function intDisplayPizza(pizza) {
    "use strict";
    var form = window.document.getElementById("pizzaForm"), toppings;
    
    populateSize(pizza);
    form.elements.dough_type.value = pizza.getDough();
    form.elements.size.value = pizza.getSize();
    form.elements.cheese.value = pizza.getCheese();
    form.elements.sauce.value = pizza.getSauce();
    toppings = pizza.getToppings();
    if (toppings.length > 0) {
        form.elements.topping.forEach(function (e) {
            e.checked = (toppings.indexOf(e.value) < 0) ? false : true;
        });
    }
}

window.addEventListener("load", function () {
    "use strict";
    var test, testPizza;
    
    window.console.log("Hello");
    
    $("orderPizzaBtn").addEventListener("click", takeOrderHandler);
    
    $("doughDiv").addEventListener("click", doughSelectedHandler);
    $("sizeDiv").addEventListener("click", sizeSelectedHandler);
    $("cheeseDiv").addEventListener("click", cheeseSelectedHandler);
    $("sauceDiv").addEventListener("click", sauceSelectedHandler);
    $("toppingsDiv").addEventListener("click", toppingsSelectedHandler);
    
    testPizza = new Pizza("Thin Crust");
    testPizza.setSize("Large");
    testPizza.setCheese("extra");
    testPizza.setSauce("hearty");
    testPizza.setToppings(["Bacon", "Salami", "Olives"]);
    intDisplayPizza(testPizza);
    
    test = 4512113014843252;
    window.console.log(test + ": " + (new CreditCard().validateNumber(test) ? "valid" : "invalid"));
    
    test = 4512113014643252;
    window.console.log(test + ": " + (validateCard(test) ? "valid" : "invalid"));
});