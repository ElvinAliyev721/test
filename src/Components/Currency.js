import React,{useEffect,useState,useCallback} from 'react'
import '../App.css'
import { FaExchangeAlt} from "react-icons/fa";
import { SiConvertio } from "react-icons/si";
import axios from 'axios';
import {allItems} from './CurrencyItems'
const array=[];
function Currency() {
    const [fromCurrency,setFromCurrency]=useState();
    const [toCurrency,setToCurrency]=useState();
    const [amount,setAmount]=useState();
    const [result,setResult]=useState();
    const [test,setTest]=useState();
    const [loading,setIsLoading]=useState(true);
   const arr=["USD","EUR","TRY","RUB"]
   
    const fetchData=useCallback(()=>{
        axios({
            method:"GET",
            url:`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
        }).then((response)=>{
            console.log(response.data)
            setResult(response.data.result.toFixed(2));
           
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>{
            setIsLoading(false)
        });

    })
    const fetchCurr=useEffect(()=>{
        array.length=0;
        arr.map((x,i)=>{
           console.log(x)
           
            axios({
                method:"GET",
                url:`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${x}&amount=${amount}`
            }).then((response)=>{
                console.log(response.data)
                setTest(response.data.result)
                array.push(response.data.result.toFixed(2))
               
               
            }).catch((error)=>{
                console.log(error)
            });
          
          
        })
    },[fromCurrency,toCurrency])
    
    function flip() {
        var temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
      }
  return (
    <div>
        <div className='currency'>
            <div className='currencyHeader'>
            <div className='row'>
                <div className='col-lg-5'>
                <select value={fromCurrency} className='currencySelect' defaultValue={"default"} onChange={(e) => setFromCurrency(e.target.value)} required >
               <option value={"default"} disabled >  Choose an option</option>
                    <option value={'AZN'}>Azn</option>
                    <option value={'TRY'}>Lira</option>
                    <option value={'USD'}>USD</option>
                    <option value={'GEL'}>Lari</option>
                    <option value={'EUR'}>EUR</option>
                    <option value={'RUB'}>Rubl</option>
                </select>
                </div>
                <FaExchangeAlt  onClick={() => { flip()}} className='col-lg-2 exchangeIcon'/>
                <div className='col-lg-5'>
                <select value={toCurrency} className='currencySelect' defaultValue={"default"} onChange={(e) => setToCurrency(e.target.value)} >
                <option value={"default"} disabled >  Choose an option</option>
                    <option value={'AZN'}>AZN</option>
                    <option value={'TRY'}>Lira</option>
                    <option value={'USD'}>USD</option>
                    <option value={'GEL'}>Lari</option>
                    <option value={'EUR'}>EUR</option>
                    <option value={'RUB'}>Rubl</option>
                </select>
                </div>
               
            </div>
            </div>
            <div className='currencyMain'>
                <h4 className='currencyMainTitle'>Amount</h4>
                <div className='mainInput'>
                <input type="number" onChange={event => setAmount(event.target.value)}></input>
                <SiConvertio className='convertIcon' onClick={() => { fetchData();fetchCurr();}}/>
                </div>
            
                <p className='convertMoneyText'>{result} {toCurrency}</p>
               
               
            </div>
            <div className='currencyFooter'>
            {allItems.map((item,i)=>{
        return <div key={item.id} className='money'>
        <div className='row'>
            <div className='col-lg-2'>{item.icon}</div>
            <div className='col-lg-4'>{item.text}</div>
            
            <div className='col-lg-6 d-flex justify-content-end'>{array[i]}</div>
        </div>
    </div>
     })}
     
        
            </div>
        </div>
    </div>
  )
}

export default Currency