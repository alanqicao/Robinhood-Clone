import React from 'react';
import './Newsfeed.css';
import LineGraph from './LineGraph'

function Newsfeed() {
  return (
    <div className='newsfeed'>
      <div className="newsfeed__container">
            <div className='newsfeed__cartSection'>
              <div className="newsfeed__portfolio">
                <h1>$114,656</h1>
                <p>+$42.63 (+0.04%) Today</p>

              </div>
              <div className="newsfeed__chart">
                <LineGraph/>
              </div>
            </div>
      </div>
      
    </div>
  )
}

export default Newsfeed
