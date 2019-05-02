import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native'
import theme from '../src/theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'

class MealCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedMeal:null,
      qty:0
    }
  }
  render() {
    const { name, price, id } = this.props
    const { selectedMeal, incart, orderTotal, qty } = this.state
    console.log(this.state);
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={styles.flexContainer}>
            <Text style={styles.dishName}>
              {name}
            </Text>
            <View style={styles.priceTag}>
              <Text style={styles.price}>
                {`₹ ${price}`}
              </Text>
            </View>
          </View>

          <View style={styles.flexContainerAdd}>
          {qty > 0
                  ? (<TouchableOpacity onPress={()=>this.setState({selectedMeal:id, qty:qty-1})}>
                    <MaterialCommunityIcons
                      name='minus-circle-outline'
                      size={30}
                      color={theme.palette.text.body}
                    />
                  </TouchableOpacity>)
                  : null
          }
          <Text style={styles.price}>{` ${qty} `}</Text>
          <TouchableOpacity onPress={()=>this.setState({selectedMeal:id, qty:qty+1})}>
          <MaterialCommunityIcons 
            name='plus-circle-outline'
            size={30}
            color={theme.palette.text.body}
          />
          </TouchableOpacity>
          </View>

        </View>
      </View>
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
    padding: 2
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent:'space-between',
  },
  flexContainerAdd: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent:'flex-start',
  },
  priceTag: {
    backgroundColor: '#FFC400',
    borderRadius: theme.shape.roundedInputBorderRadius,
    paddingHorizontal: theme.spacing.unit * 2,
    paddingVertical: theme.spacing.unit,
  },
  price: {
    ...theme.typography.text1,
    fontWeight: 'bold'
  }
})

export default MealCard
