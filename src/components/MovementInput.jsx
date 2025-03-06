function MovementInput({ movements, setMovements, holds }) {
  const addMovement = () => {
    if (holds.length > 1 && movements.length < holds.length - 1) {
      setMovements([...movements, "Lock-off"]);
    }
  };

  const updateMovement = (index, value) => {
    const updatedMovements = [...movements];
    updatedMovements[index] = value;
    setMovements(updatedMovements);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-blue-300">Movements</h3>
      {movements.map((move, index) => (
        <div key={index} className="flex space-x-3 mb-2">
          <span className="text-sm text-gray-400">
            Movement between Hold {index + 1} & {index + 2}:
          </span>
          <select
            value={move}
            onChange={(e) => updateMovement(index, e.target.value)}
            className="p-1 bg-gray-700 text-white rounded"
          >
            <option value="Lock-off">Lock-off</option>
            <option value="Down-pull">Down-pull</option>
            <option value="Cross">Cross</option>
            <option value="Sidepull">Sidepull</option>
            <option value="Undercling">Undercling</option>
            <option value="Deadpoint">Deadpoint</option>
            <option value="Gaston">Gaston</option>
          </select>
        </div>
      ))}
      <button
        onClick={addMovement}
        className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        disabled={movements.length >= holds.length - 1}
      >
        + Add Movement
      </button>
    </div>
  );
}

export default MovementInput;