import jwt from 'jsonwebtoken';

export class Token {
  /**
   * @param id
   * @param email
   * @param key
   * @returns string
   */
  static generateToken(id: string, email: string, key: string): string {
    return jwt.sign({ id, email }, key);
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
