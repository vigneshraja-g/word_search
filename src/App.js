import React, { useState, useEffect } from 'react';
import './style.css';

const url =
  'https://gist.githubusercontent.com/abhijit-paul-blippar/0f97bb6626cfa9d8989c7199f7c66c5b/raw/dcff66021fba04ee8d3c6b23a3247fb5d56ae3e5/words';

export default function App() {
  const [data, setData] = useState([]);
  const [searchParam, setSearchParam] = useState('');
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialData = async () => {
      const response = await fetch(url);
      let result = await response.text();
      let dataArr = result.split('\n');
      setData(dataArr);
      setLoading(false);
    };
    getInitialData();
  }, []);

  const searchWord = () => {
    let res = data.filter(wrd =>
      wrd.toLowerCase().includes(searchParam.toLowerCase())
    );
    setWords(res);
    setLoading(false);
  };

  useEffect(() => {
    if (searchParam.length >= 3) {
      setLoading(true);
      var timeout = setTimeout(() => searchWord(), 400);
    } else {
      setLoading(false);
      setWords([]);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [searchParam]);

  const strMatch = (word, index) => {
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

  return (
    <div className="app">
      <div>
        <h1>Word Search</h1>
        <input
          type="text"
          placeholder="Search the name"
          onChange={e => setSearchParam(e.target.value)}
        />
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          <div>
            {searchParam.length >= 3 && (
              <div>
                {words.length > 0 ? (
                  words.map((word, index) => strMatch(word, index))
                ) : (
                  <p>No data</p>
                )}
              </div>
            )}{' '}
          </div>
        )}
      </div>
    </div>
  );
}
