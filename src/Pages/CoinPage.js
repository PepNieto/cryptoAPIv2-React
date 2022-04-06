import { Chip, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CoinInfo from '../components/CoinInfo';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import ReactHtmlParser from 'react-html-parser';
import { red } from '@material-ui/core/colors';
//icons
import { IoIosAddCircle } from "react-icons/io";
import { BiBell, BiShareAlt } from "react-icons/bi"
  const CoinPage = () => {
  const { id } = useParams()
  const [coin, setCoin] = useState()

  const {currency, symbol } = CryptoState();

  const fetchCoin = async() =>   {
    const { data } = await axios.get(SingleCoin(id))  
    setCoin(data);
  };
  console.log(coin);
  
  useEffect(() =>{
    fetchCoin();
  },[]);

  const useStyles = makeStyles((theme) => ({
    body:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
     
    },

    container: {
      width:'80%',
      display: 'column',  
      justifyContent:'center', 
      alignItems:'center', 
      //backgroundColor:'brown',
      height: '100vh',
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
       
      },
    },
    main: {
      
     
      //backgroundColor:"#BD7B6D",
      flexDirection: "center",
      display: "column",
      alignItems: "center",
      marginTop: 25,
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      

    },
    heading:{
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Roboto",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      //Making it responsive
      [theme.breakpoints.down("md")]:{
        display:"flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]:{
        flexDirection:"column",
        alignItems:"center",
      },
      [theme.breakpoints.down("xs")]:{
        alignItems: "start",
      },
    }
  }));

  const classes = useStyles();
  if (!coin) return <LinearProgress style={{backgroundColor:"gold"}}></LinearProgress>

  return (
  <div className={classes.body}>
    <div className={classes.container}>
      <div className={classes.main}>
        <div style={{
          display:"flex",
        }}>
        <img 
          src={coin?.image.large}
          alt={coin?.name}
          height="50"
          style={{ marginBottom:20}}/>

        <Typography variant="h4" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="h4" className={classes.heading}>
          &nbsp;&nbsp;({coin?.symbol})
          </Typography>
          &nbsp;&nbsp;
          <Typography 
          variant="h4"
          style={{
            fontfamily:"Roboto",
          }}>
          {coin?.market_data.current_price[currency.toLowerCase()].toLocaleString(undefined, {minimumFractionDigits: 2})} {symbol}
          
           
          </Typography>
        </div>
        <Typography variant="h5" className={classes.heading}>
          <Chip label={"Rank "+ coin?.market_cap_rank}/>
          </Typography>
        <Typography variant="h4" style={{fontfamily:"Roboto"}}>
            <IoIosAddCircle/>
            <BiBell/>
            <BiShareAlt/>
          </Typography>

        <div className={classes.marketData}>
          
        <span style={{display:"flex"}}>
     
       
          
          &nbsp;&nbsp;
          <Typography 
          variant="h5"
          style={{
            fontfamily:"Roboto",
          }}>
          
            
          </Typography>
        </span>
        <span style={{display:"flex"}}>
         
        </span>
        <span style={{display:"flex"}}>
          <Typography variant="h5" className={classes.heading}>
            Market Cap:{" "}
          </Typography>
          &nbsp;&nbsp;
          <Typography 
          variant="h5"
          style={{
            fontfamily:"Roboto",
          }}>
         
            {coin?.market_data.market_cap[currency.toLowerCase()].toLocaleString(undefined)}

          </Typography>
        </span>
      </div>
        <div>
          <Typography variant="subtitle1" className={classes.description}>
            {ReactHtmlParser(coin?.description.en.split(". ")[0])}
          </Typography>
          </div>
      </div>
      <CoinInfo coin={coin}/>
    </div>
  </div>   
  )
}

export default CoinPage