import { useEffect, useState } from 'react';

interface IYear {
  year: string;
}

interface ITable {
  partidas: [
    {
      visitante: string;
      pontuacao_geral_visitante: {
        total_pontos: number;
        total_vitorias: number;
        total_empates: number;
        total_derrotas: number;
        total_gols_marcados: number;
        total_gols_sofridos: number;
      };
      mandante: string;
      pontuacao_geral_mandante: {
        total_pontos: number;
        total_vitorias: number;
        total_empates: number;
        total_derrotas: number;
        total_gols_marcados: number;
        total_gols_sofridos: number;
      };
    }
  ];
}

export const useTable = ({ year }: IYear) => {
  const [table, setTable] = useState<ITable[]>([]);

  useEffect(() => {
    if (!year) return;

    if (year === '2003' || year === '2004') {
      fetch(`http://localhost:3001/${year}?numero=46`)
        .then((res) => res.json())
        .then((data) => setTable(data));
    } else if (year === '2005') {
      fetch(`http://localhost:3001/${year}?numero=42`)
        .then((res) => res.json())
        .then((data) => setTable(data));
    } else {
      fetch(`http://localhost:3001/${year}?numero=38`)
        .then((res) => res.json())
        .then((data) => setTable(data));
    }
  }, [year]);

  return { table };
};
