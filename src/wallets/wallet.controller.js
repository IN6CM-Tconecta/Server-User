"use strict";

import Wallet from './wallet.model.js';

export const getBalance = async (req, res) => {
    try {
        const userId = req.user?.id || req.query?.userId || req.body?.userId;
        let wallet = await Wallet.findOne({ userId, isActive: true });

        if (!wallet) {
            wallet = new Wallet({ userId, saldo: 0, viajesCortesía: 5 });
            await wallet.save();
        }

        res.status(200).json({
            success: true,
            message: 'Saldo consultado exitosamente',
            data: {
                balance: wallet.saldo,
                courtesyTrips: wallet.viajesCortesía
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al consultar el saldo',
            error: error.message
        });
    }
};

export const initializeWallet = async (req, res) => {
    try {
        const { userId, courtesyTrips = 5, balance = 0 } = req.body;

        let wallet = await Wallet.findOne({ userId });
        if (wallet) {
            wallet.saldo += balance;
            wallet.viajesCortesía = courtesyTrips;
            wallet.isActive = true;
            await wallet.save();
        } else {
            wallet = new Wallet({
                userId,
                saldo: balance,
                viajesCortesía: courtesyTrips,
                isActive: true
            });
            await wallet.save();
        }

        res.status(201).json({
            success: true,
            message: 'Billetera inicializada exitosamente',
            data: wallet
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al inicializar billetera',
            error: error.message
        });
    }
};

export const addFunds = async (req, res) => {
    try {
        const { userId, amount } = req.body;

        let wallet = await Wallet.findOne({ userId, isActive: true });
        if (!wallet) {
            wallet = new Wallet({ userId, saldo: amount, isActive: true });
        } else {
            wallet.saldo += amount;
        }

        await wallet.save();

        res.status(200).json({
            success: true,
            message: 'Fondos acreditados exitosamente',
            data: { balance: wallet.saldo }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al acreditar fondos',
            error: error.message
        });
    }
};
