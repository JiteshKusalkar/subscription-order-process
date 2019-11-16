import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Formik, FormikProps } from 'formik';
import { TextField, Grid, MenuItem, Typography } from '@material-ui/core';
import * as Yup from 'yup';

interface IPaymentDetailsFormProps {
  formData: IPaymentDetails;
  onSubmit: (type: string, data: IPaymentDetails) => void;
  onPrev: (e?: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const numberOfFutureYears = 50;

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
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '30px 0'
    },
    expDate: {
      width: 150
    },
    cvv: {
      width: 200
    }
  })
);

const validationSchema = Yup.object().shape({
  number: Yup.string()
    .matches(/^\d{16}$/, '16 digits required')
    .required('Required'),
  expMonth: Yup.string().required('Required'),
  expYear: Yup.string().required('Required'),
  cvv: Yup.string()
    .min(3, 'Min. 3 characters')
    .max(4, 'Max. 4 characters')
    .matches(/^\S*$/, 'No white spaces')
    .required('Required')
});

const PaymentDetailsForm: React.FC<IPaymentDetailsFormProps> = (
  props: IPaymentDetailsFormProps
) => {
  const { formData, onSubmit, onPrev } = props;
  const classes = useStyles();
  const formProps = {
    initialValues: formData,
    validationSchema,
    onSubmit: (values: IPaymentDetails) =>
      onSubmit('paymentDetails', values)
  };

  const options = {
    months: [
      { value: '01', label: 'January(01)' },
      { value: '02', label: 'February(02)' },
      { value: '03', label: 'March(03)' },
      { value: '04', label: 'April(04)' },
      { value: '05', label: 'May(05)' },
      { value: '06', label: 'June(06)' },
      { value: '07', label: 'July(07)' },
      { value: '08', label: 'August(08)' },
      { value: '09', label: 'September(09)' },
      { value: '10', label: 'October(10)' },
      { value: '11', label: 'November(11)' },
      { value: '12', label: 'December(12)' }
    ],
    years: Array.apply(null, Array(numberOfFutureYears)).reduce(
      (acc: IMenuOption[], curr: any, index: number) => [
        ...acc,
        {
          value: `${new Date().getFullYear() + index}`,
          label: `${new Date().getFullYear() + index}`
        }
      ],
      []
    )
  };

  const renderForm = (formProps: FormikProps<IPaymentDetails>) => {
    const {
      errors,
      values,
      touched,
      handleChange,
      handleSubmit,
      setTouched
    } = formProps;
    return (
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <TextField
            id='number'
            label='Credit Card Number'
            name='number'
            required
            className={classes.textField}
            value={values.number || ''}
            onChange={handleChange}
            onBlur={() => setTouched({ ...touched, number: true })}
            helperText={touched.number ? errors.number : ''}
            error={touched.number && !!errors.number}
            margin='normal'
            fullWidth
          />
          <TextField
            id='expMonth'
            select
            label='Month'
            name='expMonth'
            required
            className={classes.textField}
            value={values.expMonth || ''}
            onChange={handleChange}
            onBlur={() => setTouched({ ...touched, expMonth: true })}
            helperText={touched.expMonth ? errors.expMonth : ''}
            error={touched.expMonth && !!errors.expMonth}
            margin='normal'
            inputProps={{
              className: classes.expDate
            }}
          >
            {options.months.map((month: IMenuOption) => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id='expYear'
            select
            label='Year'
            name='expYear'
            required
            className={classes.textField}
            value={values.expYear || ''}
            onChange={handleChange}
            onBlur={() => setTouched({ ...touched, expYear: true })}
            helperText={touched.expYear ? errors.expYear : ''}
            error={touched.expYear && !!errors.expYear}
            margin='normal'
            inputProps={{
              className: classes.expDate
            }}
          >
            {options.years.map((year: IMenuOption) => (
              <MenuItem key={year.value} value={year.value}>
                {year.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id='cvv'
            label='CVV'
            name='cvv'
            required
            type='password'
            className={classes.textField}
            value={values.cvv || ''}
            onChange={handleChange}
            onBlur={() => setTouched({ ...touched, cvv: true })}
            helperText={touched.cvv ? errors.cvv : ''}
            error={touched.cvv && !!errors.cvv}
            margin='normal'
            inputProps={{
              className: classes.cvv
            }}
          />
        </Grid>
        <Grid item xs={12} className={classes.footer}>
          <Button onClick={onPrev}>Back</Button>
          <Button variant='contained' color='primary' type='submit'>
            Next
          </Button>
        </Grid>
      </form>
    );
  };

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Payment Details
      </Typography>
      <Formik {...formProps}>{renderForm}</Formik>
    </>
  );
};

export default PaymentDetailsForm;
