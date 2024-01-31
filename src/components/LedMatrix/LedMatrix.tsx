import { MatrixContainer, StyledBox } from "./LedMatrix.styles";

// Define the types for the component props
interface LedMatrixProps {
  width: number;
  tall: number;
  cabinets: number;
  aspectRatio: number;
}
// Predefined colors for the LED circuits
const circuitColors = ['red', '#00FF00', '#0000FF', 'black', 'green'];
// Function to generate a distinct color based on the number of existing colors
const generateDistinctColor = (numExistingColors:any) => {
  const hue = (numExistingColors * 137) % 360; // Using the golden angle approximation for color distribution
  return `hsl(${hue}, 100%, 50%)`;
};
const LedMatrix: React.FC<LedMatrixProps> = ({ width, tall, aspectRatio, cabinets }) => {
 // Calculate box width and height based on props
  const boxWidth = 100 / width;
  const boxHeight = boxWidth / aspectRatio;
  const boxes = [];
  let previousColor = '';
 // Create boxes for each LED position
  for (let x = 0; x < width; x++) {
    // Extend the circuitColors array with distinct colors as needed
    if (x >= circuitColors.length) {
      circuitColors.push(generateDistinctColor(circuitColors.length));
    }
    // Determine the color index for the current box, with special handling based on the number of cabinets
    let colorIndex = x % circuitColors.length;
    
    if (cabinets >= tall * (x + 1)) {
      colorIndex = 0; // Reset color for new row if cabinet condition is met
    }

    const color = circuitColors[colorIndex];

    for (let y = tall - 1; y >= 0; y--) {
      const boxNumber = x * tall + (tall - y);
      let barHeight = (tall - 1) * boxHeight;

       // Determine if a connecting bar should be added between boxes
      const shouldConnectBars = tall < 3 && previousColor === color && y === tall - 1 && (boxNumber - 1) % 4 !== 0;

      boxes.push(
        <StyledBox
          key={boxNumber}
          style={{
            width: `${boxWidth}%`,
            height: `${boxHeight}vh`,
            position: 'relative'
          }}
          aspectRatio={aspectRatio}
        >
          {/* LED Circle */}
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
          {/* Box Number */}
          <div style={{ position: 'absolute', top: '1px', left: '6%', transform: 'translateX(-50%)', zIndex: 2 }}>
            {boxNumber}
          </div>

          {/* Vertical Bar */}
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
          
          {/*  Optional connecting bar for closely placed boxes  */}
          {shouldConnectBars && (
            <div style={{
              position: 'absolute',
              bottom: `${aspectRatio + 56 - (barHeight / 2)}%`, 
              left: `-49%`,
              width: `${80 + boxWidth}%`,
              height: '2px', 
              backgroundColor: color,
              zIndex: 1,
            }} />
          )}
        </StyledBox>
      );
    }

    previousColor = color; // Update the previous color for the next iteration
  }
// Organize boxes into rows for display
  const rows = [];
  for (let y = 0; y < tall; y++) {
    const rowBoxes = [];
    for (let x = 0; x < width; x++) {
      const boxIndex = x * tall + y;
      rowBoxes.push(boxes[boxIndex]); // Add the box to the current row
    }
    // Add the current row of boxes to the rows array
    rows.push(
      <div key={y} style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        {rowBoxes}
      </div>
    );
  }
  // Render the matrix container with all rows, reversing the order to start from the bottom
  return <MatrixContainer>{rows.reverse()}</MatrixContainer>;
};

export default LedMatrix;
