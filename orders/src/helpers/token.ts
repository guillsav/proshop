import jwt from 'jsonwebtoken';

export class Token {
  /**
   * @param id
   * @param email
   * @param isAdmin
   * @param key
   * @returns string
   */
  static generateToken(
    id: string,
    email: string,
    isAdmin: boolean,
    key: string
  ): string {
    return jwt.sign({ id, email, isAdmin }, key);
  }

  /**
   * @param token
   * @param key
   * @returns string | object
   */
  static validateToken(token: string, key: string): string | object {
    return jwt.verify(token, key);
  }
}
