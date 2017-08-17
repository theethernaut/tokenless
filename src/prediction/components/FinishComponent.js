import React from 'react';

const FinishComponent = () => {
  return (
    <div className='panel panel-default'>
      <div className="panel-heading">
        <strong>This prediction has been finished</strong>
      </div>
      <div className="panel-body">
        <form className="">
          <div className="form-group">
            <small className="text-info">
              This prediction has been resolved and all bets, prizes
              and fees have been withdrawn from the smart contract.
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FinishComponent;