import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
} from "react-native";
import { saveCardToDeck } from "../utils/helpers";

import { addCard } from "../actions/index";
import { Component } from "react";

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
    padding: 20,
    color: "white",
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

class NewCard extends Component {
  state = {
    question: "",
    answer: "",
  };

  changeQuestion = (question) => {
    this.setState({ question });
  };

  changeAnswer = (answer) => {
    this.setState({ answer });
  };

  render() {
    const { question, answer } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text>New Card</Text>
        <Text>Question</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: 260,
          }}
          onChangeText={(question) => this.changeQuestion(question)}
          value={question}
        />
        <Text>Answer</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: 260,
          }}
          onChangeText={(answer) => this.changeAnswer(answer)}
          value={answer}
        />
        <TouchableOpacity
          disabled={this.state.text === ""}
          onPress={() => {
            const action = this.props.dispatch(
              addCard(this.state, this.props.navigation.state.params)
            );
            saveCardToDeck(action);
            this.props.navigation.navigate("Home");
          }}
          style={this.statetext === "" ? styles.buttonDisabled : styles.button}
        >
          <Text>Save Card</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(NewCard);
