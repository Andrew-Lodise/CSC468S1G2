// src/head.js
import { Helmet } from 'react-helmet';

function headElements() {
  return (
    <div>
    <Helmet>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
    </Helmet>
    </div>
  );
}

export default headElements;