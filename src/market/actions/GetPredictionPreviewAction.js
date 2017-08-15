import TruffleContract from 'truffle-contract';
import MarketArtifacts from '../../../build/contracts/Prediction.json';
import * as web3util from '../../utils/Web3Util';
import * as stateUtil from '../../utils/PredictionState';

export const GET_PREDICTION_PREVIEW = 'prediction/GET_PREDICTION_PREVIEW';

export function getPredictionPreview(address) {
  return async function(dispatch, getState) {
    console.log('getMarketPreview()', address);

    const preview = {};
    const web3 = getState().network.web3;

    // ---------------------
    // TODO: previews disabled because they make teh app
    // slow when there are a lot of predictions
    // ---------------------

    // Skip if preview has already been obtained.
    if(getState().market.previews[address]) {
      console.log('preview already fetched');
      return;
    }

    // Retrieve prediction.
    const Market = TruffleContract(MarketArtifacts);
    Market.setProvider(web3.currentProvider);
    const contract = await Market.at(address);

    // Extract prediction info.
    preview.address = address;
    preview.balance = 0;
    preview.isFetching = true;
    // console.log('prediction: ', prediction);

    dispatch({
      type: GET_PREDICTION_PREVIEW,
      payload: preview
    });

    preview.balance = await web3util.getBalanceInEther(address, web3);
    preview.statement = await contract.statement.call();
    preview.predictionState = (await contract.getState()).toNumber();
    preview.predictionStateStr = stateUtil.predictionStateToStr(preview.predictionState);
    preview.isFetching = false;

    dispatch({
      type: GET_PREDICTION_PREVIEW,
      payload: preview
    });
  };
}
