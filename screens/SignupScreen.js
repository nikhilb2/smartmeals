import React from 'react'
import { withNamespaces } from 'react-i18next'
import { connect } from 'react-redux'
import { signup, loadCountriesList, loadFoodPrefList } from '../src/auth/actions'
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
import InputField from '../components/inputfield'
import Button from '../components/button'
import theme from '../src/theme'
import TopBar from '../components/topbar'
import PickerList from '../components/pickerlist'
import InputPlaceholder from '../components/inputplaceholder'


class SignupScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Signin'
  }

  state = {
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
    country: 1,
    foodpref: 1,
    popupShowing: false,
    popupMode: null
  }




  callSignup = () => {
    const { signup, t } = this.props
    const { email, password, username, firstName, lastName, country, foodpref } = this.state
    if (email && password && username && firstName && lastName && country && foodpref) {
      signup(email, password, username, firstName, lastName, country, foodpref)
    } else {
      Alert.alert(t('alertInputAllData'))
    }
  }

  render() {
    console.log(this.state);
    const { navigation, signup, countries, foodprefs, signupError, t } = this.props
    const { email, password, username, firstName, lastName, country, foodpref, popupShowing, popupMode } = this.state
    return (
      <SafeAreaView style={styles.container} forceInset={{ bottom: 'never' }}>
        <TopBar
          onBackClick={() => navigation.navigate('Main')}
          style={styles.topBar}
        />
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.headerText}>
            Sign Up
          </Text>
          {signupError && <Text>{JSON.stringify(signupError)}</Text>}
          <InputField
            value={firstName}
            onChange={text => this.setState({ firstName: text })}
            label="Enter Firstname"
            placeholder="Firstname"
            style={styles.inputField}
          />
          <InputField
            value={lastName}
            onChange={text => this.setState({ lastName: text })}
            label="Enter Lastname"
            placeholder="Lastname"
            style={styles.inputField}
          />
          <InputField
            value={collegeid}
            onChange={text => this.setState({ username: text })}
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


          <Button
            onClick={this.callSignup}
            caption="Sign Up"
            style={styles.button}
          />
          <TouchableOpacity style={styles.signinLink} onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.createAccountBtn}>{t('signinLink')}</Text>
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

const mapStateToProps = state => ({
  user: state.authReducer.user,
  countries: state.authReducer.countries,
  foodprefs: state.authReducer.foodPrefs,
  signupError: state.authReducer.signupError
})

const mapDispatchToProps = dispatch => ({
  signup: (email, password, username, firstName, lastName, country, foodPref) => dispatch(signup(email, password, username, firstName, lastName, country, foodPref)),
  loadCountriesList: () => dispatch(loadCountriesList()),
  loadFoodPrefList: () => dispatch(loadFoodPrefList())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces(['auth'], { wait: true })(SignupScreen))
