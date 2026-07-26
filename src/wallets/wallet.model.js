import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: [true, 'El ID de usuario es obligatorio'],
            unique: true
        },
        saldo: {
            type: Number,
            required: true,
            default: 0.0,
            min: [0, 'El saldo no puede ser negativo']
        },
        viajesCortesía: {
            type: Number,
            default: 5
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model('Wallet', walletSchema);
