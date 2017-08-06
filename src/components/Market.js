import React from 'react';

// TODO: remove
/*
  Test addresses:
  0x05d2b3c177c974cb70492b8ad956e1caf64077f7
*/

class Market extends React.Component {

  componentWillReceiveProps(nextProps) {

    console.log('componentWillReceiveProps - props: ', nextProps);

    // Request market fetch?
    if(nextProps.isWeb3Connected &&
      !nextProps.isMarketConnected) {
        const { address } = this.props.routeParams;
        this.props.fetchMarketAsync(address);
    }
  }

  render() {
    const {
      isWeb3Connected,
      isMarketConnected
    } = this.props;
    if(!isWeb3Connected || !isMarketConnected) {
      return (
        <div>Connecting...</div>
      );
    }
    else {
      return (
        <div>
          <h1>This is a market</h1>
          <p>statement: {this.props.market.statement}</p>
        </div>
      );
    }
  }
}

export default Market;
