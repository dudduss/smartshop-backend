import axios from 'axios';
import { InstantSearchResponse } from './types';

const headers = {
  'x-app-id': '3ec716f6',
  'x-app-key': '486494c55f368a1560b396cfcb7d7f3e',
};

export async function instantSearch(
  searchString: string
): Promise<InstantSearchResponse> {
  const url =
    'https://trackapi.nutritionix.com/v2/search/instant?query=' + searchString;

  const response = await axios.get(url, { headers });

  return response.data;
}

// export function instantSearch(searchString: string): any {
//   try {
//     const url =
//       'https://trackapi.nutritionix.com/v2/search/instant?query=' +
//       searchString;

//     axios
//       .get(url, { headers })
//       .then((response) => {
//         console.log('responsedata: ', response.data);
//         return response.data;
//       })
//       .catch((error) => console.log(error));
//   } catch (e) {
//     return e;
//   }
// }
