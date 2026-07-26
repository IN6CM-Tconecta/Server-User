"use strict";

import Tour from './tour.model.js';
import Wallet from '../wallets/wallet.model.js';
import { calculateDistance, estimateTravelTime } from '../utils/geo-utils.js';

const STANDARD_FARE = 1.00; 

export const planTour = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId;
        const { originLat, originLon, destLat, destLon, systemType = "TRANSMETRO" } = req.body;

        let wallet = await Wallet.findOne({ userId, isActive: true });
        if (!wallet) {
            wallet = new Wallet({ userId, saldo: 0 });
            await wallet.save();
        }

        let fare = STANDARD_FARE;
        if (systemType.toUpperCase() === "TRANSURBANO") {
            fare = 2.00;
        } else if (systemType.toUpperCase() === "TUBUS") {
            fare = 1.00;
        }

        if (wallet.saldo < fare) {
            return res.status(402).json({
                success: false,
                message: `Saldo insuficiente para planear viaje en ${systemType}.`,
                data: { currentBalance: wallet.saldo, requiredFare: fare }
            });
        }

        let warning = null;
        if (wallet.saldo === fare) {
            warning = 'Advertencia: Su saldo quedará en Q0.00 después de este viaje. Por favor recargue pronto.';
        }

        const distanceMeters = calculateDistance(originLat, originLon, destLat, destLon);
        const estimatedTime = estimateTravelTime(distanceMeters);

        wallet.saldo -= fare;
        await wallet.save();

        const newTour = new Tour({
            userId,
            origen: { lat: originLat, lon: originLon },
            destino: { lat: destLat, lon: destLon },
            distanciaMetros: distanceMeters,
            tiempoEstimadoMinutos: estimatedTime,
            tarifaCobrada: fare,
            status: true,
            isActive: true
        });

        await newTour.save();

        const distanceKm = (distanceMeters / 1000).toFixed(2);
        let itinerary = `Tramo Directo Transmetro (${distanceKm} km)`;
        if (distanceMeters > 5000) {
            itinerary = `Ruta Multimodal: Alimentador TuBus Barrio -> Transbordo Estación Troncal Transmetro (${distanceKm} km)`;
        } else if (systemType.toUpperCase() === "TRANSURBANO") {
            itinerary = `Ruta Periférica Transurbano (${distanceKm} km)`;
        }

        res.status(200).json({
            success: true,
            message: 'Viaje planeado exitosamente',
            data: {
                tourId: newTour._id,
                systemType: systemType.toUpperCase(),
                estimatedDistance: `${distanceKm} km`,
                estimatedTime: `${estimatedTime} minutos`,
                chargedFare: `Q${fare.toFixed(2)}`,
                remainingBalance: `Q${wallet.saldo.toFixed(2)}`,
                itinerary
            },
            warning 
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al planear el viaje',
            error: error.message
        });
    }
};

export const getUserTours = async (req, res) => {
    try {
        const userId = req.user?.id || req.query.userId;
        const tours = await Tour.find({ userId, isActive: true }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            total: tours.length,
            data: tours
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener historial de viajes',
            error: error.message
        });
    }
};
