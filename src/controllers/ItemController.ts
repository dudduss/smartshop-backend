import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';
import {
  instantSearch,
  searchItemByUpc,
  searchItemDetail,
} from '../external/nutritionix/utils';
import { NutritonixFoodItem } from '../external/nutritionix/types';
import { Item } from '../types';

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

export const getAndCreateItemsBySearch = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const searchString = req.query['searchString'] as string;
    // Hit Nutrionix API here
    const response = await instantSearch(searchString);
    const nutritionixItems = response.branded;

    // For each item in nutrionix API, get from database. If it doesn't exist, create it and return it
    const items = await Promise.all(
      nutritionixItems.map(async (nutritionixItem) =>
        getOrCreateItem(nutritionixItem)
      )
    );

    return res.status(200).json(items);
  } catch (e) {
    return res.status(500).json(e);
  }
};

export const getAndCreateItemBySearchUpc = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const upc = req.query['upc'] as string;
    // Hit Nutrionix API here
    const response = await searchItemByUpc(upc);
    const nutritionixItem = response.foods[0] as NutritonixFoodItem;

    // For the item, get from database. If it doesn't exist, create it and return it
    const item = await getOrCreateItem(nutritionixItem);

    return res.status(200).json(item);
  } catch (e) {
    return res.status(500).json(e);
  }
};

async function getOrCreateItem(
  nutritionixItem: NutritonixFoodItem
): Promise<Item> {
  const existingItems: QueryResult = await pool.query(
    'SELECT * FROM items WHERE nix_item_id = $1',
    [nutritionixItem.nix_item_id]
  );
  if (existingItems.rows.length > 0) {
    return existingItems.rows[0];
  }

  await pool.query(
    'INSERT INTO items (food_name, nix_item_id, brand_name, nix_brand_id, image_url) VALUES($1, $2, $3, $4, $5)',
    [
      nutritionixItem.food_name,
      nutritionixItem.nix_item_id,
      nutritionixItem.brand_name,
      nutritionixItem.nix_brand_id,
      nutritionixItem.photo.thumb,
    ]
  );

  const createdItems: QueryResult = await pool.query(
    'SELECT * FROM items WHERE nix_item_id = $1',
    [nutritionixItem.nix_item_id]
  );

  const createdItem = createdItems.rows[0] as Item;

  return createdItem;
}

export const getItemDetailByNixId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const nixItemId = req.query['nix_item_id'] as string;
    const response = await searchItemDetail(nixItemId);
    const nutrionixItemDetail = response.foods[0];

    return res.status(200).json(nutrionixItemDetail);
  } catch (e) {
    return res.status(500).json(e);
  }
};
