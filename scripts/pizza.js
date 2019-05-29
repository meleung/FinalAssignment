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
    var dough, size, sizes = [], cheese, sauce, toppings = [], cost = 0;
    dough = iDough;
    
    function setSizes(dough) {
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
    }
    setSizes(dough);
    
    return {
        getSizes: function () {
            return sizes;
        },
        getToppings: function () {
            return toppings;
        },
        setToppings: function (iToppings) {
            toppings = iToppings;
        },
        getSauce: function () {
            return sauce;
        },
        setSauce: function (iSauce) {
            sauce = iSauce;
        },
        getCheese: function () {
            return cheese;
        },
        setCheese: function (iCheese) {
            cheese = iCheese;
        },
        getSize: function () {
            return size;
        },
        setSize: function (iSize) {
            size = iSize;
        },
        getDough: function () {
            return dough;
        },
        setDough: function (iDough) {
            dough = iDough;
            setSizes(dough);
        }
    };
}