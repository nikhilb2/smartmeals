import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import MealTabBar from "../components/accordion"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import theme from '../src/theme'
import Progressbar from '../components/progressbar'
import Basket from '../components/basket'
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    meals : null,
    basketView:{
      totalItems:0,
      total:0
    },
    order: {},
    basketClick:false,
    basketdata:null
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.getMenu()
  }

  getMenu() {
    this.setState({mealStatus:true})
    fetch(`http://smartmeals.zefiri.com/api/get_meals.php`)
      .then(response => response.json())
      .then(result => {
        this.setState({ meals:result,mealStatus:false })
        return result
      }

      )
      //.then(data => ({ data }))
    //  .catch(err => ({ err }))
  }

  onAddMeal(id, qty, price, name) {
    let order = this.state.order
    if (order[id] ) {
      order[id] = {
        name:name,
        price:price,
        qty:this.state.order[id].qty + qty,
        mealid:id
      }
    } else {
      order[id] = {
        name:name,
        price:price,
        qty:qty,
        mealid:id
      }
    }
      this.setState({order, basketView:{totalItems:this.state.basketView.totalItems + qty, total: this.state.basketView.total + price}})
  }

  render() {
    console.log('state');
    console.log(this.state.order);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
          <MaterialCommunityIcons
            name='food-fork-drink'
            size={80}
            color={theme.palette.secondary.main}
          />
          </View>
          <MealTabBar data={this.state.meals} qtys={this.state.order} onAddMeal={(id ,qty, price, name)=>this.onAddMeal(id, qty, price, name)} />
          <View style={styles.progressbar}>
          {this.state.mealStatus ? <Progressbar /> : null}
          </View>
        </ScrollView>
        <View style={styles.basket} >
          <Basket basketView = {this.state.basketView} order={this.state.order}/>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  progressbar: {
    paddingHorizontal: theme.spacing.unit * 2,
    paddingVertical: theme.spacing.unit,
    margin : 10,
    display:'flex',
    flexDirection: 'row',
    justifyContent:'center',
  },
  basket: {
    flex:1,
    position:'absolute',
    right:theme.spacing.unit,
    top:theme.spacing.unit,
  }
});
