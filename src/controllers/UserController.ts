import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.query['id'];
    const response: QueryResult = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    return res.status(500).json(e);
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      email,
      passwordHash,
      firstName,
      lastName,
      profilePictureUrl,
    } = req.body;

    await pool.query(
      'INSERT INTO users (email, password_hash, first_name, last_name, profile_picture_url) VALUES($1, $2, $3, $4, $5)',
      [email, passwordHash, firstName, lastName, profilePictureUrl]
    );
    return res.json({ message: 'User created succesfully' });
  } catch (e) {
    return res.status(500).json(e);
  }
};
