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
import ItemList from "./itemList";

class BasketView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basketClick: false
    };
  }
  render() {
    const { basketView, onRequestClose, order } = this.props;
    const orderArray = Object.values(order);
    const { basketClick } = this.state;
    console.log(orderArray);
    return (
      <SafeAreaView style={styles.root} forceInset={{ bottom: "never" }}>
        <ScrollView>
          <Text>Summary</Text>
          {orderArray &&
            orderArray.map((or,i) => (
              <View key={i+or.name}>
              <ItemList
                onRequestClose={onRequestClose}
                name={or.name}
                price={or.price}
                qty={or.qty}
              />
              </View>
            ))}
            <View style={styles.list}>
              <Text>No. Of items {basketView.totalItems}</Text>
              <Text>Total ₹{basketView.total}</Text>
            </View>
        </ScrollView>
        <Text>Something</Text>
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
  }
});

export default BasketView;
