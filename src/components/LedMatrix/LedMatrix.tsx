import { MatrixContainer, StyledBox } from "./LedMatrix.styles";

interface LedMatrixProps {
  width: number;
  tall: number;
  aspectRatio: number;
}

const LedMatrix: React.FC<LedMatrixProps> = ({ width, tall, aspectRatio }) => {
  let boxWidth: any, boxHeight: any;
  // Width of each box as a percentage of the container width
  // Calculate the box size based on the aspect ratio and the number of boxes
  const containerWidth = 100; // 100% of the container width
  boxWidth = containerWidth / width; // Width of each box as a percentage of the container width
  boxHeight = boxWidth / aspectRatio; // Height of each box based on the aspect ratio

  // Generate rows and columns
  const rows = Array.from({ length: tall }, (_, rowIndex) => (
    <div key={rowIndex} style={{ display: "flex", width: "100%" }}>
      {Array.from({ length: width }, (_, colIndex) => (
        <StyledBox
          key={colIndex}
          style={{ width: `${boxWidth}%`, height: `${boxHeight}vw` }}
          aspectRatio={aspectRatio}
        />
      ))}
    </div>
  ));

  return <MatrixContainer>{rows}</MatrixContainer>;
};

export default LedMatrix;
