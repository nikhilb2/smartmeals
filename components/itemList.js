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
import TopBar from "./topbar";

const ItemList = props => {
  const { onRequestClose, name, price, qty } = props;
  return (
      <View style={styles.list}>
        <Text>{qty} {name} X ₹{price}</Text>
        <Text>₹{price * qty}</Text>
      </View>
  );
};

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

export default ItemList;
