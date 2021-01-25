import React,{useState, useEffect} from 'react';
import './Stats.css';
import axios from 'axios';
import StatsRow from './StatsRow';
import {db} from './fireBase';
import {key} from './api'
function Stats() {

    const [stockData, setstockData] = useState([]);
    const KEY_URL = `&token=${key}`;
    const BASE_URL = "https://finnhub.io/api/v1/quote?symbol=";

    const [myStocks, setmyStocks] =useState([]);

    const getMyStocks = () =>{
      db
      .collection('myStocks')
      .onSnapshot(snapshot =>{
        console.log(snapshot.docs)
        let promises = [];
        let tempData = [];
        snapshot.docs.map((doc)=>{
          promises.push(getStockData(doc.data().ticker)
          .then(res =>{
            tempData.push({
              id:doc.id,
              data: doc.data(),
              info: res.data
            })
          })
          )
        })
        Promise.all(promises).then(()=>{
          console.log(tempData)
          setmyStocks(tempData);
        })
      })
    };

    const getStockData = (stock) =>{
      return axios
        .get(`${BASE_URL}${stock}${KEY_URL}`)
        .catch((error)=>{
          console.log("Error",error.message);
        })
    }

    useEffect(() => {
      getMyStocks();
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
          {myStocks.map((stock)=>(
                <StatsRow
                  key={stock.data.ticker}
                  name={stock.data.ticker}
                  openPrice={stock.info.o}
                  shares={stock.data.shares}
                  price={stock.info.c}
                />
              ))} 
             
          </div>
        </div>

        <div className="stats__header stats__lists">
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
