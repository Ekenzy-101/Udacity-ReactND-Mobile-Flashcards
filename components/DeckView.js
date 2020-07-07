import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
} from "react-native";

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
  buttonText: {
    padding: 20,
    color: "white",
  },
});

class DeckView extends Component {
  render() {
    const { title, questions } = this.props.navigation.state.params;
    const deckTitle = title;
    return (
      <View style={styles.container}>
        <Text>{title}</Text>
        <Text>{questions.length} Cards</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            return this.props.navigation.navigate("NewCard", title);
          }}
        >
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            return this.props.navigation.push("Card", {
              deckTitle: deckTitle,
              cardNumber: 0,
            });
          }}
        >
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(DeckView);
