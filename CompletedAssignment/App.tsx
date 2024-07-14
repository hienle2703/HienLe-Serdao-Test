import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './app/HomeScreen';
import TransactionScreen from './app/TransactionScreen';
import {TransactionProvider} from './app/TransactionContext';
import BeneficiaryScreen from './app/BeneficiaryScreen';
import {BeneficiaryProvider} from './app/BeneficiaryContext';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Transaction: undefined;
  Beneficiary: undefined;
};

const App = () => {
  return (
    <TransactionProvider>
      <BeneficiaryProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen as React.ComponentType<any>}
            />
            <Stack.Screen
              name="Transaction"
              component={TransactionScreen as React.ComponentType<any>}
            />
            <Stack.Screen
              name="Beneficiary"
              component={BeneficiaryScreen as React.ComponentType<any>}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </BeneficiaryProvider>
    </TransactionProvider>
  );
};

export default App;
