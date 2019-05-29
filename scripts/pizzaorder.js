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
    
    populateSize: function (pizza) {
        "use strict";
        var sizes = pizza.getSizes(), size, i, opt, sel;
        
        size = window.document.getElementById("size");

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
    },
    
    displayPizza: function (pizza) {
        "use strict";
        var form = window.document.getElementById("pizzaForm"), toppings;
    
        this.populateSize(pizza);
        
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
};