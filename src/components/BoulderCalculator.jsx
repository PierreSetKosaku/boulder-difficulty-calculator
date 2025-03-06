function BoulderCalculator({ holds, movements, matrix }) {
    const calculateDifficulty = () => {
      if (holds.length < 2) return 0;

      return holds.slice(0, -1).reduce((total, hold, i) => {
        return total + calculateMoveDifficulty(holds[i], holds[i + 1], movements[i], matrix);
      }, 0).toFixed(2);
    };

    const calculateMoveDifficulty = (hold1, hold2, movement, matrix) => {
      if (!hold1 || !hold2 || !movement) return 0; // Prevent errors
    
      // Skip calculation if a hold has (0,0) coordinates
      if ((hold1.x === 0 && hold1.y === 0) || (hold2.x === 0 && hold2.y === 0)) {
        return 0;
      }
    
      const distance = Math.sqrt((hold2.x - hold1.x) ** 2 + (hold2.y - hold1.y) ** 2) * 20;
      const holdFactor = matrix[movement][hold1.type];
    
      return holdFactor * (1 + distance / 50);
    };
  
    const calculateAvgDifficulty = () => {
      if (holds.length < 2) return 0; // Prevents crashes when there are not enough holds

      let totalDifficulty = calculateDifficulty();
      let AvgDifficultyPerHold = 0;

      AvgDifficultyPerHold = totalDifficulty / holds.length;

      return AvgDifficultyPerHold.toFixed(2);
    };

    const calculateHardestMoveDifficulty = () => {
      if (holds.length < 2) return 0;

      return holds.slice(0, -1).reduce((maxDifficulty, hold, i) => {
        const moveDifficulty = calculateMoveDifficulty(holds[i], holds[i + 1], movements[i], matrix);
        return Math.max(maxDifficulty, moveDifficulty);
      }, 0).toFixed(2);
    };
  
    return (
      <div className="flex justify-center">
        <div className="flex space-x-4">
          <h3 className="text-xl font-semibold text-green-400">Total Difficulty:</h3>
          <p className="text-3xl text-left font-bold text-green-500">{calculateDifficulty()}</p>
          <h3 className="text-xl font-semibold text-green-400">Average Difficulty / Hold:</h3>
          <p className="text-3xl font-bold text-left text-green-500">{calculateAvgDifficulty()}</p>
          <h3 className="text-xl font-semibold text-green-400">Hardest Move Difficulty:</h3>
          <p className="text-3xl font-bold text-left  text-green-500">{calculateHardestMoveDifficulty()}</p>
        </div>
      </div>
    );
  }
  
  export default BoulderCalculator;