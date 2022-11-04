/* eslint-disable no-unused-vars */
import { IParsedQuery } from '../interfaces/interfaces';

export default (query: string): IParsedQuery => {
  const [amount, from, _, to] = query.split(' ');
  return { from: from.toUpperCase(), to: to.toUpperCase(), amount };
};
