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
import { API_GENERAL } from '@env';

import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

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

export default HomeScreen = () => {
	const pcoData = useContext(UserInfoContext);
	const [campus, setCampus] = useState(null);

	useEffect(() => {
		const getCampus = async () => {
			const response = await axios.get(`${API_GENERAL}campuses`, {
				headers: {
					authorization: `Bearer ${pcoData.accessToken}`,
				},
			});

			setCampus(response.data.data[0].attributes);
		};

		if (!campus) {
			getCampus();
		}
	}, [campus]);

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
				{campus && (
					<View>
						<Text style={styles.campus}>{campus.name}</Text>
						<Text style={styles.welcomeMessage}>
							Welcome {pcoData.userInfo.data.attributes.name}!
						</Text>
						<View style={styles.contactInfo}>
							<View style={styles.contactItem}>
								<MaterialIcons
									name='phone'
									size={22}
									color='black'
								/>
								<Anchor
									style={styles.contactLink}
									href={`tel:+17029487755`}>
									Phone
								</Anchor>
							</View>
							<View style={styles.contactItem}>
								<MaterialIcons
									name='email'
									size={22}
									color='black'
								/>
								<Anchor
									style={styles.contactLink}
									href={`mailto:${campus.contact_email_address}`}>
									Email
								</Anchor>
							</View>
							<View style={styles.contactItem}>
								<MaterialIcons
									name='link'
									size={22}
									color='black'
								/>
								<Anchor
									style={styles.contactLink}
									href={
										pcoData.churchInfo.data.attributes
											.contact_website
									}>
									Website
								</Anchor>
							</View>
						</View>
						<View style={styles.serviceTimesContainer}>
							<Text style={styles.sectionTitle}>
								Service Times
							</Text>
							<Text style={styles.serviceDay}>Sunday</Text>
							<Text>9:30 AM, 11:30 AM</Text>
						</View>
						<View style={styles.location}>
							<Text style={styles.sectionTitle}>Location</Text>
							<Button title='Directions'></Button>
						</View>
						<MapView
							style={styles.mapStyle}
							initialRegion={{
								latitude: 36.0544542,
								longitude: -115.2825083,
								latitudeDelta: 0.02,
								longitudeDelta: 0.02,
							}}>
							<Marker
								coordinate={{
									latitude: 36.0544542,
									longitude: -115.2825083,
								}}
							/>
						</MapView>
						<Anchor
							style={styles.address}
							href={
								pcoData.churchInfo.data.attributes
									.contact_website
							}>
							{`${campus.street}${'\n'}`}

							{`${campus.city}, ${campus.state} ${campus.zip}`}
						</Anchor>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

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
		paddingTop: Constants.statusBarHeight,
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
