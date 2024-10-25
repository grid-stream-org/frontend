import MqttButton from '../../components/MqttButton/MqttButton'

// NOt sure
const Dashboard = () => {
  const topic = 'projects/adsf1234dfgr1234'

  const handleIncomingMessage = data => {
    // Calculate the total sum of currentOutput from the data array
    const totalOutput = data.reduce((acc, obj) => acc + obj.currentOutput, 0)

    console.log('Total Output:', totalOutput)
  }

  return (
    <>
      <h1>Dashboard!</h1>
      <MqttButton topic={topic} onMessageCallback={handleIncomingMessage} />
    </>
  )
}

export default Dashboard
