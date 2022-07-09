import { createContext } from 'react'
import {
	CognitoUser,
	AuthenticationDetails,
	CognitoUserSession,
	CognitoUserAttribute,
	CognitoIdToken,
	CognitoRefreshToken,
	CognitoAccessToken
} from 'amazon-cognito-identity-js'
import Pool from '../auth/UserPool'

const AccountContext = createContext<IAccountContext>({
	getSession() {
		return new Promise((res, _) => res({}))
	},
	authenticate(Username, Password) {
		return new Promise((res, _) => res({}))
	}
})

interface IAccountContext {
	getSession: () => Promise<object>
	authenticate: (Username: string, Password: string) => Promise<object>
	logout?: () => void
}

interface ISessionResult extends IUserAttributes {
	user: CognitoUser
}

interface IUserAttributes {
	sub: string
	email_verified: string
	email: string
}

interface ISession {
	idToken: CognitoIdToken
	refreshToken: CognitoRefreshToken
	accessToken: CognitoAccessToken
	clockDrift: number
}

const Account = ({ children }: any) => {
	const getSession = async (): Promise<ISessionResult> => {
		return new Promise((resolve, reject) => {
			const user = Pool.getCurrentUser()

			if (!user) reject()

			user?.getSession(async (err: null, session: CognitoUserSession) => {
				if (err) reject(err)

				const userAttributes: IUserAttributes = await new Promise(
					(resolve, reject) => {
						user.getUserAttributes(
							(err, attributes: CognitoUserAttribute[] | undefined) => {
								if (err) reject(err)

								const results = {}
								if (attributes) {
									for (let attribute of attributes) {
										const { Name, Value } = attribute
										//@ts-ignore
										results[Name] = Value
									}
									//@ts-ignore
									resolve(results)
								}
							}
						)
					}
				)
				const result: ISessionResult = { user, ...session, ...userAttributes }
				resolve(result)
			})
		})
	}

	const authenticate = async (
		Username: string,
		Password: string
	): Promise<object> => {
		return new Promise((resolve, reject) => {
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
