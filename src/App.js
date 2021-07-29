import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from './components/pages/register/Register';
import Write from './components/write/Write';
import Login from './components/pages/login/Login';
import Single from './components/pages/single/Single';
import Home from './components/pages/home/Home';
import Topbar from './components/topbar/Topbar';
import Settings from './components/pages/settings/Settings';
import {useContext} from "react";
import { Context } from './context/Context';
import About from './components/about/About';
import Contact from './components/contact/Contact';


function App() {
	const {user} = useContext(Context)
		return (
		<Router>
			<Topbar />
			<Switch>
				<Route exact path="/">
					<Home/>
				</Route>
				<Route path="/write">
					{user ? <Write /> : <Register />}
				</Route>
				<Route path="/login">
					{user ? <Home /> : <Login />}
				</Route>
				<Route path="/register">
					{user ? <Home /> : <Register />}
				</Route>
				<Route path="/settings">
					{user ? <Settings /> : <Home />}
				</Route>
				<Route path="/post/:id">
					<Single />
				</Route>
				<Route path="/about">
					<About />
				</Route>
				<Route path="/contact">
					<Contact />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
