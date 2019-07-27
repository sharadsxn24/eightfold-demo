import React from "react";

const SuggestionItem = ({ query, item }) => {
  const getTitle = (query, title) => {
    const match = title.match(new RegExp(query, "i"));
    if (match) {
      return item.Title.replace(match[0], `<b>${match[0]}</b>`);
    }
    return title;
  };

  return (
    <React.Fragment>
      <h3 dangerouslySetInnerHTML={{ __html: getTitle(query, item.Title) }} />
      {item.Actors ? item.Actors.split(",")[0] : ""}
    </React.Fragment>
  );
};

export default SuggestionItem;
