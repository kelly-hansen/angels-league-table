import LeagueAvgData from './LeagueAvg.json';
import { useEffect, useState } from 'react';

function AveragesTable(props) {
  const [sortBy, setSortBy] = useState('split');
  const [ascending, setAscending] = useState(false);
  const positions = ['Overall', props.league === 'MLB' ? 'AL' : 'INT', props.league === 'MLB' ? 'NL' : 'PCL', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'];
  const [displayPositions, setDisplayPositions] = useState(positions);

  useEffect(() => {
    setDisplayPositions(['Overall', props.league === 'MLB' ? 'AL' : 'INT', props.league === 'MLB' ? 'NL' : 'PCL', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH']);
  }, [props.league]);

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

  function sortTable(dataKey) {
    if (dataKey === 'split') {
      setDisplayPositions(positions);
      return;
    }
    let excludeLeagues = positions.slice(3);
    excludeLeagues.sort((a, b) => {
      let valueA;
      let valueB;
      for (let i = 0; i < LeagueAvgData.length; i++) {
        if (LeagueAvgData[i].league === props.league) {
          if (LeagueAvgData[i].split === a) {
            valueA = LeagueAvgData[i][dataKey];
          } else if (LeagueAvgData[i].split === b) {
            valueB = LeagueAvgData[i][dataKey];
          }
        }
      }
      return valueB - valueA;
    });
    let reverse = ascending;
    if (dataKey === sortBy) {
      reverse = !reverse;
      setAscending(prevAscending => {
        return !prevAscending;
      });
    }
    if (reverse) {
      excludeLeagues.reverse();
    }
    setDisplayPositions(positions.slice(0, 3).concat(excludeLeagues));
  }

  function handleThClick(e) {
    const dataKey = e.target.getAttribute('data-key');
    sortTable(dataKey);
    setSortBy(dataKey);
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {tableFields.map(field => {
                return (
                <th key={field.dataKey} data-key={field.dataKey} onClick={handleThClick}>
                  {field.displayName}
                  {field.dataKey !== 'split' && field.dataKey === sortBy ?
                    (ascending ?
                      <div className="asc-desc-arrow" data-key={field.dataKey}>&#9650;</div>
                    :
                      <p className="asc-desc-arrow" data-key={field.dataKey}>&#9660;</p>
                    ) :
                    false
                  }
                </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {displayPositions.map((pos, posInd) => {
              return (
                <tr key={pos} className={posInd < 3 ? 'league-row' : 'position-row'}>
                  {tableFields.map((field, ind) => {
                    for (let i = 0; i < LeagueAvgData.length; i++) {
                      if (LeagueAvgData[i].league === props.league && LeagueAvgData[i].split === pos) {
                        return <td key={pos + field.dataKey} className={sortBy === field.dataKey ? 'selected-column' : ''}>{field.displayNum(LeagueAvgData[i][field.dataKey])}</td>;
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
