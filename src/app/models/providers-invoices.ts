import { Customer } from './customer';
import { Provider } from './provider';

export interface ProvidersInvoices {
    invoiceNumber:         string;
    subscriptionNumber:    string;
    provider:              Provider;
    customer:              Customer;
    invoiceDate:           Date;
    subscStartDate:        Date;
    subscEndDate:          Date;
    subscCycle:            number;
    subscCyclePeriodValue: number;
    subscCyclePeriodType:  string;
    invoiceValue:          number;
    commissionRate:        number;
}
