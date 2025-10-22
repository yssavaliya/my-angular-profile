import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';
import { Sidebar } from './components/sidebar/sidebar';
import { LucideAngularModule, Menu, X } from 'lucide-angular';

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
