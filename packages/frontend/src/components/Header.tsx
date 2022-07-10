import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AccountContext } from '../pages/Account'

const Header: FunctionComponent = (props) => {
	const [loggedIn, setLoggedIn] = useState<boolean>(false)
	const [userEmail, setUserEmail] = useState<string>('')

	const { getSession } = useContext(AccountContext)

	useEffect(() => {
		getSession()
			.then((session) => {
				setUserEmail(session.email)
				setLoggedIn(true)
			})
			.catch(() => setLoggedIn(false))
	}, [])

	const notLoggedIn = (
		<ul>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</ul>
	)
	const isLoggedIn = (
		<ul>
			<li>{userEmail}</li>
		</ul>
	)
	return <header>{loggedIn ? isLoggedIn : notLoggedIn}</header>
}

export default Header
