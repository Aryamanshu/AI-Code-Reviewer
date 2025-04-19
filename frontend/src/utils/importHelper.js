/**
 * Helper function to handle both ESM and CommonJS imports
 * This is useful for packages that might be imported differently in different environments
 * @param {Object} module - The imported module
 * @returns {any} - The default export or the module itself
 */
export function getDefaultExport(module) {
  return module.default || module;
}
