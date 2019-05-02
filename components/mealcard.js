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

  }
  render() {
    const { name, price, id, onAddMeal, qtys } = this.props
    console.log(this.props.qtys);
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
          {qtys && qtys[id] && qtys[id].qty > 0
            ?  <TouchableOpacity
                  onPress={() => {
                    onAddMeal(id, -1, -price, name)
                  }
                }>
                <MaterialCommunityIcons
                  name='minus-circle-outline'
                  size={40}
                  color={theme.palette.text.body}
                />
                </TouchableOpacity>
            : null
          }
            <Text style={styles.qty}>{qtys && qtys[id] && qtys[id].qty > 0 ? ` ${qtys[id].qty} ` :<Text> 0 </Text>}</Text>
          <TouchableOpacity
            onPress={() => {
              onAddMeal(id, 1, price, name)
            }
          }>
          <MaterialCommunityIcons
            name='plus-circle-outline'
            size={40}
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
    margin: theme.spacing.unit,
    borderColor:'black',
    borderWidth: 0.5,
    padding: 5
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
  },
  qty: {
    ...theme.typography.text1,
    fontWeight: 'bold',
    fontSize:30
  },
  dishName: {
    flex: 1,
    ...theme.typography.h3,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
})

export default MealCard
