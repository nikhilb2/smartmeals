import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native'
import theme from '../src/theme'
import { logout } from '../src/auth/UserSession'

const SignInButton = (props) => {
  const { style, user } = props
  return <View>
  {user && user.jwt
    ?   <TouchableOpacity onPress={()=> logout() }
        style={style}>
        <View style={styles.button}>
          <Text style={styles.caption}>Sign Out</Text>
        </View>
      </TouchableOpacity>
    : null
    }
  </View>
}

const styles = StyleSheet.create({
  button: {
    height: 44,
    backgroundColor: theme.palette.primary1.main,
    borderRadius: theme.shape.roundedInputBorderRadius,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.unit
  },
  caption: {
    textAlign: 'center',
    color: theme.palette.primary1.contrastText,
    fontWeight: 'bold',
    ...theme.typography.caption
  }
})

export default SignInButton
