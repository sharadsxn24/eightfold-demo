import React, { useState, useEffect, useRef } from "react";
import TokenInput from "../TokenInput";
import SuggestionList from "../SuggestionList";
import { debounce } from "../../utils";
import "./styles.css";

const AutoSuggest = () => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);
  const ref = useRef();
  const inputRef = useRef();

  const onChange = debounce(async text => setQuery(text), 200);

  const onSelect = token => {
    const t = tokens.find(t => t.imdbID === token.imdbID);
    if (!t) {
      setTokens([...tokens, token]);
      setItems([]);
      setQuery("");
      setIsListVisible(false);
    }
  };

  const onRemove = token => {
    const arr = [...tokens];
    const index = arr.findIndex(t => t.imdbID === token.imdbID);
    if (index > -1) {
      arr.splice(index, 1);
      setTokens([...arr]);
    }
  };

  // Hide suggestion list if clicked outside
  useEffect(() => {
    const onDocumentClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsListVisible(false);
      } else if (inputRef.current && inputRef.current.contains(e.target)) {
        setIsListVisible(true);
      }
    };
    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  // Search for movies when query has changed
  useEffect(() => {
    const search = async () => {
      let resp = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=66f13d85&type=movie`);
      resp = await resp.json();
      setIsListVisible(true);
      setItems(resp.Search || []);
    };
    query && search();
  }, [query]);

  // Clear and focus the input
  useEffect(() => {
    const clearInput = () => {
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    };
    clearInput();
  }, [tokens]);

  return (
    <div className="autosuggest" ref={ref}>
      <TokenInput ref={inputRef} tokens={tokens} maxTokens={5} minChars={3} onChange={onChange} onRemove={onRemove} />
      <SuggestionList items={items} query={query} onSelect={onSelect} visible={isListVisible} />
    </div>
  );
};

export default AutoSuggest;
