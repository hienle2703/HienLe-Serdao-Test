import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTransactions} from './TransactionContext';
import {useBeneficiary} from './BeneficiaryContext';
import {RootStackParamList} from '../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ErrorText from './component/ErrorText';

const IBAN = require('iban');

type Beneficiary = {
  id: number;
  firstName: string;
  lastName: string;
  iban: string;
};

const TransactionScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Transaction'>) => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [iban, setIban] = useState('');
  const [isError, setIsError] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] =
    useState<string>('other');

  const {addTransaction} = useTransactions();
  const {beneficiaries} = useBeneficiary();

  const handleTransaction = () => {
    let accountDetails = {name, iban};

    if (selectedBeneficiary !== 'other') {
      const beneficiary = beneficiaries?.find(
        (item: Beneficiary) => item.id.toString() === selectedBeneficiary,
      );
      accountDetails = {
        name: (beneficiary?.firstName + ' ' + beneficiary?.lastName).trim(),
        iban: beneficiary?.iban ?? '',
      };
    } else if (name === '' || !IBAN.isValid(iban)) {
      setIsError(true);
      return;
    }

    addTransaction(amount, accountDetails);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screenWrap}>
      <TextInput
        style={[
          styles.inputStyle,
          isError && !amount && styles.inputStyleError,
        ]}
        placeholderTextColor={'gray'}
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter amount"
        returnKeyType="done"
      />
      {!amount && <ErrorText isError={isError} message="Amount is required" />}
      <Text style={styles.beneficiaryTitle}>Choose beneficiary</Text>
      <View style={styles.pickerStyle}>
        <Picker
          selectedValue={selectedBeneficiary}
          onValueChange={itemValue => {
            setSelectedBeneficiary(itemValue);
          }}>
          {beneficiaries?.map((beneficiary: Beneficiary) => {
            return (
              <Picker.Item
                label={beneficiary.firstName + ' ' + beneficiary.lastName}
                value={beneficiary.id}
                key={beneficiary.id}
              />
            );
          })}
          <Picker.Item label="Enter beneficiary info" value={'other'} />
        </Picker>
      </View>
      {(selectedBeneficiary === 'other' || !beneficiaries?.length) && (
        <>
          <TextInput
            style={[
              styles.inputStyle,
              isError && !name && styles.inputStyleError,
            ]}
            placeholderTextColor={'gray'}
            onChangeText={setName}
            value={name}
            placeholder="Recipient Name"
          />
          {!name && <ErrorText isError={isError} message="Name is required" />}
          <TextInput
            style={[
              styles.inputStyle,
              isError && !IBAN.isValid(iban) && styles.inputStyleError,
            ]}
            placeholderTextColor={'gray'}
            onChangeText={setIban}
            value={iban}
            placeholder="Recipient IBAN"
          />
          {!IBAN.isValid(iban) && (
            <ErrorText isError={isError} message="IBAN is invalid" />
          )}
        </>
      )}
      <Button title="Submit Transaction" onPress={handleTransaction} />
    </KeyboardAvoidingView>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  screenWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 8,
    paddingLeft: 10,
  },
  inputStyleError: {
    borderColor: 'red',
  },
  pickerStyle: {
    width: '80%',
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  beneficiaryTitle: {
    textAlign: 'left',
    width: '80%',
    marginBottom: 10,
    marginTop: 20,
  },
});
