import axios from 'axios';
import { InstantSearchResponse, SearchItemResponse } from './types';

const headers = {
  'x-app-id': '3ec716f6',
  'x-app-key': '486494c55f368a1560b396cfcb7d7f3e',
};

export async function instantSearch(
  searchString: string
): Promise<InstantSearchResponse> {
  try {
    const url =
      'https://trackapi.nutritionix.com/v2/search/instant?query=' +
      searchString;

    const response = await axios.get(url, { headers });

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function searchItemDetail(
  nixItemId: string
): Promise<SearchItemResponse> {
  try {
    const url =
      'https://trackapi.nutritionix.com/v2/search/item?nix_item_id=' +
      nixItemId;

    const response = await axios.get(url, { headers });

    return response.data;
  } catch (e) {
    return e;
  }
}
