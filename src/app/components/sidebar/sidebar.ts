import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, Sun, Moon } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.html',
})
export class Sidebar implements OnInit {
  @Input() data: any;
  @Input() toggleTheme!: () => void;
  @Input() isDarkMode!: boolean;

  SunIcon = Sun;
  MoonIcon = Moon;

  ngOnInit() { }

  // Compute initials from name (first letters of first two words)
  get initials(): string {
    if (!this.data?.name) return 'U';
    const words = this.data.name.split(' ');
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  }
}
