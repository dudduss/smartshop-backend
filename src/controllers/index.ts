import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

// const getUsers = async (req: Request, res: Response): Promise<Response> => {
//   try {
//     const response: QueryResult = await pool.query('SELECT * FROM users');
//     return res.status(200).json(response.rows);
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json('Internal Server Error');
//   }
// };

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
    console.log(e);
    return res.status(500).json('Internal Server Error');
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    email,
    passwordHash,
    firstName,
    lastName,
    profilePictureUrl,
  } = req.body;

  const response: QueryResult = await pool.query(
    'INSERT INTO users (email, password_hash, first_name, last_name, profile_picture_url) VALUES($1, $2, $3, $4, $5)',
    [email, passwordHash, firstName, lastName, profilePictureUrl]
  );
  return res.json({ message: 'User created succesfully' });
};

export const createItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { foodName, nix_item_id, brandName, nix_brand_id } = req.body;

  const response: QueryResult = await pool.query(
    'INSERT INTO items (food_name, nix_item_id, brand_name, nix_brand_id) VALUES($1, $2, $3, $4)',
    [foodName, nix_item_id, brandName, nix_brand_id]
  );
  return res.json({ message: 'Item created succesfully' });
};
