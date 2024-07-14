import React, {createContext, useState, useContext, useEffect} from 'react';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {BENEFICIARY} from './constants/KeyStorage';

interface BeneficiaryContextValue {
  beneficiaries: Beneficiary[];
  addBeneficiary: (firstName: string, lastName: string, iban: string) => void;
}

const BeneficiaryContext = createContext<BeneficiaryContextValue>({
  beneficiaries: [],
  addBeneficiary: () => {},
});

type Beneficiary = {
  id: number;
  firstName: string;
  lastName: string;
  iban: string;
};

export const useBeneficiary = () => useContext(BeneficiaryContext);

export const BeneficiaryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);

  const addBeneficiary = (
    firstName: string,
    lastName: string,
    iban: string,
  ) => {
    const newBeneficiary = {
      id: Date.now(),
      firstName,
      lastName,
      iban,
    };
    const newList = [...beneficiaries, newBeneficiary];
    setBeneficiaries(newList);

    RNSecureStorage.setItem(BENEFICIARY, JSON.stringify(newList), {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    });
  };

  useEffect(() => {
    RNSecureStorage.getItem(BENEFICIARY).then(value => {
      return setBeneficiaries(JSON.parse(value ?? '[]'));
    });
  }, []);

  return (
    <BeneficiaryContext.Provider value={{beneficiaries, addBeneficiary}}>
      {children}
    </BeneficiaryContext.Provider>
  );
};
