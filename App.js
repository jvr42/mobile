import {
    StackNavigator,
} from 'react-navigation';

import OperationScreen from './screens/OperationScreen'
import CategoriaScreen from './screens/CategoriaScreen'
import TransactionScreen from './screens/TransactionScreen'
import styles from './styles/Styles'


const App = StackNavigator({
    Operaciones: {
        screen: OperationScreen,
        navigationOptions: {
            headerTitle: 'Finanzas',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerText,
            headerBackTitle: null,
            mode: 'modal'
        },
        mode: 'modal'
    },
    Categoria: {
        screen: CategoriaScreen,
        navigationOptions: {
            headerTitle: 'Categorias',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerText,
            headerBackTitle: null
        },
        mode: 'modal'
    },
    Transaccion: {
        screen: TransactionScreen,
        navigationOptions: {
            headerTitle: 'Transacción',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerText,
            headerBackTitle: null
        },
        mode: 'modal'
    }
});


export default App