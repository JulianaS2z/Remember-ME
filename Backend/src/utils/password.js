import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  console.log('[PASSWORD] hashPassword', { passwordLen: password?.length, hashedPrefix: hashed?.slice(0, 6) })
  return hashed;
}

export async function comparePassword(password, hash) {
  if (!hash || typeof hash !== 'string') {
    return false;
  }

  console.log('[PASSWORD] comparePassword called', { passwordLen: password?.length, hashPrefix: typeof hash === 'string' ? hash.slice(0, 6) : null })

  // Support legacy records where the password may have been stored in plain text.
  if (!hash.startsWith('$2')) {
    console.log('[PASSWORD] legacy hash comparison')
    return password === hash;
  }

  try {
    const result = await bcrypt.compare(password, hash);
    console.log('[PASSWORD] bcrypt.compare result', { result })
    return result;
  } catch (error) {
    console.error('[PASSWORD] compare error', error)
    return false;
  }
}
