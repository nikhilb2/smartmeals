import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal
} from 'react-native'
import theme from '../src/theme'
import BasketView from './basketView'
import { FontAwesome } from '@expo/vector-icons'

class Basket extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      basketClick: false
    }
  }
  render() {
    const { basketView, order } = this.props
    const { basketClick } = this.state
    return (
      <TouchableOpacity onPress={()=>this.setState({basketClick:true})}>
      <View style={styles.container}>
      <View style={styles.svg}>
        <FontAwesome
          name='shopping-basket'
          size={35}
          color={theme.palette.text.body}
        />
      <View style={styles.flexContainer}>
        <Text>Items: {basketView && basketView.totalItems}</Text>
        <Text>Total: {basketView && basketView.total}</Text>
      </View>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={basketClick}
        onRequestClose={()=>this.setState({ basketClick:false })}>
        <BasketView order={order} basketView={basketView}/>
        </Modal>
      </View>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    marginBottom: theme.spacing.unit,
    position: 'relative'
  },
  container: {
    borderRadius: theme.shape.cardBorderRaius,
    backgroundColor: theme.palette.background.paper,
    overflow: 'hidden',
    margin: theme.spacing.unit * 2,
    borderColor:'black',
    borderWidth: 0.5,
    padding: 5
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  svg: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
})


export default Basket
