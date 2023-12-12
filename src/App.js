import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar/NavBar';
import HowToUse from './pages/Color_identification/how_to_use.js';
import Settings from './pages/Color_identification/settings.js';
import Overview from './pages/Color_in_use/overview';
import Inuse from './pages/Color_in_use/inuse';
import Home from './pages/Color_theory/Home';
import About from './pages/About';
import Easy from './pages/Color_identification/ActualMixing/easy';
import Medium from './pages/Color_identification/ActualMixing/medium';
import Hard from './pages/Color_identification/ActualMixing/hard';
import LoadingAnimation from './components/global/LoadingAnimation.js';
import './components/global/App.scss';


const App = () => {
  const [isLoaded, setIsLoaded] = useState(Math.round(Math.random()));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, Math.random() * 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Get the current URL path
  const currentPath = window.location.pathname;

  let content;

  switch (currentPath) {
    case '/about':
      content = <About />;
      break;
    case '/how-to-use':
      content = <HowToUse />;
      break;
    case '/settings':
      content = <Settings />;
      break;
    case '/overview':
      content = <Overview />;
      break;
    case '/inuse':
      content = <Inuse />;
      break;
    case '/easy':
      content = <Easy />;
      break;
    case '/medium':
      content = <Medium />;
      break;
    case '/hard':
      content = <Hard />;
      break;
    default:
      content = <Home />;
      break;
  }

  return (
    <>
      {!isLoaded && <LoadingAnimation />}
      <NavBar />
      <div className={`content ${isLoaded ? 'fade-in' : ''}`}>{content}</div>
    </>
  );
};

export default App;
