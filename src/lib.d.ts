declare interface ISubscriptionDetails {
  duration: number;
  size: number;
  payment: "yes" | "no" | string;
}

declare interface IUserDetails {
  lastName: string;
  firstName: string;
  email: string;
  streetAddress: string;
}

declare interface ICreditCardDetails {
  number: string;
  expMonth: string;
  expYear: string;
  cvv: string;
}

declare interface IFormData {
  subscriptionDetails: ISubscriptionDetails;
  userDetails: IUserDetails;
  creditCardDetails: ICreditCardDetails;
}

declare interface IMenuOption {
  value: any;
  label: any;
}
