import { Route, Routes as Links } from 'react-router-dom'
import LandingPage from '../pages/LandingPage/LandingPage'
import Login from '../pages/Login/Login'

const Routes = () => {
	return (
		<Links>
			<Route path="/" element={<LandingPage />} />
			<Route path="/login" element={<Login />} />
		</Links>
	)
}

export default Routes
