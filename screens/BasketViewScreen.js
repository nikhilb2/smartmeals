import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  SafeAreaView
} from "react-native";
import theme from "../src/theme";
import ItemList from "../components/itemList";
import Button from "../components/button";
import { currentSession } from '../src/auth/UserSession'
import Progressbar from '../components/progressbar'

class BasketViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderResult: null,
      orderStatus: false,
      orderPlaced: false
    };
  }

  placeOrder() {
    const { params } = this.props.navigation.state;
    this.setState({ orderStatus: true })
    const orderArray = Object.values(params.order)
    console.log(orderArray);
    fetch('http://smartmeals.zefiri.com/api/order.php', {
      method: 'POST',
      body: JSON.stringify({meals:orderArray}),
      headers: {
          "Content-Type": "application/json",
          "jwt": currentSession.jwt
      },
    })
    .then(response =>response.json())
    .then(result => {
      this.setState({orderResult:result.data, orderStatus: false, orderPlaced:true})
      return result
    })
  }


  render() {
    const { params } = this.props.navigation.state;
    const { navigation } = this.props;
    const { orderPlaced, orderResult, orderStatus } = this.state
    const orderArray = params && Object.values(params.order);
    console.log(params);
    return (
      <SafeAreaView style={styles.root} forceInset={{ bottom: "never" }}>
        <ScrollView>
          { orderPlaced
            ? <View style={styles.orderSuccess}>
                <Text>Your order has been placed</Text>
                <Text>You have to pay ₹{params.basketView.total}</Text>
                <Text>Your order no. is {orderResult.orderid}</Text>
                <Text>Order should be ready in 10 mins</Text>
                      <Button
                        onClick={()=>{
                          this.setState({orderPlaced:false})
                          navigation.navigate("Home")
                        }}
                        caption="Go Back"
                        style={styles.signinBtn}
                      />
                </View>
            : <View>
              <Text>Summary</Text>
            {orderArray &&
              orderArray.map((or,i) => (
                <View key={i+or.name}>
                <ItemList
                  name={or.name}
                  price={or.price}
                  qty={or.qty}
                />
                </View>
              ))}
              <View style={styles.list}>
                <Text style={styles.fontWeight}>No. Of items { params && params.basketView.totalItems}</Text>
                <Text style={styles.fontWeight}>Total ₹{ params && params.basketView.total}</Text>
              </View>
            </View>
          }

        </ScrollView>
        {orderPlaced
          ? null
          : <View>
            {orderStatus
              ? <Progressbar />
              : <View style={styles.buttons}>
                {orderArray.length>0
                  ? <Button
                    onClick={()=>{
                      if (currentSession && currentSession.jwt) {
                        this.placeOrder()
                      } else {
                        navigation.navigate('SigninScreen',params)
                      }

                    }}
                    caption={params.user && params.user.jwt ? "Place Order" : "Login"}
                    style={styles.signinBtn}
                  />
                  : null
                }

              <Button
                onClick={()=>{navigation.navigate('Home')}}
                caption="Go Back"
                style={styles.signinBtn}
              />
              </View>
            }
          </View>
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.main,
    paddingTop: theme.spacing.unit
  },
  list: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  fontWeight: {
    fontWeight: 'bold',
  },
  buttons: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  orderSuccess: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  }
});

export default BasketViewScreen;
