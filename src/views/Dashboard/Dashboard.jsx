import { useState } from 'react'

import LineChart from '../../components/LineChart/LineChart'
import MqttButton from '../../components/MqttButton/MqttButton'

const Dashboard = () => {
  const topic = 'projects/adsf1234dfgr1234'
  const [dataPoints, setDataPoints] = useState([])
  const [loading, setLoading] = useState(false)

  const handleIncomingMessage = data => {
    // calculate DER output energy
    setLoading(false)
    const totalOutput = Array.isArray(data)
      ? data.reduce((acc, obj) => acc + obj.currentOutput, 0)
      : data.currentOutput

    setDataPoints(prevData => [...prevData, [new Date(), totalOutput]])

    console.log('Total Output:', totalOutput)
  }

  return (
    <>
      <LineChart dataPoints={dataPoints} loading={loading} />
      <MqttButton topic={topic} onMessageCallback={handleIncomingMessage} setLoading={setLoading} />
    </>
  )
}

export default Dashboard
