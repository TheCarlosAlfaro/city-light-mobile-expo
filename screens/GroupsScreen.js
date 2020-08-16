import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const GroupsStack = createStackNavigator();

const CheckinScreen = () => {
	return (
		<View style={styles.container}>
			<View style={styles.userInfo}>
				<Text style={styles.placeHolder}>Groups Screen</Text>
			</View>
		</View>
	);
};

export default function GroupsStackScreen() {
	return (
		<GroupsStack.Navigator>
			<GroupsStack.Screen name='Groups' component={CheckinScreen} />
		</GroupsStack.Navigator>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		backgroundColor: '#fff',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	userInfo: {
		height: 440,
		width: 310,
		alignItems: 'center',
	},

	errorText: {
		color: '#000',
		fontSize: 18,
	},

	placeHolder: {
		fontSize: 40,
	},
});
