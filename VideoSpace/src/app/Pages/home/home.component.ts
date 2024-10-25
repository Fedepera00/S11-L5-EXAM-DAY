import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../Services/movie.service';
import { FavoriteService } from '../../Services/favorite.service';
import { iMovie } from '../../Models/i-movie';
import { iUser } from '../../Models/i-user';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: iMovie[] = [];
  currentUser: iUser = { id: -1, nome: '', email: '', password: '' };
  isLoggedIn: boolean = false;

  constructor(
    private movieService: MovieService,
    private favoriteService: FavoriteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data;
      this.updateFavoritesState();
    });

    this.currentUser = this.getCurrentUser();
  }

  updateFavoritesState(): void {
    const favorites = this.favoriteService.getFavoritesForUser(
      this.currentUser
    );

    this.movies.forEach((movie) => {
      movie.isFavorite = favorites.some((fav) => fav.movie.id === movie.id);
    });
  }

  addToFavorites(movie: iMovie): void {
    this.favoriteService.addToFavorites(movie, this.currentUser);
    movie.isFavorite = true;
  }

  removeFromFavorites(movie: iMovie): void {
    const preferito = this.favoriteService
      .getFavoritesForUser(this.currentUser)
      .find((fav) => fav.movie.id === movie.id);
    if (preferito) {
      this.favoriteService.removeFromFavorites(preferito);
    }
    movie.isFavorite = false;
  }

  getCurrentUser(): iUser {
    const user = this.authService.getCurrentUser();
    return user ? user : this.currentUser;
  }
}
