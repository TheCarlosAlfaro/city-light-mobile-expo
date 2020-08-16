import React, { useState, useEffect, useContext } from 'react';
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { scopes } from './pco';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import GiveScreen from './screens/GiveScreen';
import GroupsScreen from './screens/GroupsScreen';
import CheckinScreen from './screens/CheckinScreen';
import EventsScreen from './screens/EventsScreen';

import UserInfoContext from './context/UserInfoContext';

import {
	AUTH_ENDPOINT,
	ACCESS_TOKEN_ENDPOINT,
	API_ME,
	API_GENERAL,
	CLIENT_ID,
	CLIENT_SECRET,
} from '@env';

const redirectUrl = AuthSession.getRedirectUrl();
const Stack = createStackNavigator();

export default function App() {
	const [code, setCode] = useState(null);
	const [accessToken, setAccessToken] = useState(null);
	const [userInfo, setUserInfo] = useState(null);
	const [churchInfo, setChurchInfo] = useState(null);
	const [didError, setError] = useState(false);

	const pcoData = {
		userInfo,
		churchInfo,
		accessToken,
	};

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

			if (accessToken) {
				const handleGetData = async () => {
					const personal = await axios.get(API_ME, {
						headers: {
							authorization: `Bearer ${accessToken}`,
						},
					});
					setUserInfo(personal.data);

					const generalInfo = await axios.get(API_GENERAL, {
						headers: {
							authorization: `Bearer ${accessToken}`,
						},
					});

					setChurchInfo(generalInfo.data);
				};

				if (!userInfo) {
					handleGetData();
				}
			}
		}
	}, [
		code,
		accessToken,
		userInfo,
		didError,
		churchInfo,
		setUserInfo,
		pcoData,
	]);

	handlePCOLogin = async () => {
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

	const Tab = createBottomTabNavigator();

	return (
		<UserInfoContext.Provider value={pcoData}>
			<NavigationContainer>
				{pcoData.userInfo && pcoData.churchInfo ? (
					<Tab.Navigator
						screenOptions={({ route }) => ({
							tabBarIcon: ({ focused, color, size }) => {
								let iconName;

								if (route.name === 'Home') {
									iconName = focused ? 'md-home' : 'md-home';
								} else if (route.name === 'Give') {
									iconName = focused
										? 'ios-heart'
										: 'ios-heart-empty';
								} else if (route.name === 'Groups') {
									iconName = focused
										? 'ios-people'
										: 'md-people';
								} else if (route.name === 'Check-In') {
									iconName = focused
										? 'md-checkmark-circle'
										: 'ios-checkmark-circle-outline';
								} else if (route.name === 'Events') {
									iconName = focused
										? 'md-calendar'
										: 'ios-calendar';
								}

								// You can return any component that you like here!
								return (
									<Ionicons
										name={iconName}
										size={28}
										color={color}
									/>
								);
							},
						})}
						tabBarOptions={{
							activeTintColor: '#000',
							inactiveTintColor: 'gray',
						}}>
						<Tab.Screen
							name='Home'
							component={HomeScreen}
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
		</UserInfoContext.Provider>
	);
}
