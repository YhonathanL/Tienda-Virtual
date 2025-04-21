const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const JWT_SECRET = 'miclavefea';

exports.registerUser = async (req, res) => {
    try {
        const { nombre, email, contraseña, rol  } = req.body;

        // Verificar si el usuario ya está registrado
        const existingUser = await Usuario.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya está registrado' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Insertar el nuevo usuario en la base de datos
        await Usuario.create({ nombre, email, contraseña: hashedPassword , rol});
        console.log("Usuario registrado correctamente");

        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Función para iniciar sesión de usuarios
exports.loginUser = async (req, res) => {
    try {
        const { email, contraseña,rol } = req.body;

        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generar token de autenticación
        console.log('imprimo los valores obtenidos', usuario.email, JWT_SECRET);
        const accessToken = jwt.sign({ id: usuario.id, email: usuario.email,rol:usuario.rol }, JWT_SECRET);
        const issuedAt = new Date(Date.now()); // Obtener la fecha y hora actual
        console.log(accessToken)

        console.log('Usuario autenticado:', email,usuario.rol);

        // Enviar el token de autenticación como respuesta
        res.json({ accessToken, issuedAt});
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Función para obtener el perfil de usuario
exports.getUserProfile = async (req, res) => {
    try {
        // Obtener el ID de usuario del token de autenticación
        const user = req.usuario;

        if (!user) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findByPk(user.id, { attributes: ['nombre', 'email','rol'] });
        console.log('Perfil Obtenido:',usuario,user.id,usuario.rol);

        // Enviar el perfil del usuario como respuesta
        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener perfil de usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
