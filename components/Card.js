import React from "react";
import { connect } from "react-redux";
import { KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import CardFront from "./CardFront";
import Results from "./Results";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: "center",
  },
  buttonCorrect: {
    marginBottom: 30,
    width: 260,
    alignItems: "center",
    backgroundColor: "#008000",
  },
  buttonIncorrect: {
    marginBottom: 30,
    width: 260,
    alignItems: "center",
    backgroundColor: "#7f0000",
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

class Card extends React.Component {
  state = {
    answerIsShowing: false,
  };
  render() {
    const deckTitle = this.props.navigation.state.params.deckTitle;
    const deck = this.props.state[deckTitle];
    const cardNumber = this.props.navigation.state.params.cardNumber + 1;
    const cardTotal = deck.questions.length + 1;

    const endOfDeck = cardNumber >= cardTotal;

    let question = null;
    let answer = null;
    if (!endOfDeck) {
      question = deck.questions[cardNumber - 1].question;
      answer = deck.questions[cardNumber - 1].answer;
    }
    if (endOfDeck) {
      clearLocalNotification().then(setLocalNotification());
    }
    const score = this.props.navigation.state.params.score || {
      correct: 0,
      incorrect: 0,
    };

    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text>Card</Text>

        {!endOfDeck ? (
          <CardFront
            cardNumber={cardNumber}
            cardTotal={cardTotal}
            question={question}
            answer={answer}
            answerIsShowing={this.state.answerIsShowing}
            deckTitle={deckTitle}
            score={score}
            toggleAnswer={() => {
              this.setState({
                answerIsShowing: !this.state.answerIsShowing,
              });
            }}
            incorrectAnswer={() => {
              score.incorrect = score.incorrect++;
              return this.props.navigation.push("Card", {
                deckTitle,
                cardNumber,
                score,
              });
            }}
            correctAnswer={() => {
              score.correct += 1;
              return this.props.navigation.push("Card", {
                deckTitle: deckTitle,
                cardNumber: cardNumber,
                score: score,
              });
            }}
            styles={styles}
          />
        ) : (
          <Results
            cardNumber={cardNumber}
            cardTotal={cardTotal}
            question={question}
            answer={answer}
            answerIsShowing={this.state.answerIsShowing}
            deckTitle={deckTitle}
            score={score}
            goDeck={() => {
              return this.props.navigation.navigate("DeckView", {
                deckTitle: deckTitle,
                cardNumber: 0,
              });
            }}
            restartQuiz={() => {
              return this.props.navigation.navigate("Card", {
                deckTitle: deckTitle,
                cardNumber: 0,
              });
            }}
            styles={styles}
          />
        )}
      </KeyboardAvoidingView>
    );
  }
}
function mapStateToProps(state) {
  return {
    state,
  };
}
export default connect(mapStateToProps)(Card);
