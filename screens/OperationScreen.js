import React from 'react';
import { Permissions, Constants, Notifications } from 'expo' 
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput } from 'react-native';
import styles from './../styles/Styles'

export default class OperationScreen extends React.Component {

  async componentDidMount() {
    Notifications.cancelAllScheduledNotificationsAsync()

    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.isDevice && result.status === 'granted') {
      console.log('Notification permissions granted.')
    }

    const localNotification = {
        title: '¿Actualizaste tus gastos hoy?',
        body: '¡Usala ahora! ', 
        ios: {
          sound: true 
        }
      };

/*    let t = new Date();
    t.setSeconds(t.getSeconds() + 10);

    const schedulingOptions = {
        time: t,
        repeat: 'week'
    };
*/
    Notifications.presentLocalNotificationAsync(localNotification);

  }
  
  constructor(props) {
    super(props)
    this.state = { 
      data:[]
    }
  }

  changeView = (operation) => {
    this.props.navigation.navigate('Categoria',{operation})
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.questionText}>¿Que operación quieres realizar?</Text>
        </View>
        <View style={styles.operations}>
          <TouchableOpacity onPress={() => this.changeView('ABONO')}>
            <Image style={styles.plusBtn} source={{uri: 'https://png.icons8.com/color/540/plus.png'}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.changeView('DEBITO')}>
            <Image style={styles.plusBtn} source={{uri: 'https://png.icons8.com/color/540/minus.png'}}/>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text>{this.state.operation}</Text>
        </View>
      </View>
    );
  }
}