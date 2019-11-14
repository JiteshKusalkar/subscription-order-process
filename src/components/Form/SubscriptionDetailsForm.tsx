import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Formik } from "formik";
import { MenuItem, TextField, Grid } from "@material-ui/core";

interface ISubscriptionDetailsFormProps {
  formData: ISubscriptionDetails;
  onSubmit: (type: string, data: ISubscriptionDetails) => void;
  onPrev: (e?: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      padding: 30
    }
  })
);

const SubscriptionForm: React.FC<ISubscriptionDetailsFormProps> = (
  props: ISubscriptionDetailsFormProps
) => {
  const { formData, onSubmit, onPrev } = props;
  const classes = useStyles();
  const formProps = {
    initialValues: formData,
    onSubmit: (values: ISubscriptionDetails) =>
      onSubmit("subscriptionData", values)
  };

  const options = {
    duration: [
      { value: 3, label: "3 Months" },
      { value: 6, label: "6 Months" },
      { value: 12, label: "12 Months" }
    ],
    size: [
      { value: 3, label: "3 GB" },
      { value: 5, label: "5 GB" },
      { value: 10, label: "10 GB" },
      { value: 20, label: "20 GB" },
      { value: 30, label: "30 GB" },
      { value: 50, label: "50 GB" }
    ],
    payment: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]
  };

  const renderForm = (formProps: any) => {
    const { values, handleChange, handleSubmit } = formProps;
    return (
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <TextField
            id="duration"
            select
            label="Duration"
            name="duration"
            required
            className={classes.textField}
            value={values ? values.duration : ""}
            onChange={handleChange}
            helperText="Please select your duration"
            margin="normal"
          >
            {options.duration.map(duration => (
              <MenuItem key={duration.value} value={duration.value}>
                {duration.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="size"
            select
            label="Size"
            name="size"
            required
            className={classes.textField}
            value={values ? values.size : ""}
            onChange={handleChange}
            helperText="Please select the size in cloud"
            margin="normal"
          >
            {options.size.map(size => (
              <MenuItem key={size.value} value={size.value}>
                {size.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="payment"
            select
            label="Upfront payment"
            name="payment"
            required
            className={classes.textField}
            value={values ? values.payment : false}
            onChange={handleChange}
            helperText="Want to do upfront payment?"
            margin="normal"
          >
            {options.payment.map(payment => (
              <MenuItem key={payment.label} value={`${payment.value}`}>
                {payment.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} className={classes.footer}>
          <Button onClick={onPrev}>Back</Button>
          <Button variant="contained" color="primary" type="submit">
            Next
          </Button>
        </Grid>
      </form>
    );
  };

  return (
    <>
      <header>Select Your Subscription</header>
      <Formik {...formProps}>{renderForm}</Formik>
    </>
  );
};

export default SubscriptionForm;
