import jwt from 'jsonwebtoken'
import { HTTP400Error, HttpValidationError } from 'ciencia-argentina-backend-commons';

interface Claims {
	id: number
	description: string
}
interface Roles {
	id: number
	description: string
	claims: Claims[]
}
interface JwtToken {
	auth_id?: string;
	username?: string;
	email?: string;
	expires_at?: number;
	roles?: Roles[];
}

export const verifyToken = (token:string, required_claim:string): void => {
	const decoded:JwtToken = jwt.verify(token, process.env.JWT_SIGNATURE || '')
	if(!decoded) {
		throw new HTTP400Error('invalid_token');
	}
	if(decoded.expires_at)
}