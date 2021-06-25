import React from 'react';

const StrMatch = ({ word, index, searchParam }) => {
  let wordIndex = word.toLowerCase().indexOf(searchParam.toLowerCase());
  let first = word.slice(0, wordIndex);
  let last = word.slice(wordIndex + searchParam.length, word.length);
  return (
    <p key={index}>
      {
        <span>
          {first}
          <span style={{ backgroundColor: '#44c3c3', color: '#fff' }}>
            {searchParam.toLowerCase()}
          </span>
          {last}
        </span>
      }
    </p>
  );
};

export default StrMatch;
