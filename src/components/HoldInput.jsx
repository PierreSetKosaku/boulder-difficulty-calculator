import { useEffect, useState } from "react";


function HoldInput({ holds, setHolds, movements, setMovements, startHolds, setStartHolds }) {
  const [checkedState, setCheckedState] = useState({});

  const addHold = () => {
    setHolds([...holds, { x: 0, y: 0, type: "Jugs" }]);
  };

  const toggleStartHold = (index) => {
    const selectedHold = holds[index];
  
    setStartHolds((prev) => {
      console.log("Previous startHolds:", prev);
      console.log("Selected Hold:", selectedHold);
  
      // Fix: Use JSON.stringify() for object comparison
      const isAlreadySelected = prev.some(h => JSON.stringify(h) === JSON.stringify(selectedHold));
  
      if (isAlreadySelected) {
        console.log("Removing hold...");
        return prev.filter(h => JSON.stringify(h) !== JSON.stringify(selectedHold));
      }
  
      if (prev.length < 2) {
        console.log("Adding hold...");
        return [...prev, selectedHold];
      }
  
      console.log("Start holds are full, not adding.");
      return prev; // No change
    });
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


  // ✅ Sync checkbox state when `startHolds` updates
  useEffect(() => {
    const newCheckedState = {};
    holds.forEach((hold, index) => {
      newCheckedState[index] = startHolds.some(h => h.x === hold.x && h.y === hold.y && h.type === hold.type);
    });
    setCheckedState(newCheckedState);
  }, [startHolds, holds]);

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
          {index < 2 && (
            <label className="flex items-center space-x-2 text-gray-300">
              <input
                type="checkbox"
                checked={checkedState[index] || false} // Check if selected
                onChange={() => toggleStartHold(index)}
                className="w-4 h-4"
              />
              <span>Start Hold</span>
            </label>
          )}
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