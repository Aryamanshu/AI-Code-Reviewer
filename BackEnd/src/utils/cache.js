// Simple in-memory cache implementation
class Cache {
  constructor(ttl = 3600000) { // Default TTL: 1 hour in milliseconds
    this.cache = new Map();
    this.ttl = ttl;
  }

  // Get item from cache
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    // Check if item has expired
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  // Set item in cache
  set(key, value) {
    const expiry = Date.now() + this.ttl;
    this.cache.set(key, { value, expiry });
    return true;
  }

  // Delete item from cache
  delete(key) {
    return this.cache.delete(key);
  }

  // Clear entire cache
  clear() {
    this.cache.clear();
  }
}

module.exports = new Cache();
