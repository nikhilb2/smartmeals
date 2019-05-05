import React, { Component } from 'react'
import { debounce } from 'lodash'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import theme from '../src/theme'

class InputPlaceholder extends Component {

  constructor(props: Props) {
    super(props)
  }

  render() {
    const { label, value, showChange = true, onClickChange, style, t } = this.props
    return (<View style={style}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.value}>
        <Text style={styles.valueText}>{value}</Text>
        {showChange && (<TouchableOpacity onPress={onClickChange}>
          <Text style={styles.changeBtnText}>Change</Text>
        </TouchableOpacity>)}
      </View>
    </View>)
  }
}

const styles = StyleSheet.create({
  value: {
    borderColor: theme.palette.border.outline,
    borderWidth: 2,
    borderRadius: theme.shape.roundedInputBorderRadius,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  label: {
    marginLeft: theme.spacing.unit,
    alignSelf: 'flex-start',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit / 2
  },
  valueText: {
    ...theme.typography.text1,
    color: theme.palette.secondary.main,
    textTransform: 'capitalize',
  },
  changeBtnText: {
    color: theme.palette.secondary.main,
    ...theme.typography.smallBtn
  }
})

export default InputPlaceholder
