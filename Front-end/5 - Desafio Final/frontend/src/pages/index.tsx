import { NextPage } from 'next';
import { useState } from 'react';
import { useTable } from '../hooks/useTable';

const tableHead = ['P', 'V', 'E', 'D', 'GP', 'GC', 'S'];
const years = [
  '2003',
  '2004',
  '2005',
  '2006',
  '2007',
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
];

const Home: NextPage = () => {
  const [selectValue, setSelectValue] = useState(years[0]);
  const { table } = useTable({ year: selectValue });

  const handleUpdate = (e: any) => {
    setSelectValue(e.target.value);
  };

  const tableAway = [];
  const tableHome = [];

  tableAway.push(
    table[0]?.partidas.map((game) => {
      return {
        time: game.visitante,
        pontos: game.pontuacao_geral_visitante.total_pontos,
        vitorias: game.pontuacao_geral_visitante.total_vitorias,
        empates: game.pontuacao_geral_visitante.total_empates,
        derrotas: game.pontuacao_geral_visitante.total_derrotas,
        golsPro: game.pontuacao_geral_visitante.total_gols_marcados,
        golsContra: game.pontuacao_geral_visitante.total_gols_sofridos,
        saldoGols:
          game.pontuacao_geral_visitante.total_gols_marcados -
          game.pontuacao_geral_visitante.total_gols_sofridos,
        image: `/images/${game.visitante
          .split(' ')
          .join('_')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')}.png`,
      };
    })
  );

  tableHome.push(
    table[0]?.partidas.map((game) => {
      return {
        time: game.mandante,
        pontos: game.pontuacao_geral_mandante.total_pontos,
        vitorias: game.pontuacao_geral_mandante.total_vitorias,
        empates: game.pontuacao_geral_mandante.total_empates,
        derrotas: game.pontuacao_geral_mandante.total_derrotas,
        golsPro: game.pontuacao_geral_mandante.total_gols_marcados,
        golsContra: game.pontuacao_geral_mandante.total_gols_sofridos,
        saldoGols:
          game.pontuacao_geral_mandante.total_gols_marcados -
          game.pontuacao_geral_mandante.total_gols_sofridos,
        image: `/images/${game.mandante
          .split(' ')
          .join('_')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')}.png`,
      };
    })
  );

  const finalTable = tableHome[0]?.concat(tableAway[0]);

  const sortedFinalTable = finalTable?.sort((a, b) => {
    return a.pontos > b.pontos ? -1 : a.pontos < b.pontos ? 1 : 0;
  });

  return (
    <div className='p-20 flex flex-col items-center'>
      <h1 className='p- text-4xl font-bold'>Final Challenge Brazilian National Championship</h1>
      <select value={selectValue} onChange={handleUpdate} className='my-3 px-2'>
        {years.map((year, i) => {
          return (
            <option key={i} value={year}>
              {year}
            </option>
          );
        })}
      </select>

      <h3 className='my-3 px-2'>Brazilian Championship {selectValue}</h3>
      <p className='text-2xl font-bold my-3 px-2'>Standings</p>

      <table className='w-6/12'>
        <thead className='text-xl'>
          <tr>
            <th className='w-2 text-white'>Pos</th>
            <th className='w-2 text-white'>Img</th>
            <th className='w-fit text-white'>Time</th>
            {tableHead.map((header, i) => {
              return (
                <th key={i} className='w-10'>
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className='text-center'>
          {sortedFinalTable?.map((team, i) => {
            return (
              <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                <td>{i + 1}</td>
                <td>
                  <img className='w-6 mx-auto' src={team.image} />
                </td>

                <td className='text-left'>{team.time}</td>
                <td>{team.pontos}</td>
                <td>{team.vitorias}</td>
                <td>{team.empates}</td>
                <td>{team.derrotas}</td>
                <td>{team.golsPro}</td>
                <td>{team.golsContra}</td>
                <td>{team.saldoGols}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
