// @ts-nocheck

import { useState } from "react";
import { Magic } from "magic-sdk";
import { ConnectExtension } from "@magic-ext/connect";
import Web3 from "web3";
import {magic} from "../../../apps/next/lib/magic"

const web3 = new Web3(magic.rpcProvider);

export default function App({login, account, setAccount}) {
  const sendTransaction = async () => {
    const publicAddress = (await web3.eth.getAccounts())[0];
    const txnParams = {
      from: publicAddress,
      to: publicAddress,
      value: web3.utils.toWei("0.01", "ether"),
      gasPrice: web3.utils.toWei("30", "gwei")
    };
    web3.eth
      .sendTransaction(txnParams as any)
      .on("transactionHash", (hash) => {
        console.log("the txn hash that was returned to the sdk:", hash);
      })
      .then((receipt) => {
        console.log("the txn receipt that was returned to the sdk:", receipt);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signMessage = async () => {
    const publicAddress = (await web3.eth.getAccounts())[0];
    const signedMessage = await web3.eth.personal
      .sign("My Message", publicAddress, "")
      .catch((e) => console.log(e));
    console.log(signedMessage);
  };

  const showWallet = () => {
    magic.connect.showWallet().catch((e) => {
      console.log(e);
    });
  };

  const disconnect = async () => {
    await magic.connect.disconnect().catch((e) => {
      console.log(e);
    });
    setAccount(null);
  };

  return (
    <div className="app">
      {!account && (
        <></>
      )}

      {account && (
        <>
          <button onClick={showWallet} className="button-row">
            Show Wallet
          </button>
          <button onClick={sendTransaction} className="button-row">
            Send Transaction
          </button>
          <button onClick={signMessage} className="button-row">
            Sign Message
          </button>
          <button onClick={disconnect} className="button-row">
            Disconnect
          </button>
        </>
      )}
    </div>
  );
}
