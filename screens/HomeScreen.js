import React, { useContext, useState, useEffect } from 'react';
import {
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
	Image,
	SafeAreaView,
} from 'react-native';
import UserInfoContext from '../context/UserInfoContext';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import axios from 'axios';
import { API_GENERAL } from '@env';

export default HomeScreen = () => {
	const pcoData = useContext(UserInfoContext);
	const userPrimaryCampus = pcoData.userInfo.data.links.primary_campus;
	const [campuses, setCampuses] = useState([]);

	useEffect(() => {
		const getCampuses = async () => {
			const response = await axios.get(`${API_GENERAL}campuses`, {
				headers: {
					authorization: `Bearer ${pcoData.accessToken}`,
				},
			});

			setCampuses([...response.data.data]);
		};

		if (campuses.length < 1) {
			getCampuses();
		}
	}, [campuses]);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.header}>
					<Image
						source={{
							uri: pcoData.churchInfo.data.attributes.avatar_url,
						}}
						style={{ width: 200, height: 100 }}
					/>
				</View>
				<View>
					{console.log('from home', campuses[0])}
					<Text style={styles.campus}>
						{userPrimaryCampus
							? userPrimaryCampus
							: campuses[0].attributes.name}
					</Text>
					<View style={styles.contactInfo}>
						<Text>Some text here</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,

		backgroundColor: 'blue',
	},
	scrollView: {
		backgroundColor: 'yellow',
		marginHorizontal: 10,
	},
	header: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'pink',
		alignItems: 'center',
		resizeMode: 'contain',
		paddingTop: Constants.statusBarHeight,
		paddingBottom: Constants.statusBarHeight,
	},
	campus: {
		padding: 20,
		fontSize: 24,
	},
	contactInfo: {
		borderTopWidth: 0.5,
		borderBottomWidth: 0.5,
		padding: 15,
	},
});
