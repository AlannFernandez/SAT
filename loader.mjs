import { pathToFileURL } from 'url'
import { resolve as resolvePath } from 'path'

export async function resolve(specifier, context, defaultResolve) {
  // Handle Windows absolute paths
  if (process.platform === 'win32' && /^[a-zA-Z]:/.test(specifier)) {
    const fileUrl = pathToFileURL(resolvePath(specifier)).href
    return { url: fileUrl, shortCircuit: true }
  }
  
  // Default behavior for other cases
  return defaultResolve(specifier, context)
}
