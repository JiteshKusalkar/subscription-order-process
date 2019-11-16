import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Formik, FormikProps } from 'formik';
import { TextField, Grid, Typography } from '@material-ui/core';
import * as Yup from 'yup';

interface IShippingDetailsFormProps {
  formData: IShippingDetails;
  onSubmit: (type: string, data: IShippingDetails) => void;
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
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '30px 0'
    }
  })
);

const validationSchema = Yup.object().shape({
  lastName: Yup.string().required('Required'),
  firstName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  streetAddress: Yup.string().required('Required')
});

const ShippingDetailsForm: React.FC<IShippingDetailsFormProps> = (
  props: IShippingDetailsFormProps
) => {
  const { formData, onSubmit, onPrev } = props;
  const classes = useStyles();
  const formProps = {
    initialValues: formData,
    validationSchema,
    onSubmit: (values: IShippingDetails) => onSubmit('shippingDetails', values)
  };

  const renderForm = (formProps: FormikProps<IShippingDetails>) => {
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
            id='lastName'
            label='Last Name'
            name='lastName'
            required
            className={classes.textField}
            value={values.lastName || ''}
            onChange={handleChange}
            onBlur={() => setTouched({ ...touched, lastName: true })}
            helperText={touched.lastName ? errors.lastName : ''}
            error={touched.lastName && !!errors.lastName}
            margin='normal'
          />
          <TextField
            id='firstName'
            label='First Name'
            name='firstName'
            required
            className={classes.textField}
            value={values.firstName || ''}
            onChange={handleChange}
            onBlur={() => setTouched({ ...touched, firstName: true })}
            helperText={touched.firstName ? errors.firstName : ''}
            error={touched.firstName && !!errors.firstName}
            margin='normal'
          />
          <TextField
            id='email'
            label='Email'
            name='email'
            required
            type='email'
            className={classes.textField}
            value={values.email || ''}
            onChange={handleChange}
            onBlur={() => setTouched({ ...touched, email: true })}
            helperText={touched.email ? errors.email : ''}
            error={touched.email && !!errors.email}
            margin='normal'
          />
          <TextField
            id='streetAddress'
            label='Street Address'
            name='streetAddress'
            required
            className={classes.textField}
            value={values.streetAddress || ''}
            onChange={handleChange}
            onBlur={() => setTouched({ ...touched, streetAddress: true })}
            helperText={touched.streetAddress ? errors.streetAddress : ''}
            error={touched.streetAddress && !!errors.streetAddress}
            margin='normal'
            fullWidth
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
        Shipping Details
      </Typography>
      <Formik {...formProps}>{renderForm}</Formik>
    </>
  );
};

export default ShippingDetailsForm;
