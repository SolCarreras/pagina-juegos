// database/seeders/Datos.js
const db = require('../models'); // ajustá si tu carpeta de models tiene otra ruta
const Game = db.Game;

(async () => {
    try {
        // ✅ 1. Elimina TODOS los registros actuales --para hacer modificaciones sin duplicar
        await Game.destroy({ where: {} });

        // ✅ 2. Inserta nuevamente los 9 juegos con las imágenes corregidas
        await Game.bulkCreate([
            {
                name: 'CyberQuest',
                price: 29.99,
                description: 'Aventura futurista llena de acción y acertijos.',
                image: '/images/g1.jpg'
            },
            {
                name: 'Dragon Legacy',
                price: 39.99,
                description: 'Lucha con dragones y conquista reinos mágicos.',
                image: '/images/g2.jpg'
            },
            {
                name: 'Pixel Warriors',
                price: 19.99,
                description: 'Combates retro en mundos pixelados.',
                image: '/images/g3.jpg'
            },
            {
                name: 'Sky Battle',
                price: 34.99,
                description: 'Pilotea aviones y domina el cielo.',
                image: '/images/g4.jpg'
            },
            {
                name: 'Mystic Forest',
                price: 24.99,
                description: 'Explora un bosque encantado lleno de secretos.',
                image: '/images/g5.jpg'
            },
            {
                name: 'Robo Invasion',
                price: 29.99,
                description: 'Defiende la Tierra de robots invasores.',
                image: '/images/g6.jpg'
            },
            {
                name: 'SpeedRacer Nitro',
                price: 19.99,
                description: 'Carreras de alta velocidad en circuitos extremos.',
                image: '/images/g7.jpg'
            },
            {
                name: 'Galactic Odyssey',
                price: 44.99,
                description: 'Explora planetas y conquista la galaxia.',
                image: '/images/g8.jpg' // ✅ corregido
            },
            {
                name: 'Zombie Escape',
                price: 24.99,
                description: 'Sobrevive al apocalipsis zombie en modo cooperativo.',
                image: '/images/g9.jpg' // ✅ corregido
            }
        ]);

        console.log('✅ Datos actualizados correctamente en la tabla Games');
        process.exit(); // Cierra el script
    } catch (error) {
        console.error('❌ Error al actualizar los datos:', error);
        process.exit(1);
    }
})();
