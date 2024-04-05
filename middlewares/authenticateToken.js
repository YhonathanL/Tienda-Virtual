const jwt = require('jsonwebtoken');
const JWT_SECRET = 'miclavefea';

function authenticateToken(req, res, next) {
  // Obtener el token de autorización del encabezado de la solicitud
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  // Si no hay token, enviar error de no autorizado
  if (!token) return res.status(401).json({ error: 'Token de autorización no proporcionado' });

  // Verificar y decodificar el token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token de autorización inválido' });
    // Establecer el usuario autenticado en el objeto de solicitud
    req.usuario = decoded;
    next();
  });
};

module.exports = authenticateToken;
