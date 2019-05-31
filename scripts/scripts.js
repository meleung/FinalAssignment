/*eslint-env browser*/
/*global Pizza*/

var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

var CreditCard = function (n) {
    "use strict";
    var ccn = n, cvc;
    return {
        isValid: function () {
            var sum = 0, digit, doubleThis = false, iCcn = ccn;

            while (iCcn >= 1) {
                digit = iCcn % 10;
                iCcn = (iCcn - digit) / 10;

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
        },
        setNumber : function (n) {
            ccn = n;
            return this;
        },
        getNumber : function () {
            return ccn;
        },
        setCVC : function (n) {
            cvc = n;
            return this;
        },
        getCVC : function () {
            return cvc;
        },
        getType : function () {
            var sCCN = ccn.toString(),
                visaExp = new RegExp(/^4(\d{15}|\d{12})$/),
                mastercardExp = new RegExp(/^5[1-5]\d{14}$/),
                amexExp = new RegExp(/^37\d{13}$/);
            if (sCCN.match(visaExp)) {
                window.console.log("visa");
            } else if (sCCN.match(mastercardExp)) {
                window.console.log("mastercard");
            } else if (sCCN.match(amexExp)) {
                window.console.log("amex");
            }
        }
    };
};

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
    
    //window.console.log("sizeSelectedHandler");
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

function parseCustomer(form) {
    "use strict";
}

function parseBilling(form) {
    "use strict";
}

function takeOrderHandler(e) {
    "use strict";
    var form = $("pizzaForm");
    e.preventDefault();
    window.console.log("Clicked");
    parsePizza(form);
    parseCustomer(form);
    parseBilling(form);
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

function billingCopy(e) {
    "use strict";
    if (e.target.checked === true) {
        var bFields = $("bill_addr").getElementsByTagName("INPUT"),  cFields = $("cust_addr").getElementsByTagName("INPUT"), i, l;
        l = bFields.length;
        for (i = 0; i < l; i += 1) {
            bFields[i].value = cFields[i].value;
        }
    }
}

function checkAddressInput(e) {
    "use strict";
    var id = e.target.id;
    switch (id) {
    case "bill_state":
    case "cust_state":
        if (e.target.value.length > 2) {
            e.target.value = e.target.value.toUpperCase().substr(0, 2);
            return;
        } else {
            e.target.value = e.target.value.toUpperCase();
        }
        break;
    case "bill_addr1":
    case "cust_addr1":
        break;
    case "bill_addr2":
    case "cust_addr2":
        break;
    case "bill_city":
    case "cust_city":
        break;
    case "bill_zip":
    case "cust_zip":
        break;
    case "bill_name":
    case "cust_name":
        break;
    default:
    }
    $("copy_over").checked = false;
}

function setExp() {
    "use strict";
    var expYear = $("bill_exp_year"), expMon = $("bill_exp_month"), today = new Date(), i, opt, month, year;
    
    for (i = 0; i < 10; i += 1) {
        opt = document.createElement("option");
        year = today.getYear() % 100 + i;
        opt.value = year;
        opt.innerHTML = year.toString();
        expYear.appendChild(opt);
    }
    
    for (i = 1; i < 12; i += 1) {
        opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = i.toString();
        expMon.appendChild(opt);
    }
    expMon.value = today.getMonth() + 1;
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
    
    $("copy_over").addEventListener("click", billingCopy);
    
    $("bill_addr").addEventListener("keyup", checkAddressInput);
    $("cust_addr").addEventListener("keyup", checkAddressInput);
    
    setExp();
    
    testPizza = new Pizza("Thin Crust");
    testPizza.setSize("Large");
    testPizza.setCheese("extra");
    testPizza.setSauce("hearty");
    testPizza.setToppings(["Bacon", "Salami", "Olives"]);
    intDisplayPizza(testPizza);
    
    test = 4512113014843252;
    window.console.log(test + ": " + (new CreditCard(test).isValid() ? "valid" : "invalid"));
    window.console.log(new CreditCard(test).getType());
    
    test = 4512113014643252;
    window.console.log(test + ": " + (new CreditCard(test).isValid() ? "valid" : "invalid"));
});