var pg = require('pg');
var Order = require('../models/order');
var async = require('async');
var Model = require('../model');

function OrderController() { }

OrderController.prototype.createOrder = function(order, callback) {

    Model.Order.create({
        username: order.username,
        main: order.main,
        sideorder: order.sideorder,
        sauce: order.sauce,
        drink: order.drink,
        extra: order.extra,
        canceled: false
    }).then(function() {
        callback(true);
    });
};

OrderController.prototype.updateOrder = function(id, order, callback) {
    Model.Order.update({
        main: order.main,
        sideorder: order.sideorder,
        sauce: order.sauce,
        drink: order.drink,
        extra: order.extra,
        canceled: false
    }, {
            where: {
                id: id
            }
        }).then(function() {
            callback();
        });
};

OrderController.prototype.getOrderForUser = function(username, callback) {
    var date = new Date();
    date.setHours(0, 0, 0, 0);

    Model.Order.findOne({
        where: {
            username: username,
            createdAt: {
                $gt: date
            },
            canceled: false
        },
    }).then(function(order) {
        callback(order);
    });
};

OrderController.prototype.getTodaysOrders = function(callback) {
    var date = new Date();
    date.setHours(0, 0, 0, 0);

    Model.Order.findAll({
        where: {
            createdAt: {
                $gt: date
            },
            canceled: false
        }
    }).then(function(orders) {
        callback(orders);
    });
};

OrderController.prototype.getAllOrders = function(callback) {
    var date = new Date();
    date.setHours(0, 0, 0, 0);

    Model.Order.findAll({
        where: {
            createdAt: {
                $gt: date
            }
        }
    }).then(function(orders) {
        callback(orders);
    });
};

OrderController.prototype.wipeAllOrders = function(callback) {
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    
    Model.Order.destroy({
       where: {
           createdAt: {
               $gt: date
           }
       } 
    }).then(function(){
        callback();
    });
};

OrderController.prototype.cancelOrderForUser = function(username, callback) {
    var date = new Date();
    date.setHours(0, 0, 0, 0);

    Model.Order.update({
        canceled: true
    }, {
            where: {
                username: username,
                createdAt: {
                    $gt: date
                }
            }
        }).then(function() {
            callback();
        });
};

module.exports = OrderController;