import React, { Component } from "react";
import { StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getDecks, saveDeckTitle, setInitialData } from "../utils/helpers";
import { purple, white } from "../utils/colors";
import { defaultState } from "../exampleDataShape";
import { receiveDecks } from "../actions/index";

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    getDecks().then((decks) => {
      if (decks === null || undefined) {
        setInitialData(defaultState);
        dispatch(receiveDecks(defaultState));
      } else {
        dispatch(receiveDecks(decks));
      }
    });
  }
  render() {
    const { decks } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Deck List</Text>
        {Object.keys(decks).map((deckTitle, i) => {
          return (
            <TouchableOpacity
              style={styles.button}
              key={i}
              onPress={() =>
                this.props.navigation.navigate("DeckView", decks[deckTitle])
              }
            >
              <Text style={styles.buttonText}>
                {deckTitle} {decks[deckTitle].questions.length}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: "center",
  },
  button: {
    marginBottom: 20,
    width: 260,
    alignItems: "center",
    backgroundColor: "#2196F3",
  },
  buttonText: {
    padding: 20,
    color: "white",
  },
});

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps)(DeckList);
