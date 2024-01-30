import { MatrixContainer, StyledBox } from "./LedMatrix.styles";

interface LedMatrixProps {
  width: number;
  tall: number;
  cabinets: number;
  aspectRatio: number;
}

const circuitColors = ['red', '#00FF00', '#0000FF', 'black', 'green'];
const LedMatrix: React.FC<LedMatrixProps> = ({ width, tall, aspectRatio, cabinets }) => {
  const boxWidth = 100 / width;
  const boxHeight = boxWidth / aspectRatio;

  const boxes = [];

  for (let x = 0; x < width; x++) {
    let colorIndex = x;

    if (cabinets >= tall * (x + 1)) {
      colorIndex = 0;
    }

    const color = circuitColors[colorIndex];

    for (let y = tall - 1; y >= 0; y--) {
      const boxNumber = x * tall + (tall - y);

      let barHeight = (tall - 1) * boxHeight;
      if (tall < 3 && cabinets >= tall && x === 0) {
        barHeight = 2 * (tall - 1) * boxHeight;
      }

      if (cabinets >= tall * (x + 1) && x < width - 1) {
        barHeight = (tall - 1) * boxHeight;
      }

      boxes.push(
        <StyledBox
          key={boxNumber}
          style={{ width: `${boxWidth}%`, height: `${boxHeight}vh`, position: 'relative' }}
          aspectRatio={aspectRatio}
        >
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: color,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          }} />
          <div style={{ position: 'absolute', top: '1px', left: '6%', transform: 'translateX(-50%)', zIndex: 2 }}>
            {boxNumber}
          </div>

          {y === tall - 1 && (
            <div style={{
              position: 'absolute',
              bottom: '50%',  
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: `${barHeight}vh`,  
              backgroundColor: color,
              zIndex: 1,
            }} />
          )}
        </StyledBox>
      );
    }
  }

  const rows = [];
  for (let y = 0; y < tall; y++) {
    const rowBoxes = [];
    for (let x = 0; x < width; x++) {
      const boxIndex = x * tall + y;
      rowBoxes.push(boxes[boxIndex]);
    }
    rows.push(
      <div key={y} style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        {rowBoxes}
      </div>
    );
  }

  return <MatrixContainer>{rows.reverse()}</MatrixContainer>;
};

export default LedMatrix;
