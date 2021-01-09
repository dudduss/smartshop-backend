import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

export const createReview = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId, itemId, content, rating } = req.body;

    await pool.query(
      'INSERT INTO reviews (user_id, item_id, content, rating) VALUES($1, $2, $3, $4)',
      [userId, itemId, content, rating]
    );
    return res.json({ message: 'Review created succesfully' });
  } catch (e) {
    return res.status(500).json(e);
  }
};

export const updateReview = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id, content, rating } = req.body;

    await pool.query(
      'UPDATE reviews SET content = $2, rating = $3 WHERE id = $1',
      [id, content, rating]
    );
    return res.json({ message: 'Review updated succesfully' });
  } catch (e) {
    return res.status(500).json(e);
  }
};

export const getReviewsByUserId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.query['userId'];
    const response: QueryResult = await pool.query(
      'SELECT * FROM reviews WHERE user_id = $1',
      [userId]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    return res.status(500).json(e);
  }
};

export const getReviewsByItemId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const itemId = req.query['itemId'];
    const response: QueryResult = await pool.query(
      'SELECT * FROM reviews WHERE item_id = $1',
      [itemId]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    return res.status(500).json(e);
  }
};

export const deleteReview = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const reviewId = req.query['id'];
    await pool.query('DELETE FROM reviews WHERE id = $1', [reviewId]);
    return res.status(200).json('Succesfully deleted Review');
  } catch (e) {
    return res.status(500).json(e);
  }
};
