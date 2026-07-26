import jwt from 'jsonwebtoken';

export const validateJWT = (req, res, next) => {
    const token = req.header('token') || req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'No autenticado. No hay token en la petición' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.uid || decoded.sub || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Token no válido - Falta identificador del usuario' });
        }

        const userRole = decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 'USER_ROLE';

        req.user = {
            id: userId,
            role: userRole
        };

        next();
    } catch (error) {
        console.error("Error validando JWT en server-user:", error.message);
        return res.status(401).json({ success: false, message: 'Sesión inválida o expirada' });
    }
};

export const validateInternalSecret = (req, res, next) => {
    const secret = req.header('x-internal-secret');
    if (!secret || secret !== process.env.INTERNAL_SECRET) {
        return res.status(403).json({ success: false, message: 'Acceso denegado: Secreto interno inválido.' });
    }
    next();
};
