import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const GiveScreen = () => {
	return (
		<View style={styles.container}>
			<View style={styles.userInfo}>
				<Text style={styles.placeHolder}>
					This is supposed to be the Give Screen
				</Text>
			</View>
		</View>
	);
};

export default GiveScreen;

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
