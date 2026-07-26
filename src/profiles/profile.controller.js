"use strict";

import Profile from './profile.model.js';

export const getProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        let profile = await Profile.findOne({ userId });

        if (!profile) {
            profile = new Profile({ userId });
            await profile.save();
        }

        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener perfil de usuario',
            error: error.message
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { fullName, preferredLanguage, frequentRoutes } = req.body;

        const profile = await Profile.findOneAndUpdate(
            { userId },
            { fullName, preferredLanguage, frequentRoutes },
            { new: true, upsert: true }
        );

        res.status(200).json({
            success: true,
            message: 'Perfil actualizado exitosamente',
            data: profile
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar perfil',
            error: error.message
        });
    }
};
