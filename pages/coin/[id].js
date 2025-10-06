import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js'
import { fetchCoinAndChartSSR } from '@/lib/coingecko'
import Link from 'next/link'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export async function getServerSideProps({ params }) {
  try {
    const { id } = params
    const data = await fetchCoinAndChartSSR(id)
    return { props: { id, data } }
  } catch (e) {
    return { props: { id: params.id, data: null, error: e.message || 'Failed to fetch' } }
  }
}

export default function CoinDetail({ id, data }) {
  if (!data) {
    return (
      <div className="container py-6">
        <Link className="text-blue-600 hover:underline" href="/">← Back</Link>
        <h1 className="text-2xl font-bold mt-4">{id}</h1>
        <div className="mt-4 text-red-600">Failed to load coin details.</div>
      </div>
    )
  }
  const { detail, chart } = data

  const chartData = useMemo(() => {
    const prices = chart?.prices || []
    return {
      labels: prices.map(p => new Date(p[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
      datasets: [
        {
          label: `${detail.name} Price (USD)`,
          data: prices.map(p => p[1]),
          borderColor: 'rgb(37, 99, 235)',
          backgroundColor: 'rgba(37, 99, 235, 0.2)'
        }
      ]
    }
  }, [chart, detail])

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { x: { display: true }, y: { display: true } }
  }

  return (
    <div className="container py-6">
      <Link className="text-blue-600 hover:underline" href="/">← Back</Link>
      <div className="flex items-end justify-between mt-4 mb-6">
        <h1 className="text-3xl font-bold">{detail.name} ({detail.symbol?.toUpperCase()})</h1>
        <div className="text-xl font-semibold">${detail.market_data?.current_price?.usd?.toLocaleString()}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white rounded shadow-sm p-4">
          <h2 className="font-semibold mb-2">7D Price</h2>
          <Line data={chartData} options={chartOptions} />
        </div>
        <div className="bg-white rounded shadow-sm p-4 prose max-w-none">
          <h2 className="font-semibold">About</h2>
          <div dangerouslySetInnerHTML={{ __html: detail.description?.en || 'No description.' }} />
        </div>
      </div>
    </div>
  )
}
