const Redis = require('ioredis');

const client = new Redis(
  process.env.REDIS_HOST, // адреса Redis-сервера
  process.env.REDIS_PORT // порт Redis-сервера
);

// Middleware для зберігання статистики
function trackRequests(req, res, next) {
  const entity = req.originalUrl.split('/')[1]; // Отримання назви сутності з URL запиту
  client.incr(entity, (err, count) => { // Збільшення лічильника для даної сутності
    if (err) throw err;
    console.log(`Total requests for ${entity}: ${count}`);
  });
  next();
}

module.exports = trackRequests