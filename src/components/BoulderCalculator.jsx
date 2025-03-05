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
  
    return (
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold text-green-400">Total Difficulty:</h3>
        <p className="text-3xl font-bold text-green-500">{calculateDifficulty()}</p>
      </div>
    );
  }
  
  export default BoulderCalculator;