import { data, getData } from '../data/investments';

interface TableProps {
  tittle: string;
  totalProfit: number;
  totalProfitPercentage: number;
}

export default function Table() {
  const orderedData: {
    investmentTime: string;
    month: number;
    value: number;
    values: [];
    name: string;
    id: string;
  }[] = [];

  const investmentsData = getData();

  console.log(investmentsData);
  // const { investments, reports } = data;

  // investments.map((i) => {
  //   reports.map((r) => {
  //     i.id === r.investmentId &&
  //       orderedData.push({
  //         id: r.id,
  //         name: i.description,
  //         month: r.month,
  //         value: r.value,
  //         values: [],
  //         investmentTime: `${r.month}/${r.year}`,
  //       });
  //   });
  // });

  // orderedData
  //   .sort(function (a, b) {
  //     if (a.month < b.month) return -1;
  //     if (a.month > b.month) return 1;
  //     return 0;
  //   })
  //   .sort(function (a, b) {
  //     if (a.name < b.name) return -1;
  //     if (a.name > b.name) return 1;
  //     return 0;
  //   });

  // const formattedTotalProfit = new Intl.NumberFormat('pt-BR', {
  //   style: 'currency',
  //   currency: 'BRL',
  // }).format(totalProfit);

  // const formattedTotalProfitPercentage = new Intl.NumberFormat('default', {
  //   style: 'percent',
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  // }).format(totalProfitPercentage / 100);

  return (
    <>
      {investmentsData.map((investment) => {
        <div className='mx-auto w-[90vw] border p-4 mt-4'>
          <header className='text-center'>
            <div className='text-xl font-bold mb-2'>{investment.description}</div>
            <div className='font-bold'>
              Rendimento total:
              <span className='text-green-500'>614</span>
            </div>
          </header>
          ;
          <section>
            <ul>
              <li className='flex justify-between border-b-2 py-2'>
                <div className='w-[20vw] flex justify-between '>
                  <p>Janeiro</p>
                  <p>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(33.222)}
                  </p>
                </div>
                <p>{33.321}</p>
              </li>
            </ul>
          </section>
        </div>;
      })}
    </>
  );
}
