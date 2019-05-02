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
import MealCard from './mealcard'

class MealTabBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: 'snack'
    }
  }
  render() {
      const { data, onAddMeal, qtys } = this.props
      const { show } = this.state
    return (
      <View style={styles.root}>
        <View style={styles.priceTag}>
        <TouchableOpacity  onPress={()=>this.setState({show:"snack"})} >
          <Text style={show==='snack' ? styles.onselectFont : null} >Snacks</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.setState({show:"beverage"})}>
            <Text style={show==='beverage' ? styles.onselectFont : null} >Beverages</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>this.setState({show:"lunch"})}>
            <Text style={show==='lunch' ? styles.onselectFont : null}>Lunch</Text>
          </TouchableOpacity>
        </View>
        <View>
          {show === 'snack' && data && data.data && data.data.snack && data.data.snack.map(meal =>(
            <View key={meal.id}><MealCard qtys={qtys} onAddMeal={onAddMeal} name = {meal.name} price={meal.price} id={meal.id} /></View>
          ))}
          {show === 'beverage' && data && data.data && data.data.beverage && data.data.beverage.map(meal =>(
            <View key={meal.id}><MealCard qtys={qtys} onAddMeal={onAddMeal} name = {meal.name} price={meal.price} id={meal.id} /></View>
          ))}
          {show === 'lunch' && data && data.data && data.data.lunch && data.data.lunch.map(meal =>(
            <View key={meal.id}><MealCard qtys={qtys} onAddMeal={onAddMeal} name = {meal.name} price={meal.price} id={meal.id} /></View>
          ))}
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
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    margin: theme.spacing.unit
  },
  priceTag: {
    backgroundColor: '#FFC400',
    borderRadius: theme.shape.roundedInputBorderRadius,
    paddingHorizontal: theme.spacing.unit * 2,
    paddingVertical: theme.spacing.unit,
    margin : 10,
    display:'flex',
    flexDirection: 'row',
    justifyContent:'space-evenly',
  },
  onselectFont: {
    ...theme.typography.text1,
    fontWeight: 'bold'
  }
})

export default MealTabBar
