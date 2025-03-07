import { useState } from "react";
import HoldInput from "./components/HoldInput";
import MovementInput from "./components/MovementInput";
import DifficultyMatrix from "./components/DifficultyMatrix";
import BoulderCalculator from "./components/BoulderCalculator";

function App() {
  const [holds, setHolds] = useState([]);
  const [movements, setMovements] = useState([]);
  const [startHolds, setStartHolds] = useState([]);
  const [matrix, setMatrix] = useState({
    "Lock-off": { Jugs: 1.5, Crimps: 3, Slopers: 4, Pinches: 3, Edges: 2.5 },
    "Down-pull": { Jugs: 1, Crimps: 2.5, Slopers: 3.5, Pinches: 2.5, Edges: 2 },
    "Cross": { Jugs: 3, Crimps: 5, Slopers: 6, Pinches: 5, Edges: 4 },
    "Sidepull": { Jugs: 2, Crimps: 4, Slopers: 4, Pinches: 3, Edges: 3 },
    "Undercling": { Jugs: 2, Crimps: 4, Slopers: 5, Pinches: 4, Edges: 3.5 },
    "Deadpoint": { Jugs: 3, Crimps: 5, Slopers: 6, Pinches: 5, Edges: 4 },
    "Gaston": { Jugs: 3.5, Crimps: 5.5, Slopers: 6.5, Pinches: 5.5, Edges: 4.5 },
  });

  const resetAll = () => {
    setHolds([]);
    setMovements([]);
    setStartHolds([]);
    setMatrix({
      "Lock-off": { Jugs: 1.5, Crimps: 3, Slopers: 4, Pinches: 3, Edges: 2.5 },
      "Down-pull": { Jugs: 1, Crimps: 2.5, Slopers: 3.5, Pinches: 2.5, Edges: 2 },
      "Cross": { Jugs: 3, Crimps: 5, Slopers: 6, Pinches: 5, Edges: 4 },
      "Sidepull": { Jugs: 2, Crimps: 4, Slopers: 4, Pinches: 3, Edges: 3 },
      "Undercling": { Jugs: 2, Crimps: 4, Slopers: 5, Pinches: 4, Edges: 3.5 },
      "Deadpoint": { Jugs: 3, Crimps: 5, Slopers: 6, Pinches: 5, Edges: 4 },
      "Gaston": { Jugs: 3.5, Crimps: 5.5, Slopers: 6.5, Pinches: 5.5, Edges: 4.5 },
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Boulder Difficulty Calculator</h1>
      
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <HoldInput holds={holds} setHolds={setHolds} startHolds={startHolds} setStartHolds={setStartHolds} />
        <MovementInput movements={movements} setMovements={setMovements} holds={holds} />
        <DifficultyMatrix matrix={matrix} setMatrix={setMatrix} />
        <BoulderCalculator holds={holds} movements={movements} matrix={matrix} startHolds={startHolds} />
        <button
          onClick={resetAll}
          className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded w-full"
        >
          Reset All Data
        </button>
      </div>
    </div>
  );
}

export default App;