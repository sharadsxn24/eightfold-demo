import React from "react";
import TokenItem from "../TokenItem";

const TokenInput = ({ tokens, maxTokens = 5, minChars = 3, onChange, onRemove }, inputRef) => {
  
  const KEY_BACKSPACE = 8;

  const handleChange = e => {
    const text = e.target.value;
    if (text.length >= minChars) {
      onChange(text);
    }
  };

  const onKeyDown = e => {
    if(e.which === KEY_BACKSPACE && !!tokens.length && !e.target.value){
      onRemove(tokens[tokens.length - 1]);
    }
  }

  return (
    <React.Fragment>
      <div className="autosuggest_input">
        {tokens.map(token => (
          <TokenItem key={token.imdbID} token={token} onRemove={() => onRemove(token)} />
        ))}
        {tokens.length < maxTokens ?
          <input ref={inputRef} type="text" onChange={handleChange} onKeyDown={onKeyDown} />
          : null
        }
      </div>
      <p className="autosuggest_info">
        {tokens.length === maxTokens
          ? `* You can add maximum ${maxTokens} movies.`
          : `* Type minimum ${minChars} characters to search.`
        }
      </p>
    </React.Fragment>
  );
};

export default React.forwardRef(TokenInput);
