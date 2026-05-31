import bcrypt from 'bcryptjs'

const senha = await bcrypt.hash('123456', 10)

console.log(senha)