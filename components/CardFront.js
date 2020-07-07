import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const CardFront = (props) => {
  const {
    cardNumber,
    cardTotal,
    question,
    answer,
    answerIsShowing,
    deckTitle,
    score,
    toggleAnswer,
    incorrectAnswer,
    correctAnswer,
    styles,
  } = props;

  return (
    <View>
      <Text>
        {cardNumber}/{cardTotal - 1}
      </Text>
      <Text>{question}</Text>
      {answerIsShowing && <Text>{answer}</Text>}
      <TouchableOpacity style={styles.button} onPress={toggleAnswer}>
        {!answerIsShowing ? (
          <Text style={styles.buttonText}>Show Answer</Text>
        ) : (
          <Text style={styles.buttonText}>Hide Answer</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonIncorrect}
        onPress={incorrectAnswer}
      >
        <View>
          <Text style={styles.buttonText}>Incorrect</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonCorrect} onPress={correctAnswer}>
        <View>
          <Text style={styles.buttonText}>Correct</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardFront;
