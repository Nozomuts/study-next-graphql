import { AppProps } from 'next/app';
import App from 'next/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.scss';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className='portfolio-app'>
      <Navbar />
      {pageProps.appData}
      {Component.name === 'Home' && <Hero />}
      <div className='container'>
        <Component {...pageProps} />
      </div>
    </div>
  );
};

MyApp.getInitialProps = async (context: any) => {
  const initialProps =
    App.getInitialProps && (await App.getInitialProps(context));

  return { pageProps: { appData: 'Hello _App Component', ...initialProps } };
};

export default MyApp;
