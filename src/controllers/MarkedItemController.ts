import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

export const createMarkedItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId, itemId } = req.body;

    await pool.query(
      'INSERT INTO markedItems (user_id, item_id) VALUES($1, $2)',
      [userId, itemId]
    );
    return res.json({ message: 'MarkedItem created succesfully' });
  } catch (e) {
    return res.status(500).json(e);
  }
};

export const getMarkedItemsByUserId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.query['userId'];
    const response: QueryResult = await pool.query(
      'SELECT * FROM markedItems WHERE user_id = $1',
      [userId]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    return res.status(500).json(e);
  }
};

export const deleteMarkedItemById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const markedItemId = req.query['id'];
    await pool.query('DELETE FROM markedItems WHERE id = $1', [markedItemId]);
    return res.status(200).json('Succesfully deleted MarkedItem');
  } catch (e) {
    return res.status(500).json(e);
  }
};
