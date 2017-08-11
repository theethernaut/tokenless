import TruffleContract from 'truffle-contract';
import MarketArtifacts from '../../../build/contracts/Market.json';
import * as web3Util from '../../utils/Web3Util';

export const CONNECT_MARKET = 'market/CONNECT';

export function connectMarket(address) {
  console.log('connectMarket()', address);
  return async function(dispatch, getState) {

    const market = {};
    const web3 = getState().network.web3;

    // Retrieve market.
    const Market = TruffleContract(MarketArtifacts);
    Market.setProvider(web3.currentProvider);
    const contract = await Market.at(address);
    market.contract = contract;

    // Extract static market info.
    market.statement = await contract.statement.call();
    market.positivePredicionBalance = +web3.fromWei((await contract.getPredictionBalance(true)).toNumber());
    market.negativePredicionBalance = +web3.fromWei((await contract.getPredictionBalance(false)).toNumber());
    market.blocksUntilBetsClose = await getMarketBlocksUntilBetsClose(web3, contract);
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
  if(state === 3) return 'Finished';
  return 'unknwon';
}

async function getMarketBlocksUntilBetsClose(web3, contract) {
  return new Promise(async (resolve) => {
    const blockNumber = await web3Util.getBlockNumber(web3);
    const endBlock = (await contract.endBlock.call()).toNumber();
    const remaining = endBlock - blockNumber;
    resolve(remaining);
  });
}
