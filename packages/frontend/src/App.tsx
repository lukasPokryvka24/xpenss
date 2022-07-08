import SignUp from './pages/Register'
import Login from './pages/Login'
import Status from './pages/Status'
import { Account } from './pages/Account'

function App() {
	return (
		<Account>
			<Status />
			<SignUp />
			<Login />
		</Account>
	)
}

export default App
