import { FormEvent, useContext, useState } from 'react'
import { AccountContext } from './Account'

const ChangePassword = () => {
	const [password, setPassword] = useState<string>('')
	const [newPassword, setNewPassword] = useState<string>('')

	const { getSession } = useContext(AccountContext)

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		getSession().then(({ user }) => {
			user.changePassword(password, newPassword, (err, result) => {
				if (err) console.log(err)
				else console.log(result)
			})
		})
	}
	return (
		<div>
			<form onSubmit={onSubmit}>
				<label>Old Password</label>
				<input value={password} onChange={(e) => setPassword(e.target.value)} />
				<label>New Password</label>
				<input
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
				<button>Change Password</button>
			</form>
		</div>
	)
}

export default ChangePassword
