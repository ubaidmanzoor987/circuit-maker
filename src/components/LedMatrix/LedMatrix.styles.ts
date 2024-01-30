import styled from "@emotion/styled";

import { COLORS } from "../../constants/colors";
import { Box } from "@mui/material";

export const MatrixContainer = styled.div`
  width: 100%; // Ensure it takes full width of the parent
  display: flex;
  flex-direction: column;
`;

export const StyledBox = styled(Box)<{ aspectRatio: number }>`
  position: relative;
  aspect-ratio: ${(props) => `1 / ${props.aspectRatio}`};
  background-color: ${COLORS.GREY_C};
  border: 1px solid #999;
`;


