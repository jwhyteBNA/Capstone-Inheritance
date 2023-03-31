import { Routes } from "react-router-dom"
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./LivingLegend.css"


export const LivingLegend = () => {
	return <Routes>
		
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					<ApplicationViews />
					
				</>
			</Authorized>

		} />
	</Routes>
}

