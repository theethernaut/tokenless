import React from 'react';

const InfoComponent = ({
                                   positivePredicionBalance,
                                   negativePredicionBalance,
                                   isOwned,
                                   predictionState,
                                   predictionStateStr,
                                   remainingBlocks,
                                   outcome
                                 }) => {

  let predictionStateClass = 'success';
  if (predictionState === 1) predictionStateClass = 'warning';
  if (predictionState === 2 && outcome === false) predictionStateClass = 'danger';

  let stateStr = predictionStateStr;
  if (predictionState === 2) stateStr = `${predictionStateStr} for ${outcome ? 'Yes' : 'No'}`;

  const balanceTotal = positivePredicionBalance + negativePredicionBalance;
  const posPercent = 100 * positivePredicionBalance / balanceTotal;
  const negPercent = 100 * negativePredicionBalance / balanceTotal;

  return (

    <div>

      {/* POT BALANCES */}
      { balanceTotal > 0 &&
        <div className="progress">
          <div className="progress-bar progress-bar-primary" style={{width: `${posPercent}%`}}>
            <span className="">
              <span className="glyphicon glyphicon-thumbs-up"></span>
              &nbsp;
              {positivePredicionBalance}&nbsp;ETH
            </span>
          </div>
          <div className="progress-bar progress-bar-danger" style={{width: `${negPercent}%`}}>
            <span className="">
              <span className="glyphicon glyphicon-thumbs-down"></span>
              &nbsp;
              {negativePredicionBalance}&nbsp;ETH
            </span>
          </div>
        </div>
      }

      {/* BADGES */}
      <ul className='list'>

        {/* OWNED */}
        {isOwned &&
        <li className='list-inline-item'>
            <span className="label label-info">
              You own this prediction
            </span>
        </li>
        }

        {/* STATE + OUTCOME + BLOCKS REMAINING */}
        <li className='list-inline-item'>
          <span className={`label label-${predictionStateClass}`}>
            {stateStr} ({remainingBlocks})
          </span>
        </li>

      </ul>

      <br/>

    </div>
  );
};

export default InfoComponent;
