import React from "react";
import SuggestionItem from "../SuggestionItem";

const SuggestionList = ({ items, query, visible, onSelect }) => {
  return (
    <React.Fragment>
      {items.length ? (
        <div className={'autosuggest_list' + (visible ? ' visible' : '')}>
          {items.map(item => (
            <li key={item.imdbID} onClick={() => onSelect(item)}>
              <SuggestionItem query={query} item={item} onSelect={onSelect} />
            </li>
          ))}
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default React.memo(SuggestionList);
