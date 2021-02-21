import LeagueAvg from './LeagueAvg.json';
import AveragesTable from './AveragesTable';
import { useState } from 'react';

function App() {
  const [league, setLeague] = useState('MLB');

  function handleChangeLeague(e) {
    setLeague(e.target.textContent);
  }

  return (
    <div>
      <header>
        <h2>DEB IS HOT</h2>
      </header>
      <nav>
        <h3 onClick={handleChangeLeague} className={`league-title${league === 'MLB' ? ' selected' : ''}`}>MLB</h3>
        <h3 onClick={handleChangeLeague} className={`league-title${league === 'AAA' ? ' selected' : ''}`}>AAA</h3>
      </nav>
      <AveragesTable league={league} />
      {console.log(LeagueAvg)}
    </div>
  );
}

export default App;
