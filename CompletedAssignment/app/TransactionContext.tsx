import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {BALANCE, TRANSACTION} from './constants/KeyStorage';

interface TransactionContextValue {
  transactions: Transaction[];
  addTransaction: (amount: string, account: Account) => void;
  balance: number;
}

export type Transaction = {
  id: number;
  amount: number;
  account: Account;
};

type Account = {
  name: string;
  iban: string;
};

const TransactionContext = createContext<TransactionContextValue>({
  transactions: [],
  addTransaction: () => {},
  balance: 1000,
});

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({children}: {children: ReactNode}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(1000);

  const addTransaction = (amount: string, account: any) => {
    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      account,
    };
    const listNewTransaction = [...transactions, newTransaction];
    setTransactions(prev => [...prev, newTransaction]);
    setBalance(prevBalance => prevBalance - parseFloat(amount));

    RNSecureStorage.setItem(TRANSACTION, JSON.stringify(listNewTransaction), {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    });

    RNSecureStorage.setItem(
      BALANCE,
      JSON.stringify(balance - parseFloat(amount)),
      {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      },
    );
  };

  useEffect(() => {
    RNSecureStorage.getItem(TRANSACTION).then(value => {
      return setTransactions(JSON.parse(value ?? '[]'));
    });

    RNSecureStorage.getItem(BALANCE).then(value => {
      return setBalance(value ? +value : 1000);
    });
  }, []);

  return (
    <TransactionContext.Provider
      value={{transactions, addTransaction, balance}}>
      {children}
    </TransactionContext.Provider>
  );
};
