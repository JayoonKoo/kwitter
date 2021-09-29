import React, { useEffect, useState } from "react";
import {authService} from "fbase";
import AppRouter from "components/Router";

function App() {
	const auth = authService.getAuth();
	const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		authService.onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
			setIsLoading(false);
		})
	}, [])
  return (
		<>
		{isLoading? "Loading..." : <AppRouter isLoggedIn={isLoggedIn} auth={auth}/>}
		</>
	);
}

export default App;
