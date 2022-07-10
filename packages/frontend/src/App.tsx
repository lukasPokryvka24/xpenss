import SignUp from './pages/Register'
import Status from './pages/Status'
import Settings from './pages/Settings'
import Routes from './router/routes'
import Header from './components/Header'
import { Account } from './pages/Account'
import { BrowserRouter } from 'react-router-dom'

function App() {
	return (
		<Account>
			<BrowserRouter>
				<Header />
				<Routes />
			</BrowserRouter>
		</Account>
	)
}

export default App
