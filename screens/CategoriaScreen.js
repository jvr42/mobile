import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
  Alert,
  Keyboard
} from 'react-native';

import styles from './../styles/Styles'

export default class CategoriaScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {loading: true, category: ''}

    fetch('https://enigmatic-castle-88481.herokuapp.com/api/things').then(response => {
        response.json().then(data => {
        data[0].categories = data[0].categories.reverse()
        this.setState({data})
      })
    })
  }

  onPress = () => {
    if (this.state.category.trim() != '' && this.state.category != undefined) {
      fetch('https://enigmatic-castle-88481.herokuapp.com/api/things/' + this.state.data[0]._id + '/category',
        {
          method: "POST",
          body: JSON.stringify({name: this.state.category, transactions:[]}),
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "same-origin"
        })
        .then(data => data.json())
        .then(data => {
          data.categories = data.categories.reverse()
          this.setState({data:[data], category:''});
          Keyboard.dismiss()
        }) 
    }else{
      Alert.alert("Error", "Por favor ingresa un nombre para la categoria que quieres crear.")
    }  
  }


  _deleteCategory = (categoryId) => {
    fetch('https://enigmatic-castle-88481.herokuapp.com/api/things/' + this.state.data[0]._id + '/' + categoryId,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(data => data.json())
    .then(data => {
      data.categories = data.categories.reverse()
      this.setState({data:[data], category:''});
    })     
  }

  onLongPress = (categoryId) => {
    Alert.alert(
      '¿Quieres borrar esta categoria?',
      '',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress:() => this._deleteCategory(categoryId)},
      ],
      { cancelable: false }
    ) 
  }

  changeView = (category, User) => {
    const {operation} = this.props.navigation.state.params
    this.props.navigation.navigate('Transaccion',{category, user: User, operation: operation})
  }

  renderCategories = () => {
    if (this.state.data){
    const {categories} = this.state.data[0]
    return categories.map((category)=>{
      return (
        <TouchableOpacity  onPress={() => this.changeView({categoryId: category._id, name: category.name},this.state.data[0])} onLongPress={() => this.onLongPress(category._id)} key={category._id}>
          <View style={styles.categoryStyle}>            
            <Text style={styles.categoryTextStyle}>{category.name}</Text>                         
          </View>
        </TouchableOpacity>
      )
    })
    }else{
      return <ActivityIndicator size="large" color="#000000" />
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <KeyboardAvoidingView behavior="padding" style={styles.categoriaTextInputContainer}>        
          <TextInput placeholder="Nueva categoria"
            placeholderTextColor="#E9E9E9"
            style={styles.categoriaTextInput}
            value={this.state.category}
            onChangeText={(value)=>{this.setState({category:value})}}
          />
          <View>
            <Button title="Crear Categoria" onPress={this.onPress}/>
          </View>
          <View style={{ height: 10 }} />          
        </KeyboardAvoidingView>
        <ScrollView style={styles.categoriesListStyle}>          
          {this.renderCategories()}    
        </ScrollView>        
      </View>
    );
  }
}

