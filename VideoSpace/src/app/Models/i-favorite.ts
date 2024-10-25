import { iUser } from './i-user';
import { iMovie } from './i-movie';

export interface iFavorite {
  id: number;
  user: iUser;
  movie: iMovie;

}
