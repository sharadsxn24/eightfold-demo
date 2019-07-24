import React, { useState } from "react";
import TokenInput from "../TokenInput";
import SuggestionList from "../SuggestionList";
import { debounce } from "../../utils";
import "./styles.css";

const AutoSuggest = () => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [tokens, setTokens] = useState([]);

  const onChange = debounce(async text => {
    if (text.length > 2) {
      let resp = await fetch(`http://www.omdbapi.com/?s=${text}&apikey=66f13d85&type=movie`);
      resp = await resp.json();
      setItems(resp.Search || []);
    } else {
      setItems([]);
    }
    setQuery(text);
  }, 200);

  const onSelect = token => {
    const t = tokens.find(t => t.imdbID === token.imdbID);
    if (!t) {
      setTokens([...tokens, token]);
    }
    setItems([]);
  };
  const onRemove = token => {
    const arr = [...tokens];
    const index = arr.findIndex(t => t.imdbID === token.imdbID);
    if (index > -1) {
      arr.splice(index, 1);
      setTokens([...arr]);
    }
  };

  return (
    <div className="autosuggest">
      <TokenInput tokens={tokens} onChange={onChange} onRemove={onRemove} />
      <SuggestionList items={items} onSelect={onSelect} query={query} />
    </div>
  );
};

export default AutoSuggest;
