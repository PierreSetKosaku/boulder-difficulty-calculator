function BoulderCalculator({ holds, movements, matrix }) {
    const calculateDifficulty = () => {
      if (holds.length < 2) return 0; // Prevents crashes when there are not enough holds
      
      let totalDifficulty = 0;
  
      for (let i = 0; i < movements.length; i++) {
        const hold1 = holds[i];
        const hold2 = holds[i + 1];
        const movement = movements[i];
  
        const distance = Math.sqrt((hold2.x - hold1.x) ** 2 + (hold2.y - hold1.y) ** 2) * 20;
        const holdFactor = matrix[movement][hold1.type];
  
        totalDifficulty += holdFactor * (1 + distance / 50);
      }
  
      return totalDifficulty.toFixed(2);
    };
  
    const calculateAvgDifficulty = () => {
      if (holds.length < 2) return 0; // Prevents crashes when there are not enough holds

      let totalDifficulty = calculateDifficulty();
      let AvgDifficultyPerHold = 0;

      AvgDifficultyPerHold = totalDifficulty / holds.length;

      return AvgDifficultyPerHold.toFixed(2);
    };
    
    const calculateHardestMoveDifficulty = () => {
      if (holds.length < 2) return 0; // Prevents crashes when there are not enough holds
    
      let hardestMove = 0;
    
      for (let i = 0; i < movements.length; i++) {
        const hold1 = holds[i];
        const hold2 = holds[i + 1];
        const movement = movements[i];
    
        const distance = Math.sqrt((hold2.x - hold1.x) ** 2 + (hold2.y - hold1.y) ** 2) * 20;
        const holdFactor = matrix[movement][hold1.type];
    
        const moveDifficulty = holdFactor * (1 + distance / 50);
    
        if (moveDifficulty > hardestMove) {
          hardestMove = moveDifficulty; // Store the max difficulty move
        }
      }
    
      return hardestMove.toFixed(2);
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