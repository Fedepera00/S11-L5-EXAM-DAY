import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../Services/favorite.service';
import { MovieService } from '../../Services/movie.service';
import { iMovie } from '../../Models/i-movie';
import { iUser } from '../../Models/i-user';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  favoriteMovies: iMovie[] = [];
  currentUser: iUser | undefined;

  constructor(
    private favoriteService: FavoriteService,
    private movieService: MovieService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.loadFavoriteMovies();
    } else {
      this.favoriteMovies = [];
    }
  }

  loadFavoriteMovies(): void {
    if (this.currentUser) {
      this.favoriteMovies = this.favoriteService.getFavoritesForUser(this.currentUser)
        .map(fav => fav.movie);
    }
  }

  removeFromFavorites(movie: iMovie): void {
    if (this.currentUser) {
      const preferito = this.favoriteService.getFavoritesForUser(this.currentUser).find(fav => fav.movie.id === movie.id);
      if (preferito) {
        this.favoriteService.removeFromFavorites(preferito);
        this.loadFavoriteMovies();
      }
    }
  }
}
