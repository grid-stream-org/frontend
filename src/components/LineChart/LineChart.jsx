import { Chart } from 'react-google-charts'
import './LineChart.css'

const LineChart = ({ dataPoints, loading }) => {
  const now = new Date()
  const startWindow = new Date(now.getTime() - 1 * 60 * 1000)
  const endWindow = new Date(now.getTime() + 1 * 60 * 1000)

  const chartData = [
    ['Time', 'Total Output (kW)', 'Threshold'],
    ...dataPoints.map(([time, output]) => [time, output, 14]), // 14 is the contract agreement
  ]

  const options = {
    title: 'Household Power Output',
    hAxis: {
      title: 'Time',
      format: 'hh:mm:ss',
      viewWindow: {
        min: startWindow, //set window sizes
        max: endWindow,
      },
    },
    vAxis: { title: 'Current Output (kW)', minValue: 0, maxValue: 40 },
    legend: { position: 'none' },
    curveType: 'function',
    animation: {
      duration: 500,
      easing: 'linear',
    },
    startup: true,
    lineWidth: 2,
    series: {
      0: { color: '#1f77b4' }, // color for output
      1: { color: '#d62728', lineDashStyle: [4, 4], lineWidth: 2 }, // color thereshold line
    },
  }

  return (
    <div className="linechart-container">
      {loading ? ( //waiting for publisher
        <div className="center-content">
          <img src="/images/logo-transparent.png" className="spinning-logo" />
          <p className="status-message">Loading...</p>
        </div>
      ) : dataPoints.length > 0 ? ( // subscriber getting data
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={chartData}
          options={options}
        />
      ) : (
        //waiting for subscriber to subscribe
        <div className="center-content">
          <img src="/images/logo-transparent.png" className="spinning-logo" />
          <p className="status-message">Awaiting Connection...</p>
        </div>
      )}
    </div>
  )
}

export default LineChart
