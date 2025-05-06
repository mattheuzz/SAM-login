import { APIGatewayProxyHandler } from 'aws-lambda';
import { connectToDatabase } from '../../db/mongoose';
import { User } from '../../models/user';
import { requireAuth } from '../../middleware/auth';

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const userInfo = requireAuth(event); // 🔐 Autenticado
        await connectToDatabase();

        const user = await User.findOne({ id: userInfo.id });
        if (!user) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'User not found' }),
            };
        }

        const { id, name, email, createdAt, updatedAt } = user.toObject();
        return {
            statusCode: 200,
            body: JSON.stringify({ id, name, email, createdAt, updatedAt }),
        };
    } catch (err) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: err instanceof Error ? err.message : 'Unauthorized' }),
        };
    }
};
