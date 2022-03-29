import './App.css';
import React from 'react';
import PathfindingVisualiser from './PathfindingVisualiser/PathfindingVisualiser';
import Navbar from './components/Navbar/Navbar';
import Lengend from './components/Legend';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Lengend />
      <PathfindingVisualiser></PathfindingVisualiser>
    </div>
  );
}

export default App;
