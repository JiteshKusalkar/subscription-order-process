import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Formik } from "formik";
import { TextField, Grid } from "@material-ui/core";

interface IUserDetailsFormProps {
  formData: IUserDetails;
  onSubmit: (type: string, data: IUserDetails) => void;
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

const UserForm: React.FC<IUserDetailsFormProps> = (
  props: IUserDetailsFormProps
) => {
  const { formData, onSubmit, onPrev } = props;
  const classes = useStyles();
  const formProps = {
    initialValues: formData,
    onSubmit: (values: IUserDetails) => onSubmit("userDetails", values)
  };

  const renderForm = (formProps: any) => {
    const { values, handleChange, handleSubmit } = formProps;
    return (
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <TextField
            id="lastName"
            label="Last Name"
            name="lastName"
            required
            className={classes.textField}
            value={values.lastName || ""}
            onChange={handleChange}
            helperText="Last Name"
            margin="normal"
          />
          <TextField
            id="firstName"
            label="First Name"
            name="firstName"
            required
            className={classes.textField}
            value={values.firstName || ""}
            onChange={handleChange}
            helperText="First Name"
            margin="normal"
          />
          <TextField
            id="email"
            label="Email"
            name="email"
            required
            type="email"
            className={classes.textField}
            value={values.email || ""}
            onChange={handleChange}
            helperText="Email"
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
      <header>Personal Details</header>
      <Formik {...formProps}>{renderForm}</Formik>
    </>
  );
};

export default UserForm;
