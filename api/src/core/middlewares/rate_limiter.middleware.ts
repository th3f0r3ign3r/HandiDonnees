import { rateLimit } from 'express-rate-limit';

export const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 20,
    skipSuccessfulRequests: true,
    handler: (req, res) => {
        res.status(429).json({ error: 'Too Many Requests' });
    },
});

export const viewLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    skipSuccessfulRequests: true,
    handler: (req, res) => {
        // console.log("[VIEW_LIMITER] Too Many Requests####");
        res.status(429).json({ error: 'Too Many Requests' });
    },
});
