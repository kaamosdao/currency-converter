import React, { useEffect } from 'react';
import axios from 'axios';

const Convertation: React.FC = () => {
  useEffect(() => {
    console.log(process.env.REACT_APP_GEO_KEY);
  });
  return <p>Convertation</p>;
};

export default Convertation;
