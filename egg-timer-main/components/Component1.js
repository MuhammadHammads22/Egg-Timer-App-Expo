import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import i18n from '../i18nConfig'; // Import i18n

const Component1 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{i18n.t('Start Timer')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default Component1;