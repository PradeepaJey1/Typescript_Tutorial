/** EVENT LISTENERS */
define(["require", "exports", "./TraceMarket"], function (require, exports, TraceMarket_1) {
    "use strict";
    var tm = new TraceMarket_1.TraceMarket();
    $('#product-container').on('click', '.add-stock', function (div) {
        var parentDiv = $(div.target).parents('.item');
        var itemId = parentDiv[0].id;
        var qty = parentDiv.find('.product-qty').val().trim();
        if (qty != "") {
            tm.addStock(itemId, Number(qty));
        }
    });
    $('#product-container').on('click', '.remove-stock', function (div) {
        var parentDiv = $(div.target).parents('.item');
        var itemId = parentDiv[0].id;
        var qty = parentDiv.find('.product-qty').val().trim();
        if (qty != "") {
            tm.removeStock(itemId, Number(qty));
        }
    });
    $('#main-div').on('click', '.btn-add-item', function (div) {
        $('#addFormModal').modal('show');
        $('#addFormModal').find('#addFormModalLabel').text('Add Item');
        $('#addFormModal').find('.submit-add-item').show();
        $('#addFormModal').find('.submit-update-item').hide();
        $('#item-id').attr('readonly', false);
    });
    $('#main-div').on('click', '.submit-add-item', function (div) {
        var parentDiv = $(div.currentTarget).parents('.modal');
        //add validation
        var itemId = parentDiv.find('#item-id').val().trim();
        var itemName = parentDiv.find('#item-name').val().trim();
        var itemPrice = parentDiv.find('#item-price').val().trim();
        var itemProfit = parentDiv.find('#item-profit').val().trim();
        var itemStock = parentDiv.find('#item-stock').val().trim();
        tm.addItem(itemId, itemName, itemPrice, itemProfit, itemStock);
        $('#addFormModal').modal('hide');
    });
    $('#main-div').on('click', '.submit-remove-item', function (div) {
        var parentDiv = $(div.currentTarget).parents('.modal');
        //add validation
        var itemId = parentDiv.find('#item-id').val().trim();
        tm.removeItem(itemId);
        $('#' + itemId).remove();
        $('#removeFormModal').modal('hide');
    });
    $('#product-container').on('click', '.update-btn', function (div) {
        var parentDiv = $(div.target).parents('.item');
        var itemId = parentDiv[0].id;
        $('#addFormModal').modal('show');
        $('#addFormModal').find('#addFormModalLabel').text('Update Item');
        $('#addFormModal').find('.submit-add-item').hide();
        $('#addFormModal').find('.submit-update-item').show();
        $('#item-id').attr('readonly', true);
        tm.autoFillForm(itemId);
    });
    $('#main-div').on('click', '.submit-update-item', function (div) {
        var parentDiv = $(div.currentTarget).parents('.modal');
        var itemId = parentDiv.find('#item-id').val().trim();
        var itemName = parentDiv.find('#item-name').val().trim();
        var itemPrice = parentDiv.find('#item-price').val().trim();
        var itemProfit = parentDiv.find('#item-profit').val().trim();
        var itemStock = parentDiv.find('#item-stock').val().trim();
        tm.updateItem(itemId, itemName, itemPrice, itemProfit, itemStock);
        $('#addFormModal').modal('hide');
    });
});
