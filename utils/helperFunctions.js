import { scopes } from './pco';
import {
	AUTH_ENDPOINT,
	ACCESS_TOKEN_ENDPOINT,
	API_ME,
	API_GENERAL,
	CLIENT_ID,
	CLIENT_SECRET,
} from '@env';

export default const handlePCOLogin = async () => {
	let results = await AuthSession.startAsync({
		authUrl: `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${redirectUrl}&response_type=code&scope=${scopes.join(
			'%20'
		)}`,
	});

	setCode(results.params.code);
};

export default handlePCOLogout = () => {
	setCode(null);
	setAccessToken(null);
	setUserInfo(null);
};
