import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

const GroupScreen = ({ route, navigation }) => {
	const { groupData, pcoData } = route.params;

	return (
		<ScrollView style={styles.scrollView}>
			<View style={styles.header}>
				<Image
					source={{
						uri: groupData.attributes.header_image.medium,
					}}
					style={{
						width: 200,
						height: 200,
						borderRadius: 100,
						marginVertical: 10,
					}}
				/>
			</View>
			<View style={styles.container}>
				<View style={styles.userInfo}>
					<Text>Group Name: {groupData.attributes.name}</Text>
					{console.log(groupData)}
				</View>
			</View>
		</ScrollView>
	);
};

export default GroupScreen;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		backgroundColor: '#fff',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	scrollView: {
		backgroundColor: '#fff',
		marginHorizontal: 10,
	},
	header: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#fff',
		alignItems: 'center',
		resizeMode: 'contain',
		paddingBottom: Constants.statusBarHeight,
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
