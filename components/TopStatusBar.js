import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Constants } from "expo";

export default class TopStatusBar extends React.PureComponent {
	render() {
		const { backgroundColor, ...props } = this.props;
		return (
			<View
				style={{ backgroundColor, height: Constants.statusBarHeight }}
			>
				<StatusBar
					translucent
					backgroundColor={backgroundColor}
					{...props}
				/>
				<Text>Tet</Text>
			</View>
		);
	}
}
