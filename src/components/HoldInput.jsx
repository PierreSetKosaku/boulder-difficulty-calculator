function HoldInput({ holds, setHolds, movements, setMovements }) {
  const addHold = () => {
    setHolds([...holds, { x: 0, y: 0, type: "Jugs" }]);
  };

  const removeHold = (index) => {
    if (holds.length > 1) {
      const updatedHolds = holds.filter((_, i) => i !== index);
      setHolds(updatedHolds);
      
      // Adjust movements safely to avoid crashes
      if (movements && index < movements.length) {
        const updatedMovements = movements.slice(0, Math.max(0, updatedHolds.length - 1));
        setMovements(updatedMovements);
      }
    }
  };

  const updateHold = (index, field, value) => {
    const updatedHolds = [...holds];
    updatedHolds[index][field] = value;
    setHolds(updatedHolds);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-blue-300">Holds</h3>
      {holds.map((hold, index) => (
        <div key={index} className="flex space-x-3 mb-2 items-center">
          <span className="text-sm text-gray-400">Hold {index + 1}:</span>
          <input
            type="number"
            value={hold.x}
            onChange={(e) => updateHold(index, "x", Number(e.target.value))}
            className="w-16 p-1 bg-gray-700 text-white rounded"
          />
          <input
            type="number"
            value={hold.y}
            onChange={(e) => updateHold(index, "y", Number(e.target.value))}
            className="w-16 p-1 bg-gray-700 text-white rounded"
          />
          <select
            value={hold.type}
            onChange={(e) => updateHold(index, "type", e.target.value)}
            className="p-1 bg-gray-700 text-white rounded"
          >
            <option value="Jugs">Jugs</option>
            <option value="Crimps">Crimps</option>
            <option value="Slopers">Slopers</option>
            <option value="Pinches">Pinches</option>
            <option value="Edges">Edges</option>
          </select>
          <button
            onClick={() => removeHold(index)}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            ✕
          </button>
        </div>
      ))}
      <button onClick={addHold} className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
        + Add Hold
      </button>
    </div>
  );
}

export default HoldInput;