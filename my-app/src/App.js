import './App.css';
import { Foot, Head, SearchBar, ParticipantList, Preview } from './components/index'

function App() {
  return (
    <div className="App">
      <Head></Head>
      <Preview></Preview>

      <div className="ParticipantContainer">
        <SearchBar></SearchBar>
        <div className="Participants">
          <ParticipantList></ParticipantList>
        </div>
      </div>
    </div>
  );
}

export default App;
