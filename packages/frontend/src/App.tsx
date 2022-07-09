import SignUp from './pages/Register'
import Login from './pages/Login'
import Status from './pages/Status'
import Settings from './pages/Settings'
import { Account } from './pages/Account'

function App() {
	return (
		<Account>
			<Status />
			<SignUp />
			<Login />
			<Settings />
		</Account>
	)
}

export default App
