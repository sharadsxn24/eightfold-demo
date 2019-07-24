import React from "react";
import TokenItem from "../TokenItem";

const TokenInput = ({ tokens, onChange, onRemove }) => {
  const handleChange = e => {
    const text = e.target.value;
    onChange(text);
  };

  return (
    <div className="autosuggest_input">
      {tokens.map(token => (
        <TokenItem key={token.imdbID} token={token} onRemove={() => onRemove(token)} />
      ))}
      <input type="text" onChange={handleChange} />
    </div>
  );
};

export default TokenInput;
