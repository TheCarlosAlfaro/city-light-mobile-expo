import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default HomeScreen = ({ userInfo }) => {
	return userInfo ? (
		<View style={styles.userInfo}>
			<Image
				style={styles.profileImage}
				source={{ uri: userInfo.data.attributes.avatar }}
			/>
			<View>
				<Text style={styles.userInfoText}>Username:</Text>
				<Text style={styles.userInfoText}>
					{userInfo.data.attributes.first_name}
				</Text>
				<Text style={styles.userInfoText}>Last Name:</Text>
				<Text style={styles.userInfoText}>
					{userInfo.data.attributes.last_name}
				</Text>
			</View>
			<Button
				title='Go to Give Screen'
				onPress={() => navigation.navigate('Give')}
			/>
		</View>
	) : (
		<View style={styles.userInfo}>
			<Text style={styles.userInfoText}>Login to City Light Vegas.</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	logo: {
		maxWidth: 400,
		height: 300,
		marginTop: 20,
		marginBottom: 20,
	},
	container: {
		flexDirection: 'column',
		backgroundColor: '#fff',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		backgroundColor: '#000',
		padding: 20,
		marginBottom: 20,
	},
	buttonText: {
		color: '#fff',
		fontSize: 20,
	},
	userInfo: {
		height: 240,
		width: 210,
		alignItems: 'center',
	},
	userInfoText: {
		color: '#000',
		fontSize: 18,
	},
	errorText: {
		color: '#000',
		fontSize: 18,
	},
	profileImage: {
		height: 64,
		width: 64,
		marginBottom: 32,
	},
});
