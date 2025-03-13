/** @format */

import React, { useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashNav from "./components/DashNav";
import KTComponent from "./metronic/core/index.spa";
import KTLayout from "./metronic/app/layouts/demo1.js";
import ScriptEditor from "./pages/ScriptEditor.jsx";
import Editor from "./pages/Editor.jsx";
import AiEditor from "./pages/AiEditor.jsx";
import Test from "./pages/Test.jsx";
function Layout() {
	const location = useLocation();

	const showNavbar =
		location.pathname !== "/dashboard" &&
		location.pathname !== "/project" &&
		location.pathname !== "/editorE" &&
		!/^\/editor\/\d+$/.test(location.pathname);

	return (
		<>
			{showNavbar ? <Navbar /> : <DashNav />}
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/dashboard' element={<Dashboard />} />

				<Route path='/editor/:id' element={<ScriptEditor />} />
				<Route path='/editorE' element={<Editor />} />
				<Route path='/ai-editor' element={<AiEditor />} />
				<Route path='/test' element={<Test />} />
			</Routes>
		</>
	);
}

function App() {
	useEffect(() => {
		KTComponent.init();
		KTLayout.init();
	}, []);

	return (
		<Router>
			<Layout />
		</Router>
	);
}

export default App;
