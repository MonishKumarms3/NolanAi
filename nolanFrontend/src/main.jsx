/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import "./index.css";
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<GoogleOAuthProvider clientId='516043725302-s429aci9dptomgds6bu31hk4d29f2jpb.apps.googleusercontent.com'>
			<Provider store={store}>
				<App />
			</Provider>
		</GoogleOAuthProvider>
	</StrictMode>
);
