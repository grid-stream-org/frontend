import { useState } from 'react'

import { connectClient, disconnectClient } from '../../services/mqttClient'
import Button from '../Button/Button'

const MqttButton = ({ topic, onMessageCallback }) => {
  const [isConnected, setIsConnected] = useState(false)

  // toggle button functionality
  const handleButtonClick = () => {
    if (isConnected) {
      disconnectClient()
      setIsConnected(false)
    } else {
      connectClient(topic, onMessageCallback)
      setIsConnected(true)
    }
  }

  return (
    <Button onClick={handleButtonClick}>
      {isConnected ? 'Disconnect' : 'View Live Energy Load'}
    </Button>
  )
}

export default MqttButton
