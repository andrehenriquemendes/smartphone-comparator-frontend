import React from 'react';
import './App.css';
import Routes from './routes';

import logo from './assets/logo-menor.png';


function App({history}) {

  function handleHome(event) {
    event.preventDefault();

    history.push('/');
  }
  

  return (
    <>
    <div className="container">
      <div className="content">
        <div className="menu">
          <div className="logo"><a href="/" ><img src={logo} className="logo"/></a></div>
          <div className="icons">
            <a href="https://www.instagram.com/mestrephone/" target="_blank"><i className='fab fa-instagram' /></a>
            <a href="https://www.facebook.com/mestrephone/" target="_blank"><i className='fab fa-facebook-square' /></a>
          </div>
        </div>
        
        <Routes />
      
    </div>
    </div>
    <footer id="footer">
      <div className="footerLeft">
        <p>O site encontra-se em versão Beta.<br />
        Seu feedback é importante para aperfeiçoá-lo.</p>
      </div>
      <div className="footerRight">
        <p>Copyright © 2020 | Mestre Phone</p>
      </div>
  </footer>
  </>
  );
}

export default App;
