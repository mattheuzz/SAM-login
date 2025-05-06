import { APIGatewayProxyHandler } from 'aws-lambda';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../db/mongoose';
import { User } from '../../models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'development-secret'; // use uma env real em produção

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        await connectToDatabase();
        const body = JSON.parse(event.body || '{}');
        const { email, password } = body;

        if (!email || !password) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'email and password are required' }),
            };
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Invalid credentials' }),
            };
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Invalid credentials' }),
            };
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        return {
            statusCode: 200,
            body: JSON.stringify({ token }),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' }),
        };
    }
};
