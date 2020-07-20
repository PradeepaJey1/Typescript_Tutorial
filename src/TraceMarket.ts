// import { CompanyAccount } from "./CompanyAccount";
import { Item } from "./Item";

/**
 * This is the main class of Trace Market, where
 * all the necessary functions are added
 */

export class TraceMarket {

    private items: Array<Item> = [];

    constructor() {
        this.initializeItems();
        this.renderProducts(this);
    }

    /**
     * This method initializes the items in an array.
     * Once the application is connected with the database
     * it needs to be modified.
     */
    public initializeItems(): void {
        let item1 = new Item("it_1", "Pencil", 10.0, 2.5, 30);
        this.items.push(item1);
        let item2 = new Item("it_2", "Pen", 15.0, 3.5, 30);
        this.items.push(item2);
        let item3 = new Item("it_3", "Eraser", 12.0, 3.0, 30);
        this.items.push(item3);
        let item4 = new Item("it_4", "Pencil Case", 100.0, 35, 30);
        this.items.push(item4);
        let item5 = new Item("it_5", "Bubbles", 120.0, 20, 30);
        this.items.push(item5);
        let item6 = new Item("it_6", "Marker", 150.0, 50, 30);
        this.items.push(item6);
        let item7 = new Item("it_7", "Clay", 160.0, 60, 30);
        this.items.push(item7);
    }

    public addItem(itemId: string, itemName: string, itemPrice: number, itemProfit: number, itemStock: number): void {
        let newItem = new Item(itemId, itemName, itemPrice, itemProfit, itemStock);
        this.items.push(newItem);
        this.renderItem(newItem);
    }

    public removeItem(itemId: string): void {
        let item: Item = this.getItem(itemId)
        let index: number = this.items.indexOf(item);
        this.items.splice(index, 1);
    }

    public updateItem(itemId: string, itemName: string, itemPrice: number, itemProfit: number, itemStock: number) {
        let existingIndex: number = this.items.findIndex((item => item.getItemId() == itemId));
        this.items[existingIndex].updateItemName(itemName);
        this.items[existingIndex].updateItemPrice(itemPrice);
        this.items[existingIndex].updateProfitPerItem(itemProfit);
        this.items[existingIndex].updateStock(itemStock);
        this.updateItemUI(this.items[existingIndex]);
    }

    public renderProducts(thisClass: any): void {
        $('#product-container').empty();
        this.items.forEach(function (item) {
            thisClass.renderItem(item);
        });
    }

    public renderItem(item: Item): void {
        let productHtml: string = '<div class="card mb-2 shadow-sm item" id="' + item.getItemId() + '">' +
            '<div class="card-header">' +
            '<span class="badge badge-secondary">' + item.getItemId() + '</span>' +
            '<h4 class="my-0 font-weight-normal"> <label class="item-name-ui">' + item.getItemName() + '</label>'+
            '<i class="fa fa-pencil update-btn" aria-hidden="true" data-toggle="modal" data-target="#addFormModal"></i>' +
            '</h4>' +
            '</div>' +
            '<div class="card-body">' +
            '<h1 class="card-title pricing-card-title"> $ <label class="item-price-ui">' + item.getItemPrice() + '</label>'+
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
    }

    public addStock(itemId: string, qty: number): void {
        let item: Item = this.getItem(itemId);
        item.addStock(qty);
        this.updateStockUI(item);
    }

    public removeStock(itemId: string, qty: number): void {
        let item: Item = this.getItem(itemId);
        let isAvailable: boolean = item.removeStock(qty);
        if (!isAvailable) {
            alert('Not Enough of Stocks!');
        } else {
            this.updateStockUI(item);
        }
    }

    public getItem(itemId: string): Item {
        let foundItem: Item;
        this.items.every(function (item) {
            if (item.getItemId() == itemId) {
                foundItem = item;
                return false;
            } else {
                return true;
            }
        });
        return foundItem;
    }

    public updateStockUI(item: Item) {
        let itemDiv: any = $('#' + item.getItemId());
        itemDiv.find('.stock-ui').text(item.getStockAvailable());
        itemDiv.find('.stock-update-ui').text(item.getStockLastUpdated());
        itemDiv.find('.product-qty').val('');
    }

    public updateItemUI(item: Item){
        let itemDiv: any = $('#' + item.getItemId());
        itemDiv.find('.item-name-ui').text(item.getItemName());
        itemDiv.find('.item-price-ui').text(item.getItemPrice());
        itemDiv.find('.item-profit-ui').text(item.getProfitPerItem());
        this.updateStockUI(item);
    }

    public autoFillForm(itemId: string){
        let item: Item = this.getItem(itemId);
        let form: any = $('.add-form');
        form.find('#item-id').val(item.getItemId());
        form.find('#item-name').val(item.getItemName());
        form.find('#item-price').val(item.getItemPrice());
        form.find('#item-profit').val(item.getProfitPerItem());
        form.find('#item-stock').val(item.getStockAvailable());
    }

}

let tm = new TraceMarket();