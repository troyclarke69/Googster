import React from 'react';
import Speech from 'react-speech';

export default Speech = () => {
    React.render(
        <Speech text="Welcome to react speech" />,
        document.getElementById('node')
      );
}
  