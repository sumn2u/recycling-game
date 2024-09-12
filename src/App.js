import React, {useState} from "react";
import { Route, Routes } from "react-router-dom";
import Error from "./components/Error/Error";
import GameScreen from "./components/GameScreen/GameScreen";
import ResultScreen from "./components/ResultScreen/ResultScreen";
import LandingScreen from "./components/LandingScreen/LandingScreen";
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [count, setCount] = useState(0);
  const [funFactsModal, setFunFactsModal] = useState(false);
  const [howToPlayModal, setHowToPlayModal] = useState(false);
  const [badCount, setBadCount] = useState(0);
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const Backend = isMobile ? TouchBackend : HTML5Backend; 
  const showFunFactsModal = () => {
    setFunFactsModal(!funFactsModal);
  };

  const hideFunFactsModal = () => {
    setFunFactsModal(!funFactsModal);
  };

  const showHowToPlayModal = () => {
    setHowToPlayModal(!howToPlayModal);
    console.log("This is inside show modal function ");
  };

  const hideHowToPlayModal = () => {
    setHowToPlayModal(!howToPlayModal);
  };

  return (
    <main className="App">
      <Routes>
        <Route
          path="/"
          element={
            <LandingScreen
              funFactsModal={funFactsModal}
              setFunFactsModal={setFunFactsModal}
              showFunFactsModal={showFunFactsModal}
              hideFunFactsModal={hideFunFactsModal}
              hideHowToPlayModal={hideHowToPlayModal}
              showHowToPlayModal={showHowToPlayModal}
              howToPlayModal={howToPlayModal}
              setHowToPlayModal={setHowToPlayModal}
            />
          }
        />
        <Route
          path="/game"
          element={
            <DndProvider backend={Backend}
            options={{ enableMouseEvents: true,
            enableTouchEvents: true }}
            >
              <GameScreen
                count={count}
                setCount={setCount}
                badCount={badCount}
                setBadCount={setBadCount}
                hideHowToPlayModal={hideHowToPlayModal}
                showHowToPlayModal={showHowToPlayModal}
                howToPlayModal={howToPlayModal}
                setHowToPlayModal={setHowToPlayModal}
                funFactsModal={funFactsModal}
                setFunFactsModal={setFunFactsModal}
                showFunFactsModal={showFunFactsModal}
                hideFunFactsModal={hideFunFactsModal}
              />
            </DndProvider>
          }
        />
        <Route
          path="/results"
          element={
            <ResultScreen
              count={count}
              setCount={setCount}
              funFactsModal={funFactsModal}
              setFunFactsModal={setFunFactsModal}
              showFunFactsModal={showFunFactsModal}
              hideFunFactsModal={hideFunFactsModal}
              badCount={badCount}
              setBadCount={setBadCount}
            />
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </main>
  );
}

export default App;
