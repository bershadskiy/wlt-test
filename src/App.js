import './App.css';
import WebSocketProvider from './context/WebSocket';
import { TempComponent } from "./component/TempComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WebSocketProvider>
          <TempComponent id={1} />
          <TempComponent id={2} />
        </WebSocketProvider>
      </header>
    </div>
  );
}

export default App;
