import LeagueAvg from './LeagueAvg.json';

function App() {
  return (
    <div>
      <header>
        <h2>LEAGUE AVERAGES</h2>
      </header>
      <nav>
        <p className="league-title selected">LEAGUE1</p>
        <p className="league-title">LEAGUE2</p>
      </nav>
      {console.log(LeagueAvg)}
    </div>
  );
}

export default App;
