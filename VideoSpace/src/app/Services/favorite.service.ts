import { Injectable } from '@angular/core';
import { iMovie } from '../Models/i-movie';
import { iUser } from '../Models/i-user';
import { iFavorite } from '../Models/i-favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoritesKey = 'favorites';
  private favorites: iFavorite[] = [];

  constructor() {

    this.loadFavorites();
  }

  addToFavorites(movie: iMovie, user: iUser): void {
    const preferito: iFavorite = {
      id: this.generateUniqueId(),
      user: user,
      movie: movie
    };
    if (!this.isFavorite(preferito)) {
      this.favorites.push(preferito);
      this.saveFavorites();
    }
  }

  removeFromFavorites(preferito: iFavorite): void {
    const index = this.favorites.findIndex(fav => fav.id === preferito.id);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.saveFavorites();
    }
  }

  isFavorite(preferito: iFavorite): boolean {
    return this.favorites.some(fav => fav.id === preferito.id);
  }

  getFavoritesForUser(user: iUser): iFavorite[] {
    return this.favorites.filter(fav => fav.user.id === user.id);
  }

  private saveFavorites(): void {
    localStorage.setItem(this.favoritesKey, JSON.stringify(this.favorites));
    console.log('Favorites saved:', this.favorites);
  }

  private loadFavorites(): void {
    const favoritesJson = localStorage.getItem(this.favoritesKey);
    if (favoritesJson) {
      this.favorites = JSON.parse(favoritesJson);
    }
  }

  private generateUniqueId(): number {
    return Math.floor(Math.random() * 1000000);
  }
}
