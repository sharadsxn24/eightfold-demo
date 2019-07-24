import React from "react";

const TokenItem = ({ token, onRemove }) => {
  return (
    <div className="autosuggest_token">
      {token.Title}
      <span onClick={onRemove}>x</span>
    </div>
  );
};

export default TokenItem;
