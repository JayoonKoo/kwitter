import React from 'react'
import {authService} from 'fbase';
import { useHistory } from 'react-router';

const Profile = ({auth}) => {
	const history = useHistory()
	const logOut = async () => {
		await authService.signOut(auth);
		history.push("/");
	}
	
	return (
		<>
			<button onClick={logOut}>로그아웃</button>
		</>
	);
}

export default Profile;
