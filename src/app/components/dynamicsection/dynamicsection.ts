import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dynamicsection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamicsection.html',
  styleUrls: ['./dynamicsection.css']
})
export class Dynamicsection implements OnInit {
  sectionData: any;
  sectionName: string | null = null;

  smallImages: Record<string, boolean> = {}; // cache image sizes

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.sectionName = params.get('section');
      this.dataService.getData().subscribe((data) => {
        if (this.sectionName && data.dynamic && data.dynamic[this.sectionName]) {
          this.sectionData = data.dynamic[this.sectionName];
          this.preloadImages();
        } else {
          this.sectionData = null;
        }
      });
    });
  }

  preloadImages() {
    if (!this.sectionData) return;
    this.sectionData.content.forEach((block: any) => {
      if (block.type === 'cards') {
        block.cards.forEach((card: any) => {
          if (card.image && !this.smallImages[card.image]) {
            const img = new Image();
            img.src = card.image;
            img.onload = () => {
              // consider small if width or height <= 400px
              this.smallImages[card.image] = img.width <= 400 || img.height <= 400;
            };
          }
        });
      }
    });
  }

  isSmallImage(url: string): boolean {
    return this.smallImages[url] || false;
  }
}

