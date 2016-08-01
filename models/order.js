"use strict"

class Order
{
    constructor(username, restaurant, main, sideorder, sauce, drink, extra)
    {
        this.date = '';
        this.restaurant = restaurant;
        this.username = username;
        this.main = main == null ? 'BBQ' : main;
        this.sideorder = sideorder == null ? 'Pommes' : sideorder;
        this.sauce = sauce == null ? 'Aioli' : sauce;
        this.drink = drink == null ? 'Pepsi' : drink;
        this.extra = extra;
    }
    
    toString()
    {
        var res = "*" + this.username + "* " + this.main + " " + this.sideorder + " " + this.sauce + " " + this.drink  + " " + (this.extra == null ? "" : this.extra);
        return res;
    } 
}

module.exports = Order;