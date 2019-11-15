import React from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import {
  SubscriptionForm,
  UserDetailsForm,
  CreditCardDetailsForm,
  ConfirmationPage
} from "../../components/Form";

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
      backgroundColor: "#282c34",
      minHeight: "100vh",
      alignItems: "center"
    },
    form: { margin: "0 auto" },
    paper: {
      padding: theme.spacing(5),
      color: theme.palette.text.secondary
    }
  });

class SubscriptionOrderProcessForm extends React.Component<
  ISubscriptionProcessFormProps,
  ISubscriptionProcessFormState
> {
  constructor(props: ISubscriptionProcessFormProps) {
    super(props);

    this.state = this.getEmptyState();
  }

  getEmptyState = () => ({
    steps: [
      "Subscription details",
      "Personal details",
      "Payment details",
      "Confirmation"
    ],
    activeStep: 0,
    data: {
      subscriptionDetails: {
        duration: 3,
        size: 5,
        payment: "no"
      },
      userDetails: {
        lastName: "",
        firstName: "",
        email: "",
        streetAddress: ""
      },
      creditCardDetails: {
        number: "",
        expMonth: "",
        expYear: "",
        cvv: ""
      }
    }
  });

  handleActiveStep = (activeStep: number) => this.setState({ activeStep });

  onSubmit = (
    type: string,
    data: ISubscriptionDetails | IUserDetails | ICreditCardDetails
  ) => {
    this.setState(prevState => ({
      ...prevState,
      activeStep: prevState.activeStep + 1,
      data: {
        ...this.getEmptyState().data,
        [type]: data
      }
    }));
  };

  onPrev = (activeStep: number) => () => this.setState({ activeStep });

  onConfirmOrder = (e?: React.SyntheticEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    console.log(`Here's the data`, this.state.data);
  }

  renderActiveForm = () => {
    const { activeStep, data } = this.state;
    switch (activeStep) {
      case 0:
        return (
          <SubscriptionForm
            formData={data.subscriptionDetails}
            onSubmit={this.onSubmit}
            onPrev={this.onPrev(0)}
          />
        );
      case 1:
        return (
          <UserDetailsForm
            formData={data.userDetails}
            onSubmit={this.onSubmit}
            onPrev={this.onPrev(0)}
          />
        );
      case 2:
        return (
          <CreditCardDetailsForm
            formData={data.creditCardDetails}
            onSubmit={this.onSubmit}
            onPrev={this.onPrev(1)}
          />
        );
      default:
        return (
          <ConfirmationPage
            onSubmit={this.onConfirmOrder}
            onPrev={this.onPrev(2)}
          />
        );
    }
  };

  render() {
    const { classes } = this.props;
    const { activeStep, steps } = this.state;
    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} md={6} className={classes.form}>
          <Paper className={classes.paper}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {this.renderActiveForm()}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SubscriptionOrderProcessForm);
