import React, { useEffect, useState } from "react";
import detectEthereumProvider from '@metamask/detect-provider'
import {createEscrow} from '../functions/functions'
import { Button, Modal, TextField, makeStyles} from "@material-ui/core";
import Web3 from 'web3';
import "../styles/Escrows.css";
import escrow from '../contracts/CustomisedEscrow.json'



const provider = new Web3.providers.HttpProvider("https://data-seed-prebsc-2-s1.binance.org:8545/")


const web3 = new Web3(provider)


const contract = new web3.eth.Contract(escrow.abi,"0x8F534430DD986130D86DaCB78DF3BA5B0274C8Fe")



function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center"
  },
}));


const Escrows = () => {
  const classes = useStyles();
  const [data, setData] = useState(null)
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  let provider;

  // getModalStyle is not a pure function, we roll the style only on the first render

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onsubmitForm = async (e) => {
    e.preventDefault();
    const address = e.target.address.value;
    const amount = e.target.amount.value;
    const days = e.target.time.value;

    createEscrow(address,amount,days);
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Create Escrow</h2>
      <p id="simple-modal-description">

      </p>
      <form onSubmit={onsubmitForm} className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" name="address" label="Seller Address" />
        <TextField id="standard-basic" name="amount" label="Amount" />
        <TextField id="standard-basic" name="time" label="Time in Days" />
        <Button size="small" type="submit" color="primary" variant="contained"  >Create</Button>
      </form>
    </div>
  );

  const detect = async()=>{
    provider = await detectEthereumProvider();

    if (provider) {
      // From now on, this should always be true:
      // provider === window.ethereum
      provider.enable() // initialize your app
      createEscrow('0x7a2D0Bd4484001A9C1DFa5191DBAcD5bF3A065E1','18900',7)
    } else {
      console.log('Please install MetaMask!');
    }

  }


  useEffect(()=>{
    const x = async()=>{

      const total= await contract.methods.totalEscrows().call()

      let all = [];
      for (let i = 1; i <= total; i++) {
        const details = await contract.methods.getEscrow(i).call()
        all.push(details)
      }
      console.log(all)
      setData(all)
    }
    x()
  }, [])
  return (
    <>
    <div id="escrows-id">
      <h3>Contract is at https://testnet.bscscan.com/address/0x8F534430DD986130D86DaCB78DF3BA5B0274C8Fe</h3>
      <h1>My Escrows</h1>
      <h2> Active Escrows</h2>
      <Button size='small'
      //  onClick={()=>detect()} 
      onClick={handleOpen}
      >Create Escrow</Button>
      <table>
        <thead>
          <tr>
            <th id="first-head">ID</th>
            <th id="second-head">Buyer</th>
            <th id="thid-head">Seller</th>
            <th id="fourth-head">Amount</th>
            <th id="fifth-head">Started</th>
            <th id="sixth-head">Pay Type</th>  
            <th id="seventh-head">Time in Days</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((i) => {
            return(
              <tr>
              <td>{i.id}</td>
              <td>{i.seller}</td>
              <td>{i.buyer}</td>
              <td>{i.amount}</td>
              <td>{i.start}</td>
              <td>{i.payType.toString()}</td>
              <td>{i.timeInDays}</td>
            </tr>
            )
          })}
         
        </tbody>
      </table>
      <h2>Completed Escrows</h2>
      <div>
        <table className="second-table">
          <thead>
            <tr>
              <th id="first-head-cmpltd">No</th>
              <th id="second-head-cmpltd">Name</th>
              <th id="thid-head-cmpltd">Amount</th>
              <th id="fourth-head-cmpltd">Ta/From</th>
              <th id="fifth-head-cmpltd">Created At</th>
              <th id="sixth-head-cmpltd">Completed At</th>
            </tr>
          </thead>
          <tbody>
            {/* {data.map((vname) => {
            <tr>
              <td>{vname.no}</td>
              <td>{vname.name}</td>
              <td>{vname.amount}</td>
              <td>{vname.from}</td>
              <td>{vname.created}</td>
              <td>{vname.completed}</td>
            </tr>;
          })} */}
            <tr>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>Cancelled Escrows</h2>
      <div>
        <table className="third-table">
          <thead>
            <tr>
              <th id="first-head-cancd">No</th>
              <th id="second-head-cancld">Name</th>
              <th id="thid-head-cancld">Amount</th>
              <th id="fourth-head-cancld">Ta/From</th>
              <th id="fifth-head-cancld">Created At</th>
              <th id="sixth-head-cancld">Completed At</th>
            </tr>
          </thead>
          <tbody>
            {/* {data.map((vname) => {
            <tr>
              <td>{vname.no}</td>
              <td>{vname.name}</td>
              <td>{vname.amount}</td>
              <td>{vname.from}</td>
              <td>{vname.created}</td>
              <td>{vname.completed}</td>
            </tr>;
          })} */}
            <tr>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

export default Escrows;
