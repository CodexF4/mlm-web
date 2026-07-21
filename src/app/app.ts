import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';

import { UserService } from './users/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  protected readonly title = signal('mlm');
  protected readonly currentUser = this.userService.currentUser;

  isDark = false;

  protected logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');

    this.isDark = media.matches;

    media.addEventListener('change', (event) => {
      this.isDark = event.matches;
    });
  }
}
