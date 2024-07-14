import React from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import {Transaction, useTransactions} from './TransactionContext';
import {RootStackParamList} from '../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  const {transactions, balance} = useTransactions();

  const renderItem = ({item}: {item: Transaction}) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Transaction ID: {item.id}</Text>
      <Text style={styles.itemText}>
        Amount: ${item?.amount?.toFixed(2) ?? 0}
      </Text>
      {item.account && (
        <>
          <Text style={styles.itemText}>To: {item.account.name}</Text>
          <Text style={styles.itemText}>IBAN: {item.account.iban}</Text>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>
        Current Balance: ${balance ? balance.toFixed(2) : 0}
      </Text>
      <Button
        title="Add Transaction"
        onPress={() => navigation.navigate('Transaction')}
      />
      <View style={styles.sizeBox} />
      <Button
        title="Add Beneficiary"
        onPress={() => navigation.navigate('Beneficiary')}
      />
      <FlatList
        data={transactions}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
  sizeBox: {
    height: 10,
  },
});

export default HomeScreen;
