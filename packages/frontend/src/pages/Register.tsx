import { FormEvent, useState } from 'react'
import UserPool from '../auth/UserPool'

const Register = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault()
		UserPool.signUp(email, password, [], [], (err, data) => {
			if (err) console.error(err)
			console.log(data)
		})
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				<label>Email</label>
				<input value={email} onChange={(e) => setEmail(e.target.value)} />
				<label>Password</label>
				<input value={password} onChange={(e) => setPassword(e.target.value)} />
				<button>Signup</button>
			</form>
		</div>
	)
}

export default Register
