import {
	CognitoUserPool,
	ICognitoUserPoolData
} from 'amazon-cognito-identity-js'

const poolData: ICognitoUserPoolData = {
	UserPoolId: 'eu-central-1_LsyD1Mysm',
	ClientId: '2rgbi8cnd7apgn5lj3d7csqeis'
}

export default new CognitoUserPool(poolData)
