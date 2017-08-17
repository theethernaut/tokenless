import { connectPrediction } from '.';
import { forgetPreview } from '../../market/actions/ForgetPredictionPreviewAction';

export function placeBet(bet, betEther) {
  console.log('placeBet()', bet, betEther);
  return async function(dispatch, getState) {

    const web3 = getState().network.web3;
    const prediction = getState().prediction.contract;

    // Listen for bet event...
    prediction.BetEvent().watch((error) => {
      console.log('BetEvent');
      if(error) {
        console.log('placing bet failed');
      }
      else {
        console.log('bet placed!');
        dispatch(connectPrediction(prediction.address));
        dispatch(forgetPreview(prediction.address));
      }
    });

    // Place bet
    const betWei = web3.toWei(betEther, 'ether');
    console.log('placing bet: ', prediction, betWei, getState().network.activeAccountAddress);
    await prediction.bet(bet, {
      from: getState().network.activeAccountAddress,
      value: betWei
    });
  };
}
