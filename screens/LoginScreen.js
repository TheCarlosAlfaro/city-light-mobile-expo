import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';

export default LoginScreen = () => {
	return (
		<View style={styles.container}>
			<Image
				resizeMode='contain'
				style={styles.logo}
				source={require('../assets/logo_black.png')}
			/>
			<Text style={styles.userInfoText}>Welcome!</Text>
			<TouchableOpacity
				style={styles.button}
				onPress={handlePCOLogin}
				// disabled={userInfo ? true : false}
			>
				<Text style={styles.buttonText}>Login with PCO</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	logo: {
		maxWidth: 400,
		height: 200,
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
		fontWeight: 'bold',
		marginVertical: 30,
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
