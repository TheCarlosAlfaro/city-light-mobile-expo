import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import { UserInfoContext } from '../UserInfoContext';

export default HomeScreen = () => {
	// const [userInfo, setUserInfo] = useContext(UserInfoContext);

	return (
		<View style={styles.container}>
			<View style={styles.userInfo}>
				{/* <Image
					style={styles.profileImage}
					source={{ uri: userInfo.data.attributes.avatar }}
				/>
				<Image
					style={styles.profileImage}
					source={{
						uri: churchInfo.data.attributes.avatar_url,
					}}
				/> */}
				<View>
					<Text style={styles.userInfoText}>First Name:</Text>
					<Text style={styles.userInfoText}>
						{/* {console.log('from HOME', userInfo)} */}
					</Text>
					<Text style={styles.userInfoText}>Last Name:</Text>
					<Text style={styles.userInfoText}>
						{/* {userInfo.data.attributes.last_name} */}
						bye
					</Text>
				</View>
				<TouchableOpacity
					style={styles.button}
					onPress={handlePCOLogout}>
					<Text style={styles.buttonText}>Log Out</Text>
				</TouchableOpacity>
			</View>
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
