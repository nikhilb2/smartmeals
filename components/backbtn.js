import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import theme from '../src/theme'

const BackBtn = props => (
  <TouchableOpacity style={props.style} onPress={props.onClick}>
    <MaterialIcons
      name={'arrow-back'}
      size={40}
      color={theme.palette.text.secondary}
    />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  sendBtn: {}
})

export default BackBtn
