/*eslint-env browser*/

var PizzaOrder = {
    pizzas: [],
    custInfo : null,
    billInfo : null,
    
    addPizza: function (pizza) {
        "use strict";
        this.pizzas.push(pizza);
    },
    
    getPizza: function (n) {
        "use strict";
        if (n >= this.pizzas.length) {
            window.console.log("Invalid value: pizza[" + n + "] (length:" + this.pizzas.length + ")");
            return null;
        }
        return this.pizzas[n];
    },
    
    setNthPizza: function (n, pizza) {
        "use strict";
        if (n >= this.pizzas.length) {
            window.console.log("Invalid value: pizza[" + n + "] (length:" + this.pizzas.length + ")");
        } else {
            this.pizzas[n] = pizza;
        }
    },
    
    displayPizza: function (pizza) {
        "use strict";
        var form = window.document.getElementById("pizzaForm"), toppings;
        
        switch (pizza.getDough()) {
        case "HT":
            break;
        case "TC":
            break;
        case "NYS":
            break;
        case "GF":
            break;
        default:
            break;
        }
        
        switch (pizza.getSize()) {
        case "S":
            break;
        case "M":
            break;
        case "L":
            break;
        case "XL":
            break;
        default:
            break;
        }
        
        switch (pizza.getCheese()) {
        case "L":
            break;
        case "N":
            break;
        case "E":
            break;
        case "D":
            break;
        default:
            break;
        }
        
        switch (pizza.getSauce()) {
        case "RT":
            break;
        case "HT":
            break;
        case "BBQ":
            break;
        default:
            break;
        }
        
        toppings = pizza.getToppings();
        if (toppings.length > 0) {
            form.elements.topping.forEach(function (e) {
                e.checked = (toppings.indexOf(e.value) < 0) ? false : true;
            });
        }
    }
};