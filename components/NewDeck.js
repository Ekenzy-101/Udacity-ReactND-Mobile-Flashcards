import React from "react";
import { connect } from "react-redux";
import {
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
} from "react-native";
import { saveDeckTitle } from "../utils/helpers";

import { addDeckTitle } from "../actions/index";

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: "center",
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: "center",
    backgroundColor: "#2196F3",
  },
  buttonDisabled: {
    marginBottom: 30,
    width: 260,
    alignItems: "center",
    backgroundColor: "#808080",
  },
  buttonText: {
    padding: 20,
    color: "white",
  },
});

class NewDeck extends React.Component {
  state = {
    text: "",
  };
  render() {
    const { dispatch } = this.props;
    const { text } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: 260,
          }}
          onChangeText={(text) => this.setState({ text })}
          value={text}
        />

        <TouchableOpacity
          disabled={text === ""}
          onPress={() => {
            saveDeckTitle(text).then((results) => {
              dispatch(addDeckTitle(results));
              this.props.navigation.navigate("DeckView", {
                deckTitle: text,
                questions: 0,
                cardNumber: 0,
              });
            });
          }}
        >
          <View style={text === "" ? styles.buttonDisabled : styles.button}>
            <Text style={styles.buttonText}>Save Deck</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(NewDeck);
