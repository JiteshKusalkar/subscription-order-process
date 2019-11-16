declare interface ISubscriptionDetails {
  duration: number;
  size: number;
  upfrontPayment: string;
}

declare interface IShippingDetails {
  lastName: string;
  firstName: string;
  email: string;
  streetAddress: string;
}

declare interface IPaymentDetails {
  number: string;
  expMonth: string;
  expYear: string;
  cvv: string;
}

declare interface IFormData {
  subscriptionDetails: ISubscriptionDetails;
  shippingDetails: IShippingDetails;
  paymentDetails: IPaymentDetails;
}

declare interface IMenuOption {
  value: any;
  label: any;
}
