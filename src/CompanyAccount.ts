import { Account } from "./Account";

export class CompanyAccount implements Account {
    private balance: number;
    private profit: number;

    public deposit(amount: number): void {
        this.balance = this.balance + amount;
    }
    public withdraw(amount: number): boolean {
        if (this.balance > amount) {
            this.balance = this.balance - amount
            return true;
        }
        return false;
    }

    public calculateProfit(totalAmount: number, amountWithoutProfit: number) {
        this.profit = this.profit + (totalAmount - amountWithoutProfit);
    }

    public getProfit(): number {
        return this.profit;
    }

    public getBalance(): number {
        return this.balance;
    }

}
