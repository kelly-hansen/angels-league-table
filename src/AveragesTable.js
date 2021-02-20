import LeagueAvg from './LeagueAvg.json';

function AveragesTable(props) {
  const tableFields = [
    {
      displayName: 'Pos',
      dataKey: 'split'
    },
    {
      displayName: 'Age',
      dataKey: 'age'
    },
    {
      displayName: 'Pros Age',
      dataKey: 'prospect_age'
    },
    {
      displayName: 'AVG',
      dataKey: 'avg'
    },
    {
      displayName: 'OBP',
      dataKey: 'obp'
    },
    {
      displayName: 'SLG',
      dataKey: 'slg'
    },
    {
      displayName: 'OPS',
      dataKey: 'ops'
    },
    {
      displayName: 'TM OPS',
      dataKey: 'tm_ops'
    },
    {
      displayName: 'wOBA',
      dataKey: 'woba'
    },
    {
      displayName: 'BABIP',
      dataKey: 'babip'
    },
    {
      displayName: 'Exit Velo',
      dataKey: 'avg_exit_velo'
    },
    {
      displayName: '% > 90mph',
      dataKey: 'exit_velo_90_plus'
    },
    {
      displayName: '% > 100mph',
      dataKey: 'exit_velo_100_plus'
    },
    {
      displayName: 'Sw',
      dataKey: 'swing_per'
    },
    {
      displayName: 'Sw In Zone',
      dataKey: 'swing_per_kzone'
    },
    {
      displayName: 'Ch',
      dataKey: 'chase_per'
    },
    {
      displayName: 'Ch 2K',
      dataKey: 'chase_per_2k'
    },
    {
      displayName: 'Ms',
      dataKey: 'miss_per'
    },
    {
      displayName: 'Ms Ch',
      dataKey: 'miss_chase_per'
    },
    {
      displayName: 'G/F',
      dataKey: 'gb_per_fb'
    },
    {
      displayName: 'AB/HR',
      dataKey: 'ab_per_hr'
    },
    {
      displayName: 'AB/UBB',
      dataKey: 'ab_per_ubb'
    },
    {
      displayName: 'AB/SO',
      dataKey: 'ab_per_so'
    },
    {
      displayName: 'GB%',
      dataKey: 'gb_per'
    },
    {
      displayName: 'UBB%',
      dataKey: 'ubb_per'
    },
    {
      displayName: 'K%',
      dataKey: 'so_per'
    }
  ];

  const positions = ['overall', 'AL', 'NL', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'];

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {tableFields.map(field => {
                return <th key={field.dataKey}>{field.displayName}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {positions.map(pos => {
              return (
                <tr key={pos}>
                  <td className="pos">{pos}</td>
                  {tableFields.map((field, ind) => {
                    if (ind !== 0) {
                      for (let i = 0; i < LeagueAvg.length; i++) {
                        if (LeagueAvg[i].league === props.league && LeagueAvg[i].split === pos) {
                          return <td key={pos + field.dataKey}>{LeagueAvg[i][field.dataKey]}</td>;
                        }
                      }
                    }
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
