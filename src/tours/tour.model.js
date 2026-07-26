import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: [true, 'El ID de usuario es obligatorio']
        },
        origen: {
            lat: { type: Number, required: true },
            lon: { type: Number, required: true }
        },
        destino: {
            lat: { type: Number, required: true },
            lon: { type: Number, required: true }
        },
        distanciaMetros: {
            type: Number,
            required: true
        },
        tiempoEstimadoMinutos: {
            type: Number,
            required: true
        },
        tarifaCobrada: {
            type: Number,
            required: true,
            default: 1.00
        },
        status: {
            type: Boolean,
            default: true
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

export default mongoose.model('Tour', tourSchema);
