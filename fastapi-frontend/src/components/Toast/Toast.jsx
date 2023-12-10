import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

const Toast = () => {
    const [showToast, setShowToast] = useState(false);
  
    const toggleToast = () => setShowToast(!showToast);
  
    return (
      <Container className="p-3">
        {/* Button to Toggle Toast */}
        <button onClick={toggleToast}>Toggle Toast</button>
  
        {/* Toast Component */}
        <Toast show={showToast} onClose={toggleToast}>
          <Toast.Header>
            <strong className="me-auto">My Toast</strong>
          </Toast.Header>
          <Toast.Body>This is a toast message!</Toast.Body>
        </Toast>
      </Container>
    );
  };
  
  export default Toast;