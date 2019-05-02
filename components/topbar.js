import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native'
import theme from '../src/theme'
import BackBtn from './backbtn'

const TopBar = (props) => {
  const { header, onBackClick, rightBtn, style } = props
  return (<View style={Object.assign({}, styles.topBar, style ? style : {})}>
    {onBackClick && (<BackBtn onClick={onBackClick}/>)}
    <Text style={styles.headerText}>
      {header}
    </Text>
    {rightBtn}
  </View>)
}

const styles = StyleSheet.create({
  topBar: {
    minHeight: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    //marginLeft: theme.spacing.unit,
    //marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  headerText: {
    marginLeft: theme.spacing.unit,
    textAlign: 'center',
    flex: 1,
    ...theme.typography.h1
  },
})

export default TopBar
