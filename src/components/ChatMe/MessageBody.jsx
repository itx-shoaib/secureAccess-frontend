import React from 'react';
import Card from 'react-bootstrap/Card';
import { message } from './utils';

const MessageBody = () => {
  return (
    <div style={{ height: "80vh",width:"100%", background: "red", display: "flex", flexDirection: "column", overflow:"scroll",  }}>
    {message.map((messages)=> (
      <div key={messages.id} style={{ padding:"10px",display: "flex", justifyContent: messages.sendBy === "user" && "flex-end" }}>
      <div style={{maxWidth: "50%",display: "flex",flexDirection:"column"}}>
        <Card >
          <Card.Body>{messages.message}</Card.Body>
        </Card>
        <p>12:12 am</p>
      </div>
      </div>
      )
    )}
    </div>
  );
}

export default MessageBody;
