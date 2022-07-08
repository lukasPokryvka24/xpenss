import { createContext } from 'react'
import {
	CognitoUser,
	AuthenticationDetails,
	CognitoUserSession
} from 'amazon-cognito-identity-js'
import Pool from '../auth/UserPool'

const AccountContext = createContext<object>({})

const Account = ({ children }: any) => {
	const getSession = async () => {
		return new Promise((resolve, reject) => {
			const user = Pool.getCurrentUser()

			if (!user) reject()

			user?.getSession((err: null, session: CognitoUserSession) => {
				if (err) reject(err)
				resolve(session)
			})
		})
	}

	const authenticate = async (
		Username: string,
		Password: string
	): Promise<object> => {
		return await new Promise((resolve, reject) => {
			const user = new CognitoUser({ Username, Pool })

			const authDetails = new AuthenticationDetails({
				Username,
				Password
			})

			user.authenticateUser(authDetails, {
				onSuccess(data: CognitoUserSession) {
					console.log('onSuccess:', data)
					resolve(data)
				},
				onFailure(err) {
					console.log('onFailure: ', err)
					reject(err)
				},
				newPasswordRequired(data: any) {
					console.log('newPasswordRequired: ', data)
					resolve(data)
				}
			})
		})
	}

	const logout = () => {
		const user = Pool.getCurrentUser()
		if (user) user.signOut()
	}

	return (
		<AccountContext.Provider value={{ authenticate, getSession, logout }}>
			{children}
		</AccountContext.Provider>
	)
}

export { Account, AccountContext }
