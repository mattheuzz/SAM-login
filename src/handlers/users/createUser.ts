import { APIGatewayProxyHandler } from 'aws-lambda';
import { connectToDatabase } from '../../db/mongoose';
import { User } from '../../models/user';

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        await connectToDatabase();
        const body = JSON.parse(event.body || '{}');

        const { name, email, password } = body;
        if (!name || !email || !password) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'name, email, and password are required' }),
            };
        }

        const newUser = await User.create({ name, email, password });

        const { id, createdAt, updatedAt } = newUser.toObject();
        return {
            statusCode: 201,
            body: JSON.stringify({ id, name, email, createdAt, updatedAt }),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: err }),
        };
    }
};
