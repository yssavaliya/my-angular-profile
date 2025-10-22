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

  @Input() isDarkMode!: boolean; // <- now receives from parent

  SunIcon = Sun;
  MoonIcon = Moon;

  ngOnInit() { }
}
