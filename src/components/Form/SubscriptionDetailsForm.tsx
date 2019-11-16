import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Formik, FormikProps } from 'formik';
import { MenuItem, TextField, Grid, Typography } from '@material-ui/core';
import * as Yup from 'yup';

interface ISubscriptionDetailsFormProps {
  formData: ISubscriptionDetails;
  onSubmit: (type: string, data: ISubscriptionDetails) => void;
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
      marginRight: theme.spacing(1),
      width: '30%'
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '30px 0'
    }
  })
);

const validationSchema = Yup.object().shape({
  duration: Yup.number().required('Require'),
  size: Yup.number().required('Required'),
  upfrontPayment: Yup.string().required('Required')
});

const SubscriptionForm: React.FC<ISubscriptionDetailsFormProps> = (
  props: ISubscriptionDetailsFormProps
) => {
  const { formData, onSubmit, onPrev } = props;
  const classes = useStyles();
  const formProps = {
    initialValues: formData,
    validationSchema,
    onSubmit: (values: ISubscriptionDetails) =>
      onSubmit('subscriptionDetails', values)
  };

  const options = {
    duration: [
      { value: 3, label: '3 Months' },
      { value: 6, label: '6 Months' },
      { value: 12, label: '12 Months' }
    ],
    size: [
      { value: 3, label: '3 GB' },
      { value: 5, label: '5 GB' },
      { value: 10, label: '10 GB' },
      { value: 20, label: '20 GB' },
      { value: 30, label: '30 GB' },
      { value: 50, label: '50 GB' }
    ],
    upfrontPayment: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ]
  };

  const renderForm = (formProps: FormikProps<ISubscriptionDetails>) => {
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
            id='duration'
            select
            label='Duration'
            name='duration'
            required
            className={classes.textField}
            value={values ? values.duration : ''}
            onChange={handleChange}
            onBlur={() => setTouched({ ...touched, duration: true })}
            helperText={touched.duration ? errors.duration : ''}
            error={touched.duration && !!errors.duration}
            margin='normal'
          >
            {options.duration.map(duration => (
              <MenuItem key={duration.value} value={duration.value}>
                {duration.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id='size'
            select
            label='Size'
            name='size'
            required
            className={classes.textField}
            value={values ? values.size : ''}
            onChange={handleChange}
            onBlur={() => setTouched({ ...touched, size: true })}
            helperText={touched.size ? errors.size : ''}
            error={touched.size && !!errors.size}
            margin='normal'
          >
            {options.size.map(size => (
              <MenuItem key={size.value} value={size.value}>
                {size.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id='upfrontPayment'
            select
            label='Upfront payment'
            name='upfrontPayment'
            required
            className={classes.textField}
            value={values ? values.upfrontPayment : false}
            onChange={handleChange}
            onBlur={() => setTouched({ ...touched, upfrontPayment: true })}
            helperText={touched.upfrontPayment ? errors.upfrontPayment : ''}
            error={touched.upfrontPayment && !!errors.upfrontPayment}
            margin='normal'
          >
            {options.upfrontPayment.map(upfrontPayment => (
              <MenuItem
                key={upfrontPayment.label}
                value={`${upfrontPayment.value}`}
              >
                {upfrontPayment.label}
              </MenuItem>
            ))}
          </TextField>
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
      <Typography variant='h6'>Select your subscription</Typography>
      <Typography variant='subtitle2' gutterBottom>
        Save flat 10% with an upfront payment.
      </Typography>
      <Formik {...formProps}>{renderForm}</Formik>
    </>
  );
};

export default SubscriptionForm;
