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
  Modal,
  Alert,
  CheckBox,
  Linking
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Progressbar from '../components/progressbar'
import { Feather } from '@expo/vector-icons'
import InputField from '../components/inputfield'
import Button from '../components/button'
import theme from '../src/theme'
import TopBar from '../components/topbar'
import InputPlaceholder from '../components/inputplaceholder'
import { login, currentSession } from '../src/auth/UserSession'

class SignupScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Signin'
  }

  state = {
    email: '',
    password: '',
    collegeid: '',
    firstname: '',
    lastname: '',
    staff: 0,
    popupShowing: false,
    popupMode: null,
    signUpResult: null,
    signUpS: false

  }

  onSignIn(email, password)  {
    let checkIfSuccess = false
    let user = null
    const { params } = this.props.navigation.state
    this.setState({signinin: true})
    fetch('http://smartmeals.zefiri.com/api/login.php',{
      method: 'POST',
      body: JSON.stringify({email, password})
    })
    .then(response => response.json())
    .then(result => {
      this.setState({signIn:result, signinin: false})
      login({
        data:result.data,
        jwt:result.jwt
      })
      if (!result.error) {
        checkIfSuccess = true
        user = result
      }
      console.log(result);
      return result
    }).then(() => {
      if (checkIfSuccess) {
        this.setState({signUpS:false})
        this.props.navigation.navigate('BasketViewScreen', {order:params.order,basketView:params.basketView,user:user})
      }
    }
    )
  }


  callSignup = () => {
    this.setState({signUpS:true})
    let signUpStatus = false
    const { email, password, collegeid, firstname, lastname,staff, signUpResult  } = this.state
    if (email && password && collegeid && firstname && lastname) {
      fetch('http://smartmeals.zefiri.com/api/create_user.php',{
        method:'POST',
        body: JSON.stringify({email,password,collegeid,firstname,lastname,staff}),
      })
      .then(response=>response.json())
      .then(result=>{
          this.setState({signUpResult:result})
          if (!result.error) {
              signUpStatus = true
            }
          return result
      })
      .then(()=>{
        if (signUpStatus) {
          this.onSignIn(email,password)
        }
      })
    } else {
      Alert.alert("Input All Data")
    }
  }

  render() {
    console.log(this.state);
    const { navigation } = this.props
    const { email, password, collegeid, firstname, lastname, staff, signUpResult, popupShowing, popupMode, signUpS } = this.state
    return (
      <SafeAreaView style={styles.container} forceInset={{ bottom: 'never' }}>
        <TopBar
          onBackClick={() => navigation.navigate('Main')}
          style={styles.topBar}
        />
        {signUpResult && signUpResult.error ? <Text>{signUpResult.error}</Text> : null}
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.headerText}>
            Sign Up
          </Text>
          <InputField
            value={firstname}
            onChange={text => this.setState({ firstname: text })}
            label="Enter Firstname"
            placeholder="Firstname"
            style={styles.inputField}
          />
          <InputField
            value={lastname}
            onChange={text => this.setState({ lastname: text })}
            label="Enter Lastname"
            placeholder="Lastname"
            style={styles.inputField}
          />
          <InputField
            value={collegeid}
            onChange={text => this.setState({ collegeid: text })}
            label="Enter Collegeid"
            placeholder="Enter Collegeid"
            style={styles.inputField}
          />
          <InputField
            value={email}
            onChange={text => this.setState({ email: text })}
            label="Enter Email"
            placeholder="Email"
            style={styles.inputField}
            keyboardType="email-address"
          />
          <InputField
            value={password}
            onChange={text => this.setState({ password: text })}
            label="Enter Password"
            placeholder="Password"
            style={styles.inputField}
            textContentType="password"
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={()=>{
            if (staff<1) {
              this.setState({staff:1})
            } else {
              this.setState({staff:0})
            }
          }} >
          {staff
            ?
            <Feather
              name={'check-square'}
              size={40}
              color={theme.palette.text.secondary}
            />
            :<Feather
              name={'square'}
              size={40}
              color={theme.palette.text.secondary}
            />
          }
          <Text>
            Staff
          </Text>
          </TouchableOpacity>

          {signUpS
            ? <Progressbar />
            : <Button
                  onClick={this.callSignup}
                  caption="Sign Up"
                  style={styles.button}
              />
          }

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
    display: 'flex',
    flexDirection: 'column'
  },
  contentContainer: {
    flex: 1
  },
  inputField: {
    marginBottom: theme.spacing.unit * 2
  },
  button: {
    marginVertical: theme.spacing.unit * 2
  },
  createAccountBtn: {
    ...theme.typography.h2,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  headerText: {
    textAlign: 'center',
    marginBottom: theme.spacing.unit * 2,
    ...theme.typography.large
  },
  policyText: {
    textAlign: 'center',
    ...theme.typography.h3
  },
  policyLink: {
    color: theme.palette.primary1.main
  },
  signinLink: {
    marginTop: theme.spacing.unit * 2
  }
})



export default SignupScreen
