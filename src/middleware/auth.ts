import { APIGatewayProxyEvent } from 'aws-lambda';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

export const requireAuth = (event: APIGatewayProxyEvent): { id: string; email: string } => {
    const authHeader = event.headers.Authorization || event.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Missing or invalid Authorization header');
    }
    console.log('secret', JWT_SECRET);
    const token = authHeader.replace('Bearer ', '').trim();

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
        return decoded;
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
};
