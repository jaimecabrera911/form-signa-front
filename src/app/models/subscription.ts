import { Customer } from './customer';
import { SubscriptionIcDetailList } from './subscriptionIcDetailList';
import { Users } from './users';

export interface Subscription {
    subscriptionNumber: string;
    customer: Customer;
    numberUsers: number;
    subscriptionsigningDate: Date;
    subscriptionStartDate: Date;
    subscriptionEndDate: Date;
    subscriptionCycle: number;
    subscriptionCycleTimeQty: number;
    subscriptionCyclePeriod: string;
    negotiationType: string;
    customerInvoiceValue: number;
    commissionValue: number;
    cercaInvoiceValue: number;
    invoiceBalance: number;
    observation: string;
    status: string;
    user: Users;
    subscriptionIcDetailList: SubscriptionIcDetailList[];
}
