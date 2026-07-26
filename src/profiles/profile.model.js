import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: [true, 'El ID de usuario es obligatorio'],
            unique: true
        },
        fullName: {
            type: String,
            trim: true
        },
        preferredLanguage: {
            type: String,
            default: 'es'
        },
        frequentRoutes: [{
            type: String
        }],
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

export default mongoose.model('Profile', profileSchema);
