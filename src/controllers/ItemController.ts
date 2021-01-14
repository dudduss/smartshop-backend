import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

export const createItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      foodName,
      nix_item_id,
      brandName,
      nix_brand_id,
      imageUrl,
    } = req.body;

    await pool.query(
      'INSERT INTO items (food_name, nix_item_id, brand_name, nix_brand_id, image_url) VALUES($1, $2, $3, $4, $5)',
      [foodName, nix_item_id, brandName, nix_brand_id, imageUrl]
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
