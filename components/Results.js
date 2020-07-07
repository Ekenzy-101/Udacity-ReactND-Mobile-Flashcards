import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const Results = (props) => {
  const { cardTotal, score, goDeck, restartQuiz, styles } = props;
  return (
    <View>
      <Text>
        {score.correct}/{cardTotal - 1} Questions Answered Correctly
      </Text>
      <TouchableOpacity style={styles.button} onPress={goDeck}>
        <Text style={styles.buttonText}>Back to Deck</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={restartQuiz}>
        <Text style={styles.buttonText}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Results;
