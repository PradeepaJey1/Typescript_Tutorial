define(["require", "exports", "./Item"], function (require, exports, Item_1) {
    "use strict";
    /**
     * This is the main class of Trace Market, where
     * all the necessary functions are added
     */
    var TraceMarket = (function () {
        function TraceMarket() {
            this.items = [];
            this.initializeItems();
            this.renderProducts(this);
        }
        /**
         * This method initializes the items in an array.
         * Once the application is connected with the database
         * it needs to be modified.
         */
        TraceMarket.prototype.initializeItems = function () {
            var item1 = new Item_1.Item("it_1", "Pencil", 10.0, 2.5, 30);
            this.items.push(item1);
            var item2 = new Item_1.Item("it_2", "Pen", 15.0, 3.5, 30);
            this.items.push(item2);
            var item3 = new Item_1.Item("it_3", "Eraser", 12.0, 3.0, 30);
            this.items.push(item3);
            var item4 = new Item_1.Item("it_4", "Pencil Case", 100.0, 35, 30);
            this.items.push(item4);
            var item5 = new Item_1.Item("it_5", "Bubbles", 120.0, 20, 30);
            this.items.push(item5);
            var item6 = new Item_1.Item("it_6", "Marker", 150.0, 50, 30);
            this.items.push(item6);
            var item7 = new Item_1.Item("it_7", "Clay", 160.0, 60, 30);
            this.items.push(item7);
        };
        TraceMarket.prototype.addItem = function (itemId, itemName, itemPrice, itemProfit, itemStock) {
            var newItem = new Item_1.Item(itemId, itemName, itemPrice, itemProfit, itemStock);
            this.items.push(newItem);
            this.renderItem(newItem);
        };
        TraceMarket.prototype.removeItem = function (itemId) {
            var item = this.getItem(itemId);
            var index = this.items.indexOf(item);
            this.items.splice(index, 1);
        };
        TraceMarket.prototype.updateItem = function (itemId, itemName, itemPrice, itemProfit, itemStock) {
            var existingIndex = this.items.findIndex((function (item) { return item.getItemId() == itemId; }));
            this.items[existingIndex].updateItemName(itemName);
            this.items[existingIndex].updateItemPrice(itemPrice);
            this.items[existingIndex].updateProfitPerItem(itemProfit);
            this.items[existingIndex].updateStock(itemStock);
            this.updateItemUI(this.items[existingIndex]);
        };
        TraceMarket.prototype.renderProducts = function (thisClass) {
            $('#product-container').empty();
            this.items.forEach(function (item) {
                thisClass.renderItem(item);
            });
        };
        TraceMarket.prototype.renderItem = function (item) {
            var productHtml = '<div class="card mb-2 shadow-sm item" id="' + item.getItemId() + '">' +
                '<div class="card-header">' +
                '<span class="badge badge-secondary">' + item.getItemId() + '</span>' +
                '<h4 class="my-0 font-weight-normal"> <label class="item-name-ui">' + item.getItemName() + '</label>' +
                '<i class="fa fa-pencil update-btn" aria-hidden="true" data-toggle="modal" data-target="#addFormModal"></i>' +
                '</h4>' +
                '</div>' +
                '<div class="card-body">' +
                '<h1 class="card-title pricing-card-title"> $ <label class="item-price-ui">' + item.getItemPrice() + '</label>' +
                '<small class="text-muted">/profit-$ <label class="item-profit-ui">' + item.getProfitPerItem() + '</label> </small>' +
                '</h1>' +
                '<ul class="list-unstyled mt-3 mb-4">' +
                '<li><label>Stock Available:</lable> <label class="stock-ui">' + item.getStockAvailable() + '</label></li>' +
                '<li><small class="text-muted"><label>Stock Updated: </label> <label class="stock-update-ui">' + item.getStockLastUpdated() + '</label></small></li>' +
                '</ul>' +
                '<div class="update-stock">' +
                '<i class="fa fa-plus-square-o add-stock" aria-hidden="true"></i>' +
                '<input type="number" class="product-qty" placeholder="Enter Quantity"/>' +
                '<i class="fa fa-minus-square-o remove-stock" aria-hidden="true"></i>' +
                '</div>' +
                '</div>' +
                '</div>';
            $('#product-container').append(productHtml);
        };
        TraceMarket.prototype.addStock = function (itemId, qty) {
            var item = this.getItem(itemId);
            item.addStock(qty);
            this.updateStockUI(item);
        };
        TraceMarket.prototype.removeStock = function (itemId, qty) {
            var item = this.getItem(itemId);
            var isAvailable = item.removeStock(qty);
            if (!isAvailable) {
                alert('Not Enough of Stocks!');
            }
            else {
                this.updateStockUI(item);
            }
        };
        TraceMarket.prototype.getItem = function (itemId) {
            var foundItem;
            this.items.every(function (item) {
                if (item.getItemId() == itemId) {
                    foundItem = item;
                    return false;
                }
                else {
                    return true;
                }
            });
            return foundItem;
        };
        TraceMarket.prototype.updateStockUI = function (item) {
            var itemDiv = $('#' + item.getItemId());
            itemDiv.find('.stock-ui').text(item.getStockAvailable());
            itemDiv.find('.stock-update-ui').text(item.getStockLastUpdated());
            itemDiv.find('.product-qty').val('');
        };
        TraceMarket.prototype.updateItemUI = function (item) {
            var itemDiv = $('#' + item.getItemId());
            itemDiv.find('.item-name-ui').text(item.getItemName());
            itemDiv.find('.item-price-ui').text(item.getItemPrice());
            itemDiv.find('.item-profit-ui').text(item.getProfitPerItem());
            this.updateStockUI(item);
        };
        TraceMarket.prototype.autoFillForm = function (itemId) {
            var item = this.getItem(itemId);
            var form = $('.add-form');
            form.find('#item-id').val(item.getItemId());
            form.find('#item-name').val(item.getItemName());
            form.find('#item-price').val(item.getItemPrice());
            form.find('#item-profit').val(item.getProfitPerItem());
            form.find('#item-stock').val(item.getStockAvailable());
        };
        return TraceMarket;
    }());
    exports.TraceMarket = TraceMarket;
    var tm = new TraceMarket();
});
