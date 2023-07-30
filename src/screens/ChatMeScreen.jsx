import React from 'react'
import MessageBody from '../components/ChatMe/MessageBody'
import MessageSend from '../components/ChatMe/MessageSend'
import ScrollableFeed from 'react-scrollable-feed'

const ChatMeScreen = () => {
  return (
    <ScrollableFeed>
      <MessageBody/>
      <MessageSend/>
    </ScrollableFeed>
  )
}

export default ChatMeScreen
