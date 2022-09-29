import bcrypt from 'bcryptjs';

interface IHashPassword{ 
   hashPassword: (password: string) => void
}

export const hashPassword = (password: string) => bcrypt.hashSync(password, bcrypt.genSaltSync(12));