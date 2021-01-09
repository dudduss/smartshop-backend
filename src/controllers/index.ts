import { Request, response, Response } from 'express';
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

export const createItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { foodName, nix_item_id, brandName, nix_brand_id } = req.body;

    await pool.query(
      'INSERT INTO items (food_name, nix_item_id, brand_name, nix_brand_id) VALUES($1, $2, $3, $4)',
      [foodName, nix_item_id, brandName, nix_brand_id]
    );
    return res.json({ message: 'Item created succesfully' });
  } catch (e) {
    return res.status(500).json(e);
  }
};

export const updateItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id, numReviews, rating } = req.body;

    await pool.query(
      'UPDATE items SET num_reviews = $2, rating = $3 WHERE id = $1',
      [id, numReviews, rating]
    );
    return res.json({ message: 'Item updated succesfully' });
  } catch (e) {
    return res.status(500).json(e);
  }
};

export const getItemById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const itemId = req.query['id'];
    const response: QueryResult = await pool.query(
      'SELECT * FROM items WHERE id = $1',
      [itemId]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    return res.status(500).json(e);
  }
};

export const getItemByNixId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const nixId = req.query['nix_item_id'];
    const response: QueryResult = await pool.query(
      'SELECT * FROM items WHERE nix_item_id = $1',
      [nixId]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    return res.status(500).json(e);
  }
};

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
