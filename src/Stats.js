import React,{useState, useEffect} from 'react'
import './Stats.css'
import axios from 'axios'
import StatsRow from './StatsRow'
function Stats() {

    const [stockData, setstockData] = useState([]);
    const TOKEN = "c04j48n48v6u76cjohu0";
    const BASE_URL = "https://finnhub.io/api/v1/quote?symbol=";

    const getStockData = (stock) =>{
      return axios
        .get(`${BASE_URL}${stock}&token=${TOKEN}`)
        .catch((error)=>{
          console.log("Error",error.message);
        })
    }

    useEffect(() => {
       let tempStocksData =[];
        const stocksList = ["AAPL","MSFT","TSLA","FB","BABA","UBER","DIS","SBUX"];

        let promises = [];
        
        stocksList.map((stock)=>{
          promises.push(
            getStockData(stock)
            .then((res)=>{
              tempStocksData.push({
                name:stock,
                ...res.data
              });
            })
          )
        });

        Promise.all(promises).then(()=>{
            setstockData(tempStocksData);
        })

    }, [])


  return (
    <div className='stats'>
      <div className="stats__container">
        <div className="stats__header">
          <p>Stocks</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
          {/* {stockData.map((stock)=>{
                <StatsRow
                  key={stock.data.ticker}
                  name={stock.data.ticker}
                  openPrice={stock.info.o}
                  volume={stock.data.shares}
                  price={stock.info.c}
                />
              })} */}
          </div>
        </div>

        <div className="stats__header">
          <p>Lists</p>

        </div>
        <div className="stats__content">
          <div className="stats__rows">
          {stockData.map((stock) => (
              <StatsRow
                key={stock.name}
                name={stock.name}
                openPrice={stock.o}
                price={stock.c}
              />
            ))}
          {/* {stocks we can buy} */}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Stats
