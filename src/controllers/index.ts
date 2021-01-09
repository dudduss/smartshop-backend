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

  await pool.query(
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

  await pool.query(
    'INSERT INTO items (food_name, nix_item_id, brand_name, nix_brand_id) VALUES($1, $2, $3, $4)',
    [foodName, nix_item_id, brandName, nix_brand_id]
  );
  return res.json({ message: 'Item created succesfully' });
};

export const updateItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, numReviews, rating } = req.body;

  await pool.query(
    'UPDATE items SET num_reviews = $2, rating = $3 WHERE id = $1',
    [id, numReviews, rating]
  );
  return res.json({ message: 'Item updated succesfully' });
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
    console.log(e);
    return res.status(500).json('Internal Server Error');
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
    console.log(e);
    return res.status(500).json('Internal Server Error');
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
    // console.log(e);
    console.log('here');
    console.log('error: ', e);
    return res.status(500).json(e.detail);
  }
};

export const getMarkedItemsByUserId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userid = req.query['userId'];
    const response: QueryResult = await pool.query(
      'SELECT * FROM markedItems WHERE user_id = $1',
      [userid]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server Error');
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
    console.log(e);
    return res.status(500).json('Internal Server Error');
  }
};
