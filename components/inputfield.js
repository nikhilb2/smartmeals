import React, { Component } from 'react'
import { debounce } from 'lodash'
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native'
import theme from '../src/theme'

class InputField extends Component {

  constructor(props: Props) {
    super(props)
  }

  render() {
    const { value, placeholder, onChange, rightAccessory,
      leftAccessory, label, bottomLabel, style, textContentType,
      secureTextEntry, autoCapitalize, multiline, keyboardType } = this.props
    return (
      <View style={Object.assign({}, styles.root, style || {})}>
        {leftAccessory && (<View>{leftAccessory}</View>)}
        <View style={styles.inputAndLabelContainer}>
          {label && (<Text style={styles.label}>{label}</Text>)}
          <TextInput
            placeholder={placeholder}
            maxLength={255}
            style={Object.assign({}, styles.input,
              multiline ? styles.inputMultiline : {})}
            onChangeText={onChange}
            value={value}
            textContentType={textContentType || 'none'}
            keyboardType={keyboardType || 'default'}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize || 'none'}
            multiline={multiline || false}
          />
          {bottomLabel && (<Text style={styles.bottomLabel}>{bottomLabel}</Text>)}
        </View>
        {rightAccessory && <View>{rightAccessory}</View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: theme.palette.border.outline,
    borderWidth: 2,
    borderRadius: theme.shape.roundedInputBorderRadius,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    ...theme.typography.text1
  },
  inputMultiline: {
    height: 120
  },
  inputAndLabelContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit / 2
  },
  bottomLabel: {
    color: '#7a7671',
    margin: theme.spacing.unit
  }
})

export default InputField
