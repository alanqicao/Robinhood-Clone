import './App.css';
import Header from './Header'
import Newsfeed from './Newsfeed'
import Stats from './Stats'

function App() {
  return (
    <div className="App">
        {/*Header*/}
        <div className="app__header">
            <Header />
        </div>
        {/*body*/}
        <div className="app__body">
            <div className="app__container">
              <Newsfeed/>
              <Stats/>
            </div>
        </div>

        {/*Header*/}
    </div>
  );
}

export default App;
