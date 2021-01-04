import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query('SELECT * FROM users');
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server Error');
  }
};

const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = parseInt(req.params.id);
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

// need to add some sort of validation on the bodies here
const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { name, email } = req.body;
  const response: QueryResult = await pool.query(
    'INSERT INTO users (name, email) VALUES($1, $2)',
    [name, email]
  );
  return res.json({ message: 'User created succesfully' });
};

export { getUsers, getUserById, createUser };
