import redis from 'redis';

const client = redis.createClient({ url: process.env.REDIS_URL || "redis://localhost:6379" });

client.connect()
    .then(() => console.log("Redis connected"))
    .catch(console.error);

export default client;
