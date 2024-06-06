import React from 'react';
import logo from '../assets/swap/moralis-logo.svg';
import eth from '../assets/swap/eth.svg';

const Header = (props) => {
  const { address, isConnected, connect } = props;

  return (
    <header>
      <div className="leftH">
        <div className="headerItem">Swap</div>
        <div className="headerItem">Tokens</div>
      </div>
      <div className="rightH">
        <div className="headerItem ethItem">
          <img src={eth} alt="eth" className="eth" />
          Ethereum
        </div>
        <div className="connectButton" onClick={connect}>
          {isConnected ? address.slice(0, 4) + '...' + address.slice(38) : 'Connect'}
        </div>
      </div>
    </header>
  );
};

export default Header;
