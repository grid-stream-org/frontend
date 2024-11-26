import { useState } from 'react'

import { Button } from '@components/Button'
import { MqttButton } from '@components/MqttButton'
import getWithAuth from '@services/api/api'
import { useAuth } from '@state/AuthProvider/AuthProvider'

// NOt sure
const Dashboard = () => {
  const [loading, isLoading] = useState(false)
  const [data, setData] = useState('')
  const { user } = useAuth()
  const topic = 'projects/adsf1234dfgr1234'

  const handleButtonClick = async () => {
    try {
      isLoading(true)
      const response = await getWithAuth(user.token, 'projects/projId')
      setData(JSON.stringify(response.data))
    } catch (error) {
      console.log(error)
    } finally {
      isLoading(false)
    }
  }

  const handleIncomingMessage = data => {
    // Calculate the total sum of currentOutput from the data array
    const totalOutput = data.reduce((acc, obj) => acc + obj.currentOutput, 0)

    console.log('Total Output:', totalOutput)
  }

  return (
    <>
      <h1>Dashboard!</h1>
      <MqttButton topic={topic} onMessageCallback={handleIncomingMessage} />
      <Button onClick={handleButtonClick}>Get Project Info</Button>
      {data && <h1>{data}</h1>}
      {loading && <h1>Loading..</h1>}
    </>
  )
}

export default Dashboard
