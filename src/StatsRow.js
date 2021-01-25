import React from 'react'
import StockChart from './stock.svg'
import './StatsRow.css'
import {db} from "./fireBase";
import { Doughnut } from 'react-chartjs-2';

function StatsRow(props) {
  const percentage=((props.price-props.openPrice)/props.openPrice) *100;
  
  const buyStock = ()=>{
    
        console.log("buy",props.name)
        db
        .collection('myStocks')
        .where("ticker","==",props.name)
        .get()
        .then((querySnapshot)=>{
            //update the record
          if(!querySnapshot.empty){
              

            querySnapshot.forEach(function(doc){
              db
              .collection('myStocks')
              .doc(doc.id)
              .update({
                  shares: doc.data().shares+=1
              })
              
            })
          }else{

            //add a new record
            db.collection('myStocks')
            .add({
              ticker:props.name,
              shares: 1
            })
          }
         
        })

  }

  return (
    <div className="row" onClick={buyStock}>
    <div className="row__intro">
      <h1>{props?.name}</h1>
      <p>{props.shares && 
        (props.shares + " shares")
      }</p>
    </div>
    <div className="row__chart">
      <img src={StockChart} height={16}/>
    </div>
    <div className="row__numbers">
      <p className="row__price">{props.price}</p>
      <p className="row__percentage"> {Number(percentage).toFixed(2)}%</p>
    </div>
  </div>
  )
}

export default StatsRow
