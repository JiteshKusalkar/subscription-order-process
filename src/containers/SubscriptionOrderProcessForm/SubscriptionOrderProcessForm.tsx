import React from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import {
  SubscriptionForm,
  ShippingDetailsForm,
  PaymentDetailsForm,
  ConfirmationPage
} from '../../components/Form';
import { Typography } from '@material-ui/core';

interface ISubscriptionProcessFormProps extends WithStyles {}
interface ISubscriptionProcessFormState {
  steps: string[];
  activeStep: number;
  data: IFormData;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    container: {
      backgroundColor: '#282c34',
      minHeight: '100vh',
      alignItems: 'center'
    },
    form: { margin: '0 auto' },
    paper: {
      padding: theme.spacing(5),
      color: theme.palette.text.secondary
    },
    header: {
      textAlign: 'center'
    },
    information: {
      textAlign: 'center'
    },
    totalPrice: {
      textDecoration: 'line-through'
    }
  });

class SubscriptionOrderProcessForm extends React.Component<
  ISubscriptionProcessFormProps,
  ISubscriptionProcessFormState
> {
  readonly upfrontPaymentCharges = 0.9;
  readonly pricePerMonth = 2;
  constructor(props: ISubscriptionProcessFormProps) {
    super(props);

    this.state = this.getEmptyState();
  }

  getEmptyState = () => ({
    steps: [
      'Subscription details',
      'Shipping details',
      'Payment details',
      'Confirmation'
    ],
    activeStep: 0,
    data: {
      subscriptionDetails: {
        duration: 12,
        size: 5,
        upfrontPayment: 'no'
      },
      shippingDetails: {
        lastName: '',
        firstName: '',
        email: '',
        streetAddress: ''
      },
      paymentDetails: {
        number: '',
        expMonth: '',
        expYear: '',
        cvv: ''
      }
    }
  });

  handleActiveStep = (activeStep: number) => this.setState({ activeStep });

  onSubmit = (
    type: string,
    data: ISubscriptionDetails | IShippingDetails | IPaymentDetails
  ) => {
    this.setState(prevState => ({
      ...prevState,
      activeStep: prevState.activeStep + 1,
      data: {
        ...prevState.data,
        [type]: data
      }
    }));
  };

  onPrev = (activeStep: number, currentStep: string = '') => () => {
    this.setState(prevState => ({
      ...prevState,
      activeStep,
      data: {
        ...prevState.data,
        // To clear the next steps data while going one step back
        ...(!!currentStep
          ? { [currentStep]: (this.getEmptyState() as any).data[currentStep] }
          : {})
      }
    }));
  };

  onConfirmOrder = (e?: React.SyntheticEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    console.log(`Here's the data`, this.state.data);
  };

  calculatePrice = (
    size: number,
    month: number,
    afterDiscount: number,
    price: number = 2
  ) => size * month * price * afterDiscount;

  getFormattedPrice = (price: number = this.pricePerMonth) =>
    Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
      price
    );

  getOrderDetails = () => {
    const {
      data: {
        subscriptionDetails: ssd,
        shippingDetails: shd,
        paymentDetails: ccd
      }
    } = this.state;

    const totalPrice = this.calculatePrice(
      ssd.size,
      ssd.duration,
      1,
      this.pricePerMonth
    );
    const discountedPrice = this.calculatePrice(
      ssd.size,
      ssd.duration,
      ssd.upfrontPayment === 'yes' ? this.upfrontPaymentCharges : 1,
      this.pricePerMonth
    );
    const formattedPrice = this.getFormattedPrice(discountedPrice);
    const diff = this.getFormattedPrice(totalPrice - discountedPrice);

    return {
      subscription: `${ssd.size}GB/${
        ssd.duration
      } months for just ${formattedPrice}.${
        ssd.upfrontPayment === 'yes' ? `You save flat ${diff}` : ''
      }`,
      shipping: `Ship this to
        ${shd.lastName} ${shd.firstName} at ${shd.streetAddress}.
        A copy of the order will be send to ${shd.email}`,
      payment: `Paying via credit card ending with (XXXX-XXXX-XXXX-${ccd.number
        .toString()
        .slice(12)}) valid through ${ccd.expMonth}/${ccd.expYear}`
    };
  };

  renderHeader = () => (
    <Typography variant='h3' gutterBottom className={this.props.classes.header}>
      Cloud Music Subscription
    </Typography>
  );

  renderSteps = () => {
    const { activeStep, steps } = this.state;

    return (
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  };

  renderSubscriptionInfo = () => {
    const {
      data: { subscriptionDetails }
    } = this.state;

    const totalPrice = this.calculatePrice(
      subscriptionDetails.size,
      subscriptionDetails.duration,
      1
    );

    const price = this.calculatePrice(
      subscriptionDetails.size,
      subscriptionDetails.duration,
      subscriptionDetails.upfrontPayment === 'yes'
        ? this.upfrontPaymentCharges
        : 1
    );

    const formattedPrice = this.getFormattedPrice(price);
    const formatterTotalPrice = this.getFormattedPrice(totalPrice);

    return (
      <Typography
        variant='subtitle1'
        gutterBottom
        className={this.props.classes.information}
      >
        You pay{' '}
        {subscriptionDetails.upfrontPayment === 'yes' ? (
          <span
            className={this.props.classes.totalPrice}
          >{`${formatterTotalPrice} `}</span>
        ) : (
          ''
        )}
        {`${formattedPrice} for
          ${subscriptionDetails.duration} months
          subscription of ${subscriptionDetails.size}GB data`}
      </Typography>
    );
  };

  renderActiveForm = () => {
    const { activeStep, data } = this.state;
    switch (activeStep) {
      case 0:
        return (
          <SubscriptionForm
            formData={data.subscriptionDetails}
            onSubmit={this.onSubmit}
            onPrev={this.onPrev(0, 'subscriptionDetails')}
          />
        );
      case 1:
        return (
          <ShippingDetailsForm
            formData={data.shippingDetails}
            onSubmit={this.onSubmit}
            onPrev={this.onPrev(0, 'shippingDetails')}
          />
        );
      case 2:
        return (
          <PaymentDetailsForm
            formData={data.paymentDetails}
            onSubmit={this.onSubmit}
            onPrev={this.onPrev(1, 'paymentDetails')}
          />
        );
      default:
        return (
          <ConfirmationPage
            details={this.getOrderDetails()}
            onSubmit={this.onConfirmOrder}
            onPrev={this.onPrev(2)}
          />
        );
    }
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} md={6} className={classes.form}>
          <Paper className={classes.paper}>
            {this.renderHeader()}
            {this.renderSteps()}
            {activeStep > 0 &&
              activeStep < 3 &&
              this &&
              this.renderSubscriptionInfo()}
            {this.renderActiveForm()}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SubscriptionOrderProcessForm);
