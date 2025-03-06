function DifficultyMatrix({ matrix, setMatrix }) {
    const handleChange = (move, hold, value) => {
      setMatrix((prevMatrix) => ({
        ...prevMatrix,
        [move]: { ...prevMatrix[move], [hold]: Number(value) },
      }));
    };
  
    const getColor = (value) => {
      if (value <= 3) return "bg-green-300";
      if (value > 3 && value <= 5) return "bg-orange-300";
      return "bg-red-400";
    };
  
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-blue-300">Difficulty Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-600 text-white">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-600 px-4 py-2">Movement</th>
                <th className="border border-gray-600 px-4 py-2">Jugs</th>
                <th className="border border-gray-600 px-4 py-2">Crimps</th>
                <th className="border border-gray-600 px-4 py-2">Slopers</th>
                <th className="border border-gray-600 px-4 py-2">Pinches</th>
                <th className="border border-gray-600 px-4 py-2">Edges</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(matrix).map((move) => (
                <tr key={move} className="bg-gray-800 hover:bg-gray-700">
                  <td className="border border-gray-600 px-4 py-2 text-blue-400 font-semibold">{move}</td>
                  {Object.keys(matrix[move]).map((hold) => (
                    <td key={hold} className={`border border-gray-600 px-4 py-2 ${getColor(matrix[move][hold])}`}>
                      <input
                        type="number"
                        value={matrix[move][hold]}
                        onChange={(e) => handleChange(move, hold, e.target.value)}
                        className="w-16 p-1 bg-gray-700 text-white rounded text-center"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  export default DifficultyMatrix;