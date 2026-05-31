import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password, hash) {
  if (!hash || typeof hash !== 'string') {
    return false;
  }

  // Support legacy records where the password may have been stored in plain text.
  if (!hash.startsWith('$2')) {
    return password === hash;
  }

  try {
    return bcrypt.compare(password, hash);
  } catch (error) {
    return false;
  }
}
