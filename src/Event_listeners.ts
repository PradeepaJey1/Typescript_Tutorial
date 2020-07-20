/** EVENT LISTENERS */

import { TraceMarket } from "./TraceMarket";

let tm = new TraceMarket();

$('#product-container').on('click', '.add-stock', function (div) {
    let parentDiv: any = $(div.target).parents('.item');
    let itemId: string = parentDiv[0].id;
    let qty: string = parentDiv.find('.product-qty').val().trim();
    if (qty != "") {
        tm.addStock(itemId, Number(qty));
    }

});

$('#product-container').on('click', '.remove-stock', function (div) {
    let parentDiv: any = $(div.target).parents('.item');
    let itemId: string = parentDiv[0].id;
    let qty: string = parentDiv.find('.product-qty').val().trim();
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
    let parentDiv: any = $(div.currentTarget).parents('.modal');
    //add validation
    let itemId: string = parentDiv.find('#item-id').val().trim();
    let itemName: string = parentDiv.find('#item-name').val().trim();
    let itemPrice: number = parentDiv.find('#item-price').val().trim();
    let itemProfit: number = parentDiv.find('#item-profit').val().trim();
    let itemStock: number = parentDiv.find('#item-stock').val().trim();
    tm.addItem(itemId, itemName, itemPrice, itemProfit, itemStock);
    $('#addFormModal').modal('hide');
});

$('#main-div').on('click', '.submit-remove-item', function (div) {
    let parentDiv: any = $(div.currentTarget).parents('.modal');
    //add validation
    let itemId: string = parentDiv.find('#item-id').val().trim();
    tm.removeItem(itemId);
    $('#' + itemId).remove();
    $('#removeFormModal').modal('hide');
});

$('#product-container').on('click', '.update-btn', function (div) {
    let parentDiv: any = $(div.target).parents('.item');
    let itemId: string = parentDiv[0].id;
    $('#addFormModal').modal('show');
    $('#addFormModal').find('#addFormModalLabel').text('Update Item');
    $('#addFormModal').find('.submit-add-item').hide();
    $('#addFormModal').find('.submit-update-item').show();
    $('#item-id').attr('readonly', true);
    tm.autoFillForm(itemId);
});

$('#main-div').on('click', '.submit-update-item', function (div) {
    let parentDiv: any = $(div.currentTarget).parents('.modal');
    let itemId: string = parentDiv.find('#item-id').val().trim();
    let itemName: string = parentDiv.find('#item-name').val().trim();
    let itemPrice: number = parentDiv.find('#item-price').val().trim();
    let itemProfit: number = parentDiv.find('#item-profit').val().trim();
    let itemStock: number = parentDiv.find('#item-stock').val().trim();
    tm.updateItem(itemId, itemName, itemPrice, itemProfit, itemStock);
    $('#addFormModal').modal('hide');
});



