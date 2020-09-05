import React, { useContext, useState, useEffect } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	SafeAreaView,
	Dimensions,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import axios from 'axios';
import { API_GROUPS } from '@env';
import HTML from 'react-native-render-html';

const GroupScreen = ({ route, navigation }) => {
	const { groupData, pcoData } = route.params;
	console.log('Church Info', pcoData.churchInfo);
	const [group, setGroup] = useState(null);
	const [groupType, setGroupType] = useState(null);
	const [groupsTags, setGroupsTags] = useState(null);
	useEffect(() => {
		const getGroup = async () => {
			const response = await axios.get(
				`${API_GROUPS}groups/${groupData.id}`,
				{
					headers: {
						authorization: `Bearer ${pcoData.accessToken}`,
					},
				}
			);

			setGroup(response.data.data);
		};

		if (!group) {
			getGroup();
		}

		const getGroupType = async (id) => {
			const typeResponse = await axios.get(
				`${API_GROUPS}group_types/${id}`,
				{
					headers: {
						authorization: `Bearer ${pcoData.accessToken}`,
					},
				}
			);

			setGroupType(typeResponse.data.data);
		};

		if (group && !groupType) {
			getGroupType(groupData.relationships.group_type.data.id);
		}

		const getGroupsTags = async () => {
			console.log(`${API_GROUPS}tag_groups`);
			const tagResponse = await axios.get(`${API_GROUPS}tag_groups`, {
				headers: {
					authorization: `Bearer ${pcoData.accessToken}`,
				},
			});

			setGroupsTags(tagResponse.data.data);
		};

		if (!groupsTags) {
			getGroupsTags();
		}
	}, [group, groupType, groupsTags]);

	return (
		<SafeAreaView style={styles.container}>
			{group && groupType && (
				<ScrollView style={styles.scrollView}>
					<View style={styles.header}>
						<Image
							source={{
								uri: groupData.attributes.header_image.medium,
							}}
							style={{
								width: 100,
								height: 100,
								borderRadius: 100,
								marginVertical: 10,
							}}
						/>
					</View>
					<View style={styles.container}>
						<Text style={styles.title}>
							{groupData.attributes.name}
						</Text>
						<Text style={styles.subTitle}>
							{groupType.attributes.name}
							{console.log(groupType)}
						</Text>
						<View style={styles.userInfo}>
							{group.attributes.description && (
								<HTML
									html={group.attributes.description}
									imagesMaxWidth={
										Dimensions.get('window').width
									}
								/>
							)}
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>
									SCHEDULE:
								</Text>
								<Text>{groupData.attributes.schedule}</Text>
							</View>
						</View>
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
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
		marginHorizontal: 12,
		backgroundColor: '#fff',
	},
	header: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#fff',
		alignItems: 'center',
		resizeMode: 'contain',
	},
	section: {
		marginVertical: 10,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 18,
	},
	subTitle: {
		fontWeight: 'bold',
		fontSize: 14,
	},
	sectionTitle: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	userInfo: {
		// height: 440,
		// width: 310,
		// alignItems: 'center',
	},

	errorText: {
		color: '#000',
		fontSize: 18,
	},

	placeHolder: {
		fontSize: 40,
	},
});
