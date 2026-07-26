import Wallet from '../src/wallets/wallet.model.js';

export const userHasActiveWallet = async (userId) => {
    if (!userId) return;
    
    const wallet = await Wallet.findOne({ userId, isActive: true });
    if (!wallet) {
        throw new Error(`No se encontró una billetera activa para el usuario con ID: ${userId}`);
    }
    return true;
};
