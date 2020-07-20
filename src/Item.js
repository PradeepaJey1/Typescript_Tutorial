define(["require", "exports"], function (require, exports) {
    "use strict";
    var Item = (function () {
        function Item(itemId, itemName, itemPrice, profitPerItem, stockAvailable) {
            this.itemId = itemId;
            this.itemName = itemName;
            this.itemPrice = itemPrice;
            this.profitPerItem = profitPerItem;
            this.stockAvailable = stockAvailable;
            this.stockLastUpdated = new Date();
        }
        Item.prototype.getItemId = function () {
            return this.itemId;
        };
        Item.prototype.getItemName = function () {
            return this.itemName;
        };
        Item.prototype.getItemPrice = function () {
            return this.itemPrice;
        };
        Item.prototype.getProfitPerItem = function () {
            return this.profitPerItem;
        };
        Item.prototype.getStockAvailable = function () {
            return this.stockAvailable;
        };
        Item.prototype.getStockLastUpdated = function () {
            return this.stockLastUpdated;
        };
        Item.prototype.updateItemPrice = function (itemPrice) {
            this.itemPrice = itemPrice;
        };
        Item.prototype.updateProfitPerItem = function (profit) {
            this.profitPerItem = profit;
        };
        Item.prototype.updateItemName = function (itemName) {
            this.itemName = itemName;
        };
        Item.prototype.updateStock = function (stock) {
            this.stockAvailable = stock;
        };
        Item.prototype.addStock = function (noOfItems) {
            this.stockAvailable = Number(this.stockAvailable) + Number(noOfItems);
            this.stockLastUpdated = new Date();
        };
        Item.prototype.removeStock = function (noOfItems) {
            if (Number(this.stockAvailable) > Number(noOfItems)) {
                this.stockAvailable = Number(this.stockAvailable) - Number(noOfItems);
                this.stockLastUpdated = new Date();
                return true;
            }
            return false;
        };
        return Item;
    }());
    exports.Item = Item;
});
