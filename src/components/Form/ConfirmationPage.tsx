import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography
} from '@material-ui/core';

interface IConfirmationPageFormProps {
  details: {
    subscription: string;
    shipping: string;
    payment: string;
  };
  onSubmit: (e?: React.SyntheticEvent<HTMLFormElement>) => void;
  onPrev: (e?: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    header: {
      textAlign: 'center'
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '30px 0'
    },
    orderSummary: {
      marginBottom: 50
    },
    details: {
      marginBottom: 30
    }
  })
);

const ConfirmationPage: React.FC<IConfirmationPageFormProps> = (
  props: IConfirmationPageFormProps
) => {
  const classes = useStyles();
  const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);
  const { onPrev, onSubmit } = props;

  const handleChange = () => setIsAgreedToTerms(!isAgreedToTerms);

  const renderSubscriptionDetails = () => (
    <>
      <Typography variant='subtitle2' gutterBottom>
        Subscription Details
      </Typography>
      <Typography variant='body2' className={classes.details}>
        {props.details.subscription}
      </Typography>
    </>
  );

  const renderShippingDetails = () => (
    <>
      <Typography variant='subtitle2' gutterBottom>
        Shipping Details
      </Typography>
      <Typography variant='body2' className={classes.details}>
        {props.details.shipping}
      </Typography>
    </>
  );

  const renderPaymentDetails = () => (
    <>
      <Typography variant='subtitle2'>Payment Details</Typography>
      <Typography variant='body2' className={classes.details}>
        {props.details.payment}
      </Typography>
    </>
  );

  const renderOrderSummary = () => (
    <div className={classes.orderSummary}>
      <Typography variant='h6' gutterBottom>
        Please review your order
      </Typography>
      {renderSubscriptionDetails()}
      {renderShippingDetails()}
      {renderPaymentDetails()}
    </div>
  );

  const renderForm = () => {
    const termsURL = process.env.REACT_APP_TERMS;
    return (
      <form noValidate autoComplete='off' onSubmit={onSubmit}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                id='isAgreedToTerms'
                name='isAgreedToTerms'
                checked={isAgreedToTerms}
                onChange={handleChange}
              />
            }
            label={
              <div>
                I accept the{' '}
                <a href={termsURL} target='_blank' rel='noopener noreferrer'>
                  Terms and Conditions.
                </a>
              </div>
            }
          />
        </FormGroup>
        <Grid item xs={12} className={classes.footer}>
          <Button onClick={onPrev}>Back</Button>
          <Button
            variant='contained'
            color='primary'
            disabled={!isAgreedToTerms}
            type='submit'
          >
            Confirm
          </Button>
        </Grid>
      </form>
    );
  };

  return (
    <>
      {renderOrderSummary()}
      {renderForm()}
    </>
  );
};

export default ConfirmationPage;
