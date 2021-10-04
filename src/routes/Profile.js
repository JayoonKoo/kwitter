import React, { useEffect } from 'react'
import {authService, dbService} from 'fbase';
import { useHistory } from 'react-router';

const Profile = ({auth, userObj, firestore}) => {
	const history = useHistory()
	const {query, collection, where, getDocs} = dbService;

	const logOut = async () => {
		await authService.signOut(auth);
		history.push("/");
	}

	const getKweets = async () => {
		const q = query(collection(firestore, "kweet"), 
			where("createrId", "==", userObj.uid));
		
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(doc => console.log(doc.data()));
	}

	useEffect(() => {
		getKweets();
	})
	
	return (
		<>
			<button onClick={logOut}>로그아웃</button>
		</>
	);
}

export default Profile;
