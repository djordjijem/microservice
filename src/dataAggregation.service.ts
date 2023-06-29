import {Injectable} from '@nestjs/common';
import {Cron} from '@nestjs/schedule';
import {data} from '../data';

@Injectable()
export class DataAggregationMicroserviceService {
  private data;
  public async getData(userId: string): Promise<any> {
    return this.calculateData(userId);
  }

  public async getListOfPayouts(userId: string, amount: string): Promise<number> {
    let data = 0;
    const userData = this?.data?.items
      .filter((x) => x.userId === userId)
      .filter((x) => x.type === 'payout')
      .filter((x) => x.amount >= amount)
      .map((x) => ({amount: x.amount}));

    if (!userData) {
      throw new Error('No data found for this user');
    }

    userData.forEach((x) => (data += x.amount));

    return data;
  }

  @Cron('0/15 * * * * *')
  //update data every 15 seconds
  private handleCron() {
    this.data = data;
  }

  private calculateData(userId: string): any {
    const userData = this?.data?.items
      .filter((x) => x.userId === userId)
      .map((x) => ({type: x.type, amount: x.amount}));

    if (!userData) {
      throw new Error('No data found for this user');
    }

    const data = {
      balance: this.getBalance(userData),
      earned: this.getEarned(userData),
      spent: this.getSpend(userData),
      payout: this.getPayout(userData),
      paidOut: this.getPaidOut(userData),
    };

    return data;
  }

  private getBalance(userData: any[]): number {
    let balance = 0;
    userData.forEach((x) => {
      if (x.type === 'earned') {
        balance += x.amount;
      } else if (x.type === 'spent') {
        balance -= x.amount;
      } else if (x.type === 'payout') {
        balance -= x.amount;
      }
    });
    return balance;
  }

  private getEarned(userData: any[]): number {
    let earned = 0;
    userData.forEach((x) => {
      if (x.type === 'earned') {
        earned += x.amount;
      }
    });

    return earned;
  }

  private getSpend(userData: any[]): number {
    let spent = 0;
    userData.forEach((x) => {
      if (x.type === 'spent') {
        spent += x.amount;
      }
    });

    return spent;
  }

  private getPayout(userData: any[]): number {
    let payout = 0;
    userData.forEach((x) => {
      if (x.type === 'payout') {
        payout += x.amount;
      }
    });

    return payout;
  }

  private getPaidOut(userData: any[]): number {
    let paidOut = 0;
    userData.forEach((x) => {
      if (x.type === 'earned') {
        paidOut += x.amount;
      } else if (x.type === 'spent') {
        paidOut -= x.amount;
      }
    });

    return paidOut;
  }
}
