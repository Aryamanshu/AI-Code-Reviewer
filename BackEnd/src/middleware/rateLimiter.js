// Simple in-memory rate limiter
class RateLimiter {
  constructor(windowMs = 60000, maxRequests = 10) {
    this.windowMs = windowMs; // Default: 1 minute
    this.maxRequests = maxRequests; // Default: 10 requests per window
    this.requestCounts = new Map();
  }

  // Middleware function
  middleware() {
    return (req, res, next) => {
      // Get client IP
      const ip = req.ip || req.connection.remoteAddress;
      const now = Date.now();
      
      // Initialize or clean up old requests
      if (!this.requestCounts.has(ip)) {
        this.requestCounts.set(ip, []);
      }
      
      // Filter out requests older than the window
      const requests = this.requestCounts.get(ip).filter(
        timestamp => now - timestamp < this.windowMs
      );
      
      // Check if rate limit is exceeded
      if (requests.length >= this.maxRequests) {
        return res.status(429).json({
          status: 'error',
          message: 'Too many requests, please try again later.'
        });
      }
      
      // Add current request timestamp
      requests.push(now);
      this.requestCounts.set(ip, requests);
      
      next();
    };
  }
}

// Create a rate limiter with 5 requests per minute
const rateLimiter = new RateLimiter(60000, 5);

module.exports = rateLimiter.middleware();
