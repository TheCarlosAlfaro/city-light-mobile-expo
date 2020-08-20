import React, { useContext, useState, useEffect } from 'react';
import {
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
	Image,
	SafeAreaView,
	Button,
	Dimensions,
} from 'react-native';
import UserInfoContext from '../context/UserInfoContext';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import axios from 'axios';
import { API_GROUPS } from '@env';
import Group from './Group';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const GroupStack = createStackNavigator();

class Anchor extends React.Component {
	_handlePress = () => {
		Linking.openURL(this.props.href);
		this.props.onPress && this.props.onPress();
	};

	render() {
		return (
			<Text {...this.props} onPress={this._handlePress}>
				{this.props.children}
			</Text>
		);
	}
}

const GroupsScreen = ({ navigation }) => {
	const pcoData = useContext(UserInfoContext);
	const [groups, setGroups] = useState(null);

	useEffect(() => {
		const getGroups = async () => {
			const response = await axios.get(
				`${API_GROUPS}group_types/30091/groups`,
				{
					headers: {
						authorization: `Bearer ${pcoData.accessToken}`,
					},
				}
			);

			setGroups(response.data.data);
		};

		if (!groups) {
			getGroups();
		}
	}, [groups]);

	return (
		<SafeAreaView style={styles.container}>
			{groups && (
				<ScrollView style={styles.scrollView}>
					<View>
						{groups.map((group, index) => {
							if (group.attributes.enrollment_open) {
								return (
									<View
										key={index}
										style={{
											marginVertical: 15,
											width: '95%',
											alignSelf: 'center',
										}}>
										<TouchableOpacity
											style={styles.button}
											onPress={() =>
												navigation.navigate('Group', {
													groupData: group,
													pcoData,
												})
											}>
											<Image
												source={{
													uri:
														group.attributes
															.header_image
															.medium,
												}}
												style={{
													width: '100%',
													height: 220,
													borderRadius: 5,
													marginVertical: 5,
												}}
											/>
											<Text
												style={{
													fontSize: 18,
													fontWeight: 'bold',
												}}>
												{group.attributes.name}
											</Text>
											<Text
												style={{
													fontSize: 14,
												}}>
												{group.attributes.schedule}
											</Text>
										</TouchableOpacity>
									</View>
								);
							}
							return;
						})}
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

export default function GroupStackScreen() {
	const pcoData = useContext(UserInfoContext);

	return (
		<GroupStack.Navigator>
			<GroupStack.Screen
				name='Groups'
				component={GroupsScreen}
				options={{
					headerRight: () => (
						<TouchableOpacity
							onPress={() => alert('This is a button!')}>
							<Image
								source={{
									uri:
										pcoData.userInfo.data.attributes.avatar,
								}}
								style={{
									width: 30,
									height: 30,
									borderRadius: 100,
									marginHorizontal: 20,
								}}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<GroupStack.Screen name='Group' component={Group} />
		</GroupStack.Navigator>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		backgroundColor: '#fff',
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
	campus: {
		fontWeight: 'bold',
		marginVertical: 5,
		fontSize: 24,
		alignSelf: 'center',
	},
	welcomeMessage: {
		fontSize: 16,
		marginVertical: 5,
		alignSelf: 'center',
	},
	contactInfo: {
		borderTopWidth: 0.5,
		borderBottomWidth: 0.5,
		padding: 15,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	contactItem: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	contactLink: {
		marginStart: 5,
	},
	serviceTimesContainer: {
		backgroundColor: '#fff',
		paddingVertical: 20,
	},
	sectionTitle: {
		fontWeight: 'bold',
		fontSize: 24,
		paddingVertical: 5,
	},
	serviceDay: {
		fontWeight: 'bold',
		fontSize: 18,
		paddingVertical: 5,
	},
	location: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	mapStyle: {
		width: Dimensions.get('window').width - 20,
		height: 200,
	},
	address: {
		fontSize: 18,
		paddingVertical: 20,
	},
});
