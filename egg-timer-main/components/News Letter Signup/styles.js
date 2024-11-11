// styles.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 40,
    // fontWeight: '800',
    fontFamily: "Inter-Bold",
    padding: 10,
    textAlign: 'center',
    marginTop:-30,
    marginBottom: 3,
    color: '#000000',
  },
  subtitle: {
    fontSize: 18,
    // fontWeight:'400',
    fontFamily: "Inter-SemiBold",
    textAlign: 'center',
    padding: 15,
    marginBottom: 20,
    color: '#000000',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: '40%',
    height: 60,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 15,
    // fontWeight:'400',
    fontFamily: "Inter-Regular",
    textAlign: 'center',
    color: '#000000',
    marginTop: 15,
  },
});
