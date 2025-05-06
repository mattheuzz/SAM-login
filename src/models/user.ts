import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

const UserSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            unique: true,
            default: () => `u_${randomUUID()}`,
        },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false }, // 🔒 ocultar no retorno padrão
    },
    {
        timestamps: true,
    },
);

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
