import React, { createContext, useState } from 'react';

export const UserInfoContext = createContext();

export const UserInfoProvider = (props) => {
	const [userInfo, setUserInfo] = useState(null);

	return (
		<UserInfoContext.Provider value={[userInfo, setUserInfo]}>
			{props.children}
		</UserInfoContext.Provider>
	);
};
