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
import { Ionicons } from '@expo/vector-icons'

const MealCard = (props: Props) => {
  const { name, price, id } = props
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
        <Ionicons
          name='ios-add-circle-outline'
          size={30}
          color={theme.palette.text.body}
        />
      </View>
    </View>
  )
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
