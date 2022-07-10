import { FormEvent, useState, useContext } from 'react'
import { AccountContext as AccCtx } from '../Account'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	let navigate = useNavigate()

	const { authenticate } = useContext(AccCtx)

	const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault()

		authenticate(email, password)
			.then((data) => {
				console.log('Logged in!', data)
				navigate('/')
			})
			.catch((err) => {
				console.log('Failed to login', err)
			})
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				<label>Email</label>
				<input value={email} onChange={(e) => setEmail(e.target.value)} />
				<label>Password</label>
				<input value={password} onChange={(e) => setPassword(e.target.value)} />
				<button>Login</button>
			</form>
		</div>
	)
}

export default Login
