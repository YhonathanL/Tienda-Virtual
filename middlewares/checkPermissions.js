
const checkAdminPermissions = (req, res, next) => {
    const { rol } = req.usuario; // Obtener el rol del usuario desde el token de autenticación
    if (rol !== 'administrador') {
        return res.status(403).json({ error: 'Acceso denegado' });
    }
    next(); // Pasar al siguiente middleware si el usuario tiene los permisos necesarios
};

module.exports = checkAdminPermissions;
