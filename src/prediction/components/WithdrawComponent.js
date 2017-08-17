import React from 'react';

const WithdrawComponent = ({
  claimAmount,
  claimMethod
}) => {

  const handleButtonClick = function() {
    claimMethod();
  };

  return (
    <div className='panel panel-info'>
      <div className="panel-heading">
        <strong>Congratulations! You have funds to withdraw from this prediction.</strong>
      </div>
      <div className="panel-body">
        <div className="form-group">
          <button
            type="button"
            className="btn btn-primary"
            onClick={(evt) => handleButtonClick()}>
            Withdraw {claimAmount} eth
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawComponent;