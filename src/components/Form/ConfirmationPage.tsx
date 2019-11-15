import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";

interface IConfirmationPageFormProps {
  onSubmit: (e?: React.SyntheticEvent<HTMLFormElement>) => void;
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
      padding: "30px 0"
    },
    header: {
      textAlign: "center"
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

  const renderForm = () => {
    return (
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                id="isAgreedToTerms"
                name="isAgreedToTerms"
                checked={isAgreedToTerms}
                onChange={handleChange}
              />
            }
            label="Agree to Terms and Conditions"
          />
        </FormGroup>
        <Grid item xs={12} className={classes.footer}>
          <Button onClick={onPrev}>Back</Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!isAgreedToTerms}
            type="submit"
          >
            Confirm
          </Button>
        </Grid>
      </form>
    );
  };

  return (
    <>
      <header className={classes.header}>Confirm your order</header>
      {renderForm()}
    </>
  );
};

export default ConfirmationPage;
