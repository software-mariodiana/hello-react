import logo from './logo.svg';
import { useLinearSpinAnimation } from './Animation';
import { useState, useEffect } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  useEffect(() => console.log('Rendering App component.'));
  
  // The logo animation is controlled via this custom hook.
  useLinearSpinAnimation({ className: 'App-logo', duration: 20 });

  return (
    <div style={styles.app}>
      <header style={styles.appHeader}>
        <img src={logo} style={styles.appLogo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          style={styles.appLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div style={{paddingTop: '30px'}}>Count: {count}</div>
        <button style={{marginTop: '10px'}} onClick={e => setCount(count + 1)}>
          Increment
        </button>
      </header>
    </div>
  );
};

const styles = {
  app: {
    textAlign: 'center',
  },
  appLogo: {
    height: '40vmin',
    pointerEvents: 'none',
  },
  appHeader: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
  appLink: {
    color: '#61dafb',
  },
};

export default App;
