import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import { Card } from './components/Card';
import { SubContainer } from './components/SubContainer';
import { DropBox } from './components/DropBox';
import { MainContainer } from './components/MainContainer';
import { Container } from './components/Container';

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        {/* <Card />
        <div style={{ marginBottom: '40px' }}></div>
        <DropBox />
        <div style={{ marginBottom: '40px' }}></div>
        <Container />
        <div style={{ marginBottom: '40px' }}></div>
        <MainContainer /> */}
        <Container />
      </DndProvider>
    </div>
  );
}

export default App;
