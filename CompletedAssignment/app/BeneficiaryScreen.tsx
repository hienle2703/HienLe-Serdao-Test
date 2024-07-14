import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {useBeneficiary} from './BeneficiaryContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

const IBAN = require('iban');

const BeneficiaryScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Beneficiary'>) => {
  const {addBeneficiary} = useBeneficiary();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [iban, setIban] = useState('');
  const [isError, setIsError] = useState(false);

  const handleCreateBeneficiary = () => {
    if (firstName === '' || lastName === '' || !IBAN.isValid(iban)) {
      setIsError(true);
      return;
    }

    addBeneficiary(firstName, lastName, iban);
    navigation.goBack();
  };

  const renderErrorText = (msg: string) => {
    if (!isError) {
      return null;
    }

    return (
      <View style={styles.width80}>
        <Text style={styles.errorText}>{msg}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screenWrap}>
      <TextInput
        style={[styles.inputStyle, isError && styles.inputStyleError]}
        placeholderTextColor={'gray'}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="Enter First Name*"
      />
      {!firstName && renderErrorText('First Name is required')}
      <TextInput
        style={[styles.inputStyle, isError && styles.inputStyleError]}
        placeholderTextColor={'gray'}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Enter Last Name*"
      />
      {!lastName && renderErrorText('Last Name is required')}
      <TextInput
        style={[styles.inputStyle, isError && styles.inputStyleError]}
        placeholderTextColor={'gray'}
        onChangeText={setIban}
        value={iban}
        placeholder="Enter IBAN*"
      />
      {!IBAN.isValid(iban) && renderErrorText('IBAN is invalid')}
      <Button title="Create Beneficiary" onPress={handleCreateBeneficiary} />
    </KeyboardAvoidingView>
  );
};

export default BeneficiaryScreen;

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
    color: 'black',
    paddingLeft: 10,
  },
  inputStyleError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
  },
  width80: {
    width: '80%',
  },
});
