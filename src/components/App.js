import React, { useState } from "react";
import {authService} from "fbase";
import AppRouter from "components/Router";

function App() {
	const user = authService.currentUser;
  const [isLoggedIn, setIsLoggedIn] = useState(user);
  return <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;
