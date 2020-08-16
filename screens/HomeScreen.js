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
import * as Linking from 'expo-linking';
import axios from 'axios';
import { API_GENERAL } from '@env';

import { MaterialIcons } from '@expo/vector-icons';

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
					</View>
				)}
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
});
