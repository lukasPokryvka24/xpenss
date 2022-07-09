import { useContext, useEffect, useState } from 'react'
import { AccountContext } from './Account'
import ChangePassword from './ChangePassword'

const Settings = () => {
	const { getSession } = useContext(AccountContext)
	const [loggedIn, setLoggedIn] = useState<boolean>(false)

	useEffect(() => {
		getSession()
			.then(() => {
				setLoggedIn(true)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	return (
		<div>
			{loggedIn && (
				<>
					<h2>Settings</h2>
					<ChangePassword />
				</>
			)}
		</div>
	)
}
export default Settings
