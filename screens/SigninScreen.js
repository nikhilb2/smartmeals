import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import InputField from '../components/inputfield'
import Button from '../components/button'
import TopBar from '../components/topbar'
import theme from '../src/theme'
import Progressbar from '../components/progressbar'
import { login, currentSession } from '../src/auth/UserSession'
class SigninScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Signin'
  }

  state = {
    email: '',
    password: '',
    signinin:false,
    signIn:null
  }

  componentWillMount() {
    if (currentSession && currentSession.jwt) {
      this.props.navigation.navigate('Home')
    }
  }

  onSignIn(email, password)  {
    this.setState({signinin: true})
    fetch('http://smartmeals.zefiri.com/api/login.php',{
      method: 'POST',
      body: JSON.stringify({email: this.state.email, password: this.state.password})
    })
    .then(response => response.json())
    .then(result => {
      this.setState({signIn:result, signinin: false})
      login({
        data:result.data,
        jwt:result.jwt
      })
      return result
    }).then(
      this.props.navigation.navigate('Home', {basketClick:true})
    )
  }


  render() {
    const { navigation } = this.props
    const { email, password, signinin } = this.state
    return (
      <SafeAreaView style={styles.container} forceInset={{ bottom: 'never' }}>
        <TopBar
          onBackClick={() => navigation.navigate('Home')}
          style={styles.topBar}
        />
        <ScrollView>
          <Text style={styles.headerText}>Input your credentials</Text>
          <InputField
            value={email}
            onChange={text => this.setState({ email: text })}
            label="Your email"
            placeholder='Email'
            style={styles.inputField}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <InputField
            value={password}
            onChange={text => this.setState({ password: text })}
            label='Your password'
            placeholder='Password'
            style={styles.inputField}
            textContentType="password"
            secureTextEntry={true}
          />
          {signinin
            ? (<Progressbar style={styles.progress} />)
            : (<View><Button
              onClick={() => {
                if (email && password) {
                  this.onSignIn(email, password)
                } else {
                  Alert.alert(t('Input email and password'))
              }}}
              caption='SIGN IN'
              style={styles.signinBtn}
            /></View>)}
          <View style={styles.placeholder} />
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.createAccountBtn}>Don't have an account? Click here to create one!</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: theme.palette.background.main,
    padding: theme.spacing.unit * 3,
    display: 'flex'
  },
  placeholder: {
    flex: 1
  },
  topBar: {
    marginBottom: theme.spacing.unit * 4
  },
  inputField: {
    marginBottom: theme.spacing.unit * 2
  },
  forgotPsw: {
    marginTop: theme.spacing.unit * 2
  },
  forgotPswText: {
    ...theme.typography.text1,
    textAlign: 'center'
  },
  signinBtn: {
  },
  createAccountBtn: {
    ...theme.typography.h2,
    color: theme.palette.primary.main,
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3
  },
  progress: {
    margin: theme.spacing.unit * 2,
    alignItems: 'center'
  },
  headerText: {
    textAlign: 'center',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
    ...theme.typography.large
  }
})



export default SigninScreen
