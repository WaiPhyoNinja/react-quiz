import './App.css';
import { useState } from 'react';
import Info from './components/Info';


function App() {
  const [start, setStart] = useState(false);
  return (
    <div className="App">

        { !start ?
           <>
           <div className="start_btn" onClick={() => setStart(true)}>
            <button>Start Quiz</button>
          </div>
           </> : 
           <>
           <Info quizStart={setStart}/>
           </>
        }
    </div>
  );
}

export default App;
