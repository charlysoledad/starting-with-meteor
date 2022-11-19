import { Meteor } from 'meteor/meteor';
import React from "react";
import { Modal } from "./components/Modal";
import { SelectContact } from "./components/SelectContact";
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import {ContactsCollection} from "../api/contacts/ContactsCollection";
import { Loading } from "./components/Loading";
import { WalletsCollection } from '../api/wallet/WalletsCollection';

export const Wallet = () => {
  const isLoadingContacts = useSubscribe('contacts');
  const isLoadingWallets = useSubscribe('wallets');
  const contacts = useFind(() => ContactsCollection.find({ archived: { $ne: true } }, { sort: { createdAt: -1 } }));
  const [wallet] = useFind(() => WalletsCollection.find());
  
  const [open, setOpen] = React.useState(false);
  const [isTransferring, setIsTransferring] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [destinationWallet, setDestinationWallet] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const makeTransaction = () => {
    Meteor.call('transactions.insert',
      {
        isTransferring,
        sourceWalletId: wallet._id,
        destinationWalletId: destinationWallet?.walletId || '',
        amount: Number(amount)
      },
      (errorResponse) => {
        if (errorResponse) {
          errorResponse.details?.forEach((error) => {
            setErrorMessage(error.message);
          })
        }
        else {
          setOpen(false);
          setDestinationWallet({});
          setAmount(0);
          setErrorMessage("");
        }
      }
    );
  }

  const ModalForm = () => {
    return (
      <>
        {isTransferring && 
          <div className="mt-2">
            <SelectContact
              title="Destination contact"
              contacts={contacts}
              contact={destinationWallet}
              setContact={setDestinationWallet}
              />
          </div>
        }
        <div className="mt-2">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            min={0}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </>
    );
  }

  if (isLoadingContacts() || isLoadingWallets()) return <Loading />

  return (
    <div>
      <div className="flex font-sans shadow-md rounded">
      <form className="flex-auto p-6">
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-lg font-semibold text-slate-700">
            Main account
          </h1>
          <div className="w-full flex-none text-sm font-medium text-slate-500">
            Wallet ID:
          </div>
          <div className="w-full flex justify-between text-sm font-medium text-slate-500">
            <div className="text-lg font-semibold text-slate-500">
              {wallet._id}
            </div>
            <div className="text-lg font-bold text-slate-500">
            {wallet.balance} {wallet.currency}
            </div>
          </div>
        </div>
    
        <div className="flex space-x-4 mt-6 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            <button
              type="button"
              className="bg-indigo-400 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              onClick={() => {
                setIsTransferring(false);
                setOpen(true);
                setErrorMessage("");
              }}
            >
              Add Money
            </button>
            <button
              type="button"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={() => {
                  setIsTransferring(true);
                  setErrorMessage("");
                  setOpen(true);
                }}
              >
              Transfer
            </button>
          </div>
        </div>
      </form>
    </div>

      <Modal
        open={open}
        setOpen={setOpen}
        title={ isTransferring ? 'Transfer money to other wallet' : 'Add money'}
        body={
          <ModalForm />
        }
        footer={
          <button
              type="button"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={makeTransaction}
              >
              {isTransferring ? 'Transfer':'Add'}
            </button>
        }
        errorMessage={errorMessage}
      />
    </div>
    
  )
}