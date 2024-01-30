import { Grid, InputLabel } from "@mui/material";

import { IInputProps } from "./FieldInput.types";

import { FieldInputStyled } from "./FieldInput.styles";

const FieldInput = ({ className, id, label, ...props }: IInputProps) => {
  return (
    <Grid item xs={12} marginTop={"1rem"}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <FieldInputStyled id={id} {...props} className={`${className}`} />
    </Grid>
  );
};

export default FieldInput;
