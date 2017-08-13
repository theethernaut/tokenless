import TruffleContract from 'truffle-contract';
import MarketArtifacts from '../../../build/contracts/Market.json';

export const CONNECT_MARKET = 'market/CONNECT';

export function connectMarket(address) {
  return async function(dispatch, getState) {
    console.log('connectMarket()', address);

    const market = {};
    const web3 = getState().network.web3;
    const player = getState().network.activeAccountAddress;

    // Retrieve market.
    const Market = TruffleContract(MarketArtifacts);
    Market.setProvider(web3.currentProvider);
    const contract = await Market.at(address);
    market.contract = contract;

    // Listen for event (FOR DEBUGGING)...
    contract.LogAddressEvent().watch((error, result) => {
      console.log('Event', error, result);
      if(error) {
        console.log(error);
      }
      else {
        console.log(result);
      }
    });

    // Extract market info.
    console.log('getting market data... player:', player);
    // --------------------------------------------------
    // TODO: these 2 are crashing...
    // market.playerPositiveBalance = +web3.fromWei(await contract.getPlayerBalance(true, {from: player}), 'ether').toNumber();
    // market.playerNegativeBalance = +web3.fromWei(await contract.getPlayerBalance(false, {from: player}), 'ether').toNumber();
    market.playerPositiveBalance = 0.05;
    market.playerNegativeBalance = 5;
    // --------------------------------------------------
    market.statement = await contract.statement.call();
    market.positivePredicionBalance = +web3.fromWei(await contract.totals.call(true), 'ether').toNumber();
    market.negativePredicionBalance = +web3.fromWei(await contract.totals.call(false), 'ether').toNumber();
    market.owner = await contract.owner.call();
    market.marketState = (await contract.getState()).toNumber();
    market.marketStateStr = marketStateToStr(market.marketState);
    market.outcome = await contract.outcome.call();
    market.endBlock = (await contract.endBlock.call()).toNumber();
    market.killBlock = (await contract.killBlock.call()).toNumber();
    console.log('market: ', market);

    dispatch({
      type: CONNECT_MARKET,
      payload: market
    });
  };
}

function marketStateToStr(state) {
  if(state === 0) return 'Open';
  if(state === 1) return 'Closed';
  if(state === 2) return 'Resolved';
  return 'Unknwon';
}
