import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Formik } from "formik";
import { TextField, Grid, MenuItem } from "@material-ui/core";

interface ICreditCardDetailsFormProps {
  formData: ICreditCardDetails;
  onSubmit: (type: string, data: ICreditCardDetails) => void;
  onPrev: (e?: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const numberOfFutureYears = 50;

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

const CreditCardDetailsForm: React.FC<ICreditCardDetailsFormProps> = (
  props: ICreditCardDetailsFormProps
) => {
  const { formData, onSubmit, onPrev } = props;
  const classes = useStyles();
  const formProps = {
    initialValues: formData,
    onSubmit: (values: ICreditCardDetails) =>
      onSubmit("creditCardDetails", values)
  };

  const options = {
    months: [
      { value: 0, label: "January" },
      { value: 1, label: "February" },
      { value: 2, label: "March" },
      { value: 3, label: "April" },
      { value: 4, label: "May" },
      { value: 5, label: "June" },
      { value: 6, label: "July" },
      { value: 7, label: "August" },
      { value: 8, label: "September" },
      { value: 9, label: "October" },
      { value: 10, label: "November" },
      { value: 11, label: "December" }
    ],
    years: Array.apply(null, Array(numberOfFutureYears)).reduce(
      (acc: IMenuOption[], curr: any, index: number) => [
        ...acc,
        {
          value: new Date().getFullYear() + index,
          label: new Date().getFullYear() + index
        }
      ],
      []
    )
  };

  const renderForm = (formProps: any) => {
    const { values, handleChange, handleSubmit } = formProps;
    return (
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <TextField
            id="number"
            label="Credit Card Number"
            name="number"
            required
            className={classes.textField}
            value={values.lastName || ""}
            onChange={handleChange}
            helperText="Credit Card Number"
            margin="normal"
          />
          <TextField
            id="month"
            select
            label="Month"
            name="month"
            required
            className={classes.textField}
            value={values.expDate.month || ""}
            onChange={handleChange}
            margin="normal"
          >
            {options.months.map((month: IMenuOption) => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="year"
            select
            label="Year"
            name="year"
            required
            className={classes.textField}
            value={values.expDate.year || ""}
            onChange={handleChange}
            margin="normal"
          >
            {options.years.map((year: IMenuOption) => (
              <MenuItem key={year.value} value={year.value}>
                {year.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="cvv"
            label="CVV"
            name="cvv"
            required
            type="password"
            className={classes.textField}
            value={values.cvv || ""}
            onChange={handleChange}
            margin="normal"
          />
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
      <header>Payment Details</header>
      <Formik {...formProps}>{renderForm}</Formik>
    </>
  );
};

export default CreditCardDetailsForm;
