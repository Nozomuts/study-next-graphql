import { AppProps } from 'next/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.scss';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className='portfolio-app'>
      <Navbar />
      {Component.name === 'Home' && <Hero />}
      <div className='container'>
        <Component {...pageProps} />
      </div>
    </div>
  );
};

export default App;
