import './App.css';
import WebSocketProvider from './context/WebSocket';
import TempComponent from "./component/TempComponent";
import ChartComponent from "./component/ChartComponent";

function App() {
  return (
    <div className="App">
      <WebSocketProvider>
        <header className="App-header">
          <TempComponent id={1} />
          <TempComponent id={2} />
        </header>
        <ChartComponent />
      </WebSocketProvider>
    </div>
  );
}

export default App;
