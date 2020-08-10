import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { scopes } from './pco';
import LoginScreen from './components/LoginScreen';
import ScreenContext from './ScreenContext';

import {
	AUTH_ENDPOINT,
	ACCESS_TOKEN_ENDPOINT,
	API_ENDPOINT,
	CLIENT_ID,
	CLIENT_SECRET,
} from '@env';

const redirectUrl = AuthSession.getRedirectUrl();
const Stack = createStackNavigator();

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
const GroupsScreen = () => {
	return (
		<View style={styles.container}>
			<View style={styles.userInfo}>
				<Text style={styles.placeHolder}>
					This is supposed to be the GROUP Screen
				</Text>
			</View>
		</View>
	);
};
const CheckinScreen = () => {
	return (
		<View style={styles.container}>
			<View style={styles.userInfo}>
				<Text style={styles.placeHolder}>
					This is supposed to be the CHECK-IN Screen
				</Text>
			</View>
		</View>
	);
};
const EventsScreen = () => {
	return (
		<View style={styles.container}>
			<View style={styles.userInfo}>
				<Text style={styles.placeHolder}>
					This is supposed to be the EVENTS Screen
				</Text>
			</View>
		</View>
	);
};

export default function App() {
	const [code, setCode] = useState(null);
	const [accessToken, setAccessToken] = useState(null);
	const [userInfo, setUserInfo] = useState(null);
	const [didError, setError] = useState(false);

	useEffect(() => {
		if (!code) {
			setError(false);
		} else {
			const params = {
				grant_type: 'authorization_code',
				code: code,
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				redirect_uri: redirectUrl,
			};

			const getAccessToken = async () => {
				const response = await axios.post(
					ACCESS_TOKEN_ENDPOINT,
					params
				);
				setAccessToken(response.data.access_token);
			};

			if (!accessToken && code) {
				getAccessToken();
			}

			if (!accessToken) {
				setError(false);
				setUserInfo(null);
			} else {
				const handleGetData = async () => {
					const response = await axios.get(API_ENDPOINT, {
						headers: {
							authorization: `Bearer ${accessToken}`,
						},
					});
					setUserInfo(response.data);
				};
				if (!userInfo) {
					handleGetData();
				}
			}
		}
	}, [code, accessToken, userInfo, didError]);

	handleSpotifyLogin = async () => {
		let results = await AuthSession.startAsync({
			authUrl: `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${redirectUrl}&response_type=code&scope=${scopes.join(
				'%20'
			)}`,
		});

		setCode(results.params.code);
	};

	handlePCOLogout = () => {
		setCode(null);
		setAccessToken(null);
		setUserInfo(null);
	};

	displayError = () => {
		return (
			<View style={styles.userInfo}>
				<Text style={styles.errorText}>
					There was an error, please try again.
				</Text>
			</View>
		);
	};

	const Tab = createBottomTabNavigator();
	homeScreen = () => {
		{
			return userInfo ? (
				<View style={styles.container}>
					<View style={styles.userInfo}>
						<Image
							style={styles.profileImage}
							source={{ uri: userInfo.data.attributes.avatar }}
						/>
						<View>
							<Text style={styles.userInfoText}>First Name:</Text>
							<Text style={styles.userInfoText}>
								{userInfo.data.attributes.first_name}
							</Text>
							<Text style={styles.userInfoText}>Last Name:</Text>
							<Text style={styles.userInfoText}>
								{userInfo.data.attributes.last_name}
							</Text>
						</View>
						<TouchableOpacity
							style={styles.button}
							onPress={handlePCOLogout}>
							<Text style={styles.buttonText}>Log Out</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : (
				<LoginScreen />
			);
		}
	};

	return (
		<ScreenContext.Provider>
			<NavigationContainer>
				{userInfo ? (
					<Tab.Navigator>
						<Tab.Screen
							userInfo={userInfo}
							name='Home'
							component={homeScreen}
							options={{ title: 'Home' }}
						/>
						<Tab.Screen
							name='Give'
							component={GiveScreen}
							options={{ title: 'Give' }}
						/>
						<Tab.Screen
							name='Groups'
							component={GroupsScreen}
							options={{ title: 'Groups' }}
						/>
						<Tab.Screen
							name='Check-In'
							component={CheckinScreen}
							options={{ title: 'Check-In' }}
						/>
						<Tab.Screen
							name='Events'
							component={EventsScreen}
							options={{ title: 'Events' }}
						/>
					</Tab.Navigator>
				) : (
					<Stack.Navigator>
						<Stack.Screen name='Login' component={LoginScreen} />
					</Stack.Navigator>
				)}
			</NavigationContainer>
		</ScreenContext.Provider>
	);
}

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
		height: 440,
		width: 310,
		alignItems: 'center',
	},
	userInfoText: {
		color: '#000',
		fontSize: 22,
	},
	errorText: {
		color: '#000',
		fontSize: 18,
	},
	profileImage: {
		height: 200,
		width: 200,
		marginBottom: 32,
	},
	placeHolder: {
		fontSize: 40,
	},
});
