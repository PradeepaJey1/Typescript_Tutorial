export class Item {
    private itemId: string;
    private itemName: string;
    private stockAvailable: number;
    private stockLastUpdated: Date;
    private itemPrice: number;
    private profitPerItem: number;

    constructor(itemId: string, itemName: string, itemPrice: number, profitPerItem: number, stockAvailable: number) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.profitPerItem = profitPerItem;
        this.stockAvailable = stockAvailable;
        this.stockLastUpdated = new Date();
    }

    public getItemId(): string {
        return this.itemId;
    }

    public getItemName(): string {
        return this.itemName;
    }

    public getItemPrice(): number {
        return this.itemPrice;
    }

    public getProfitPerItem(): number {
        return this.profitPerItem;
    }

    public getStockAvailable(): number {
        return this.stockAvailable;
    }

    public getStockLastUpdated(): Date {
        return this.stockLastUpdated;
    }

    public updateItemPrice(itemPrice: number): void {
        this.itemPrice = itemPrice;
    }

    public updateProfitPerItem(profit: number): void {
        this.profitPerItem = profit;
    }

    public updateItemName(itemName: string): void {
        this.itemName = itemName;
    }

    public updateStock(stock: number): void {
        this.stockAvailable = stock;
    }

    public addStock(noOfItems: number): void {
        this.stockAvailable = Number(this.stockAvailable) + Number(noOfItems);
        this.stockLastUpdated = new Date();
    }

    public removeStock(noOfItems: number): boolean {
        if (Number(this.stockAvailable) > Number(noOfItems)) {
            this.stockAvailable = Number(this.stockAvailable) - Number(noOfItems);
            this.stockLastUpdated = new Date();
            return true;
        }
        return false;
    }

}

