import { CognitoUserSession } from 'amazon-cognito-identity-js'
import { useContext, useEffect, useState } from 'react'
import { AccountContext } from './Account'

const Status = () => {
	const [status, setStatus] = useState<boolean>(false)

	const { getSession, logout } = useContext(AccountContext)

	useEffect(() => {
		getSession().then((session: CognitoUserSession) => {
			console.log('Session: ', session)
			setStatus(true)
		})
	}, [])

	return (
		<div>
			{status ? <button onClick={logout}>Logout</button> : 'Please login'}
		</div>
	)
}

export default Status
