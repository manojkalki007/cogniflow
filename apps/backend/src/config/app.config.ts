export default () => ({
  app: {
    port: parseInt(process.env.PORT ?? '4000', 10),
    frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? 'access-secret',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? 'refresh-secret',
    jwtAccessExpiry: process.env.JWT_ACCESS_EXPIRY ?? '15m',
    jwtRefreshExpiry: process.env.JWT_REFRESH_EXPIRY ?? '30d',
    redisUrl: process.env.REDIS_URL,
  },
});
