import React from 'react';
import Card from 'react-bootstrap/Card';

const MessageBody = () => {
  return (
    <div style={{ height: "80vh", background: "red", display: "flex", flexDirection: "column" }}>
      <div style={{ maxWidth: "50%" }}>
        <Card>
          <Card.Body>This is some text within a card body.</Card.Body>
        </Card>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <h1>Message Body 2</h1>
      </div>
      <h1>Message Body 3</h1>
    </div>
  );
}

export default MessageBody;
