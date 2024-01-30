import { Grid, Typography } from "@mui/material";

import FieldInput from "../../components/FieldInput";

import { Container, PaperStyled } from "./Home.styles";
import { useState } from "react";
import LedMatrix from "../../components/LedMatrix";

const aspectRatios = [
  {
    value: "sixteen-by-nine",
    label: "16:9",
    aspectRatio: 16 / 9,
  },
  {
    value: "eight-by-nine",
    label: "8:9",
    aspectRatio: 8 / 9,
  },
  {
    value: "one-by-one",
    label: "1:1",
    aspectRatio: 1,
  },
];

interface IInputs {
  cabinetsWidth: number;
  cabinetsTall: number;
  cabinetsPerCircuit: number;
  aspectRatio: string;
}

const HomePage = () => {
  const [inputs, setInputs] = useState<IInputs>({
    cabinetsWidth: 5,
    cabinetsTall: 5,
    cabinetsPerCircuit: 5,
    aspectRatio: "sixteen-by-nine",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = name !== "aspectRatio" ? parseInt(value, 10) : value;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: parsedValue,
    }));
  };

  console.log({ inputs });

  return (
    <Container container>
      <Grid item xs={8} marginTop={"4rem"}>
        <PaperStyled elevation={2}>
          <Typography variant="h6" textAlign="center">
            Micro Led Configuration Tool
          </Typography>

          <FieldInput
            label="Number of Cabinets Wide:"
            name="cabinetsWidth"
            id="cabinets-width"
            type="number"
            value={inputs.cabinetsWidth}
            onChange={handleInputChange}
            className="width-100"
          />

          <FieldInput
            label="Number of Cabinets Tall:"
            name="cabinetsTall"
            id="cabinets-tall"
            type="number"
            value={inputs.cabinetsTall}
            onChange={handleInputChange}
            className="width-100"
          />

          <FieldInput
            label="Number of Cabinets Per Circuit:"
            name="cabinetsPerCircuit"
            id="cabinets-per-circuit"
            type="number"
            value={inputs.cabinetsPerCircuit}
            onChange={handleInputChange}
            className="width-100"
          />

          <FieldInput
            select
            SelectProps={{
              native: true,
            }}
            label="Aspect Ratio:"
            name="aspectRatio"
            id="aspect-ratio"
            value={inputs.aspectRatio}
            onChange={handleInputChange}
          >
            {aspectRatios.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FieldInput>

          <LedMatrix
            width={inputs.cabinetsWidth}
            tall={inputs.cabinetsTall}
            aspectRatio={
              aspectRatios.find((option) => option.value === inputs.aspectRatio)
                ?.aspectRatio || 1
            }
          />
        </PaperStyled>
      </Grid>
    </Container>
  );
};

export default HomePage;
