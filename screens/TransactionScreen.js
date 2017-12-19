import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Keyboard, Alert } from 'react-native';
import styles from './../styles/Styles'

export default class TransactionScreen extends React.Component {

  constructor(props) {
    super(props)
    this.props.navigation.state.params.amount = ''
    this.state = this.props.navigation.state.params
  }

  onPress = () => {
    const { category, user, operation, amount, observation } = this.state
    if (amount.trim() != '' && amount != undefined) {
      fetch('https://enigmatic-castle-88481.herokuapp.com/api/things/' + user._id + '/' + category.categoryId + '/transaction',
        {
          method: "POST",
          body: JSON.stringify({
            monto: amount,
            type: operation,
            observation: observation,
            date: new Date(),
            coordinates: [0,0]
          }),
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "same-origin"
        })
        .then(data => data.json())
        .then(data => {
          data.categories = data.categories.reverse()
          this.setState({amount: '', observation: ''})
          this.props.navigation.goBack()
          Keyboard.dismiss()
        }) 
    }else{
      Alert.alert("Error", "Por favor ingresa un monto para la transacción.")
    }  
  }

  render() {
    const { category, user, operation } = this.state
    return (
      <View>
          <View style={styles.operationContainer}>
            <Text style={styles.operationText}>{operation}</Text>
          </View>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>          
          
          <View style={styles.categoriaTextInputContainer}>
          <TextInput keyboardType="numeric" placeholder="Monto"
            placeholderTextColor="#E9E9E9"
            style={styles.categoriaTextInput}
            value={this.state.amount}
            onChangeText={(value)=>{this.setState({amount:value})}}
          />
          <TextInput placeholder="Detalle"
            placeholderTextColor="#E9E9E9"
            style={styles.categoriaTextInput}
            value={this.state.observation}
            onChangeText={(value)=>{this.setState({observation:value})}}
          />
          </View>
          <TouchableOpacity onPress={this.onPress}>
          <View style={styles.ingresarBtnContainer}>
            <Text style={styles.ingresarText}>INGRESAR</Text>
          </View>
          </TouchableOpacity>
      </View>
    );
  }
}