import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import { useLoggedUser } from 'meteor/quave:logged-user-react';
import { ContactsCollection } from '../api/contacts/ContactsCollection';
import { WalletsCollection } from '../api/wallet/WalletsCollection';
import { SelectContact } from './components/SelectContact';
import { Loading } from './components/Loading';
import { Modal } from './components/Modal';

export const Wallet = () => {
  const { loggedUser } = useLoggedUser();
  const isLoadingContacts = useSubscribe('myContacts');
  const isLoadingWallets = useSubscribe('myWallet');
  const contacts = useFind(() =>
    ContactsCollection.find(
      { archived: { $ne: true } },
      { sort: { createdAt: -1 } }
    )
  );
  const [wallet] = useFind(() => WalletsCollection.find());

  const [open, setOpen] = React.useState(false);
  const [isTransferring, setIsTransferring] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [destinationContact, setDestinationContact] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const makeTransaction = () => {
    Meteor.call(
      'transactions.insert',
      {
        isTransferring,
        sourceWalletId: wallet._id,
        destinationContactId: destinationContact?._id || '',
        amount: Number(amount),
      },
      (errorResponse) => {
        if (errorResponse) {
          if (errorResponse.error) {
            setErrorMessage(errorResponse.error);
          } else {
            errorResponse.details?.forEach((error) => {
              setErrorMessage(error.message);
            });
          }
        } else {
          setOpen(false);
          setDestinationContact({});
          setAmount(0);
          setErrorMessage('');
        }
      }
    );
  };

  const ModalForm = () => (
    <>
      {isTransferring && (
        <div className="mt-2">
          <SelectContact
            title="Destination contact"
            contacts={contacts}
            contact={destinationContact}
            setContact={setDestinationContact}
          />
        </div>
      )}
      <div className="mt-2">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          min={0}
          onChange={(e) => setAmount(e.target.value)}
          className="focus:outline-none mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </>
  );

  if (isLoadingContacts() || isLoadingWallets()) return <Loading />;

  return (
    <div className="mt-4">
      <div className="flex rounded font-sans shadow-md">
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <h1 className="text-slate-900 flex-auto text-lg font-semibold">
              Main account
            </h1>
            <div className="text-slate-900 w-full flex-none text-sm font-medium">
              Email:
            </div>
            <div className="text-slate-900 flex w-full justify-between text-sm font-medium">
              <div className="text-slate-900 text-lg font-semibold">
                {loggedUser?.email}
              </div>
            </div>
            <div className="text-slate-900 w-full flex-none text-sm font-medium">
              Wallet ID:
            </div>
            <div className="text-slate-900 flex w-full justify-between text-sm font-medium">
              <div className="text-slate-900 text-lg font-semibold">
                {wallet?._id}
              </div>
              <div className="text-slate-900 text-lg font-bold">
                {wallet?.balance} {wallet?.currency}
              </div>
            </div>
          </div>

          <div className="mt-6 flex space-x-4 text-sm font-medium">
            <div className="flex flex-auto space-x-4">
              <button
                type="button"
                className="focus:outline-none inline-flex justify-center rounded-md border border-transparent bg-indigo-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                onClick={() => {
                  setIsTransferring(false);
                  setOpen(true);
                  setErrorMessage('');
                }}
              >
                Add Money
              </button>
              <button
                type="button"
                className="focus:outline-none inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                onClick={() => {
                  setIsTransferring(true);
                  setErrorMessage('');
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
        title={isTransferring ? 'Transfer money to other wallet' : 'Add money'}
        body={<ModalForm />}
        footer={
          <button
            type="button"
            className="focus:outline-none inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            onClick={makeTransaction}
          >
            {isTransferring ? 'Transfer' : 'Add'}
          </button>
        }
        errorMessage={errorMessage}
      />
    </div>
  );
};
