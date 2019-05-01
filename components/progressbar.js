import React from 'react'
import {
  Platform,
  ProgressBarAndroid,
  ProgressViewIOS,
  View
} from 'react-native'
import * as Progress from 'react-native-progress'

const ProgressBar = (props) => {
  const { variant = 'circle', size } = props
    /*return Platform.OS === 'ios'
    ? (<ProgressViewIOS />)
    : (<ProgressBarAndroid />)*/
  return (<View style={props.style}>
    {variant === 'circle'
      ? (<Progress.Circle color="#90b23e" size={size || 30} indeterminate={true} />)
      : (<Progress.Bar color="#90b23e" indeterminate={true} />)
    }
  </View>)
}

export default ProgressBar
