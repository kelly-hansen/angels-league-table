import LeagueAvg from './LeagueAvg.json';
import { useState } from 'react';

function AveragesTable(props) {
  const [sortBy, setSortBy] = useState('split');

  const tableFields = [
    {
      displayName: 'Pos',
      dataKey: 'split',
      displayNum: num => num
    },
    {
      displayName: 'Age',
      dataKey: 'age',
      displayNum: num => num.toFixed(1)
    },
    {
      displayName: 'Pros Age',
      dataKey: 'prospect_age',
      displayNum: num => num.toFixed(1)
    },
    {
      displayName: 'AVG',
      dataKey: 'avg',
      displayNum: num => num.toFixed(3).toString(10).substring(1)
    },
    {
      displayName: 'OBP',
      dataKey: 'obp',
      displayNum: num => num.toFixed(3).toString(10).substring(1)
    },
    {
      displayName: 'SLG',
      dataKey: 'slg',
      displayNum: num => num.toFixed(3).toString(10).substring(1)
    },
    {
      displayName: 'OPS',
      dataKey: 'ops',
      displayNum: num => num.toFixed(3).toString(10).substring(1)
    },
    {
      displayName: 'TM OPS',
      dataKey: 'tm_ops',
      displayNum: num => num.toFixed(3).toString(10).substring(1)
    },
    {
      displayName: 'wOBA',
      dataKey: 'woba',
      displayNum: num => num.toFixed(3).toString(10).substring(1)
    },
    {
      displayName: 'BABIP',
      dataKey: 'babip',
      displayNum: num => num.toFixed(3).toString(10).substring(1)
    },
    {
      displayName: 'Exit Velo',
      dataKey: 'avg_exit_velo',
      displayNum: num => num.toFixed(1)
    },
    {
      displayName: '% > 90mph',
      dataKey: 'exit_velo_90_plus',
      displayNum: num => (num * 100).toFixed(0) + '%'
    },
    {
      displayName: '% > 100mph',
      dataKey: 'exit_velo_100_plus',
      displayNum: num => (num * 100).toFixed(0) + '%'
    },
    {
      displayName: 'Sw',
      dataKey: 'swing_per',
      displayNum: num => (num * 100).toFixed(0) + '%'
    },
    {
      displayName: 'Sw In Zone',
      dataKey: 'swing_per_kzone',
      displayNum: num => (num * 100).toFixed(0) + '%'
    },
    {
      displayName: 'Ch',
      dataKey: 'chase_per',
      displayNum: num => (num * 100).toFixed(0) + '%'
    },
    {
      displayName: 'Ch 2K',
      dataKey: 'chase_per_2k',
      displayNum: num => (num * 100).toFixed(0) + '%'
    },
    {
      displayName: 'Ms',
      dataKey: 'miss_per',
      displayNum: num => (num * 100).toFixed(0) + '%'
    },
    {
      displayName: 'Ms Ch',
      dataKey: 'miss_chase_per',
      displayNum: num => (num * 100).toFixed(0) + '%'
    },
    {
      displayName: 'G/F',
      dataKey: 'gb_per_fb',
      displayNum: num => num.toFixed(1)
    },
    {
      displayName: 'AB/HR',
      dataKey: 'ab_per_hr',
      displayNum: num => num.toFixed(1)
    },
    {
      displayName: 'AB/UBB',
      dataKey: 'ab_per_ubb',
      displayNum: num => num.toFixed(1)
    },
    {
      displayName: 'AB/SO',
      dataKey: 'ab_per_so',
      displayNum: num => num.toFixed(1)
    },
    {
      displayName: 'GB%',
      dataKey: 'gb_per',
      displayNum: num => (num * 100).toFixed(0) + '%'
    },
    {
      displayName: 'UBB%',
      dataKey: 'ubb_per',
      displayNum: num => (num * 100).toFixed(0) + '%'
    },
    {
      displayName: 'K%',
      dataKey: 'so_per',
      displayNum: num => (num * 100).toFixed(0) + '%'
    }
  ];

  const positions = ['Overall', props.league === 'MLB' ? 'AL' : 'INT', props.league === 'MLB' ? 'NL' : 'PCL', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'];

  let displayPositions = positions.slice();

  function handleThClick(e) {
    const dataKey = e.target.getAttribute('data-key');
    setSortBy(dataKey);
    if (dataKey === 'split') {
      displayPositions = positions.slice();
    }
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {tableFields.map(field => {
                return <th key={field.dataKey} data-key={field.dataKey} onClick={handleThClick}>{field.displayName}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {displayPositions.map(pos => {
              return (
                <tr key={pos}>
                  {tableFields.map((field, ind) => {
                    for (let i = 0; i < LeagueAvg.length; i++) {
                      if (LeagueAvg[i].league === props.league && LeagueAvg[i].split === pos) {
                        return <td key={pos + field.dataKey} className={sortBy === field.dataKey ? 'selected-column' : ''}>{field.displayNum(LeagueAvg[i][field.dataKey])}</td>;
                      }
                    }
                    return false;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AveragesTable;
