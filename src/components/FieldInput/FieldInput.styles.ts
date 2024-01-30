import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";

import { COLORS } from "../../constants/colors";

export const FieldInputStyled = styled(TextField)`
  color: ${COLORS.GREY_7};
  margin-top: 5px;
  &.MuiTextField-root > div {
    border-radius: 5px;
    background-color: ${COLORS.WHITE_100};
    font-size: 12px;
    font-style: normal;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
  }
  &.error {
    border-color: ${COLORS.RED_100};
  }

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${COLORS.BLUE_THEME};
    }
  }
  & .MuiInputBase-input {
    height: 18px;
    font-weight: 300;
  }
`;
