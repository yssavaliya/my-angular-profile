import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';
import { Sidebar } from './components/sidebar/sidebar';
import { LucideAngularModule, Menu, X, Sun, Moon } from 'lucide-angular';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Sidebar, LucideAngularModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  data: any;
  isSidebarOpen = false;
  readonly MenuIcon = Menu;
  readonly CloseIcon = X;
  stars: { top: string, left: string }[] = [];
  readonly Sun = Sun;
  readonly Moon = Moon;

  // track dark mode for icons
  isDarkMode = document.documentElement.classList.contains('dark');

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe((res) => (this.data = res));

    // Apply saved theme or OS preference
    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;

    if (savedTheme === 'dark') {
      html.classList.add('dark');
      this.isDarkMode = true;
    } else if (savedTheme === 'light') {
      html.classList.remove('dark');
      this.isDarkMode = false;
    } else {
      // OS preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.classList.add('dark');
        this.isDarkMode = true;
      } else {
        html.classList.remove('dark');
        this.isDarkMode = false;
      }
    }
    this.generateStars(60);
  }


  generateStars(maxCount: number) {
    // Generate a random number of stars between 10 and maxCount (inclusive)
    const count = Math.floor(Math.random() * (maxCount - 10 + 1)) + 10;

    this.stars = Array.from({ length: count }, () => ({
      top: Math.random() * 100 + 'vh',
      left: Math.random() * 100 + 'vw',
    }));
  }

  toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    this.isDarkMode = html.classList.contains('dark');  // update flag
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
