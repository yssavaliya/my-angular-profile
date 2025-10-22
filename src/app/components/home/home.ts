import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { LucideAngularModule, Github, Linkedin, Mail } from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  data: any;
  typedText = '';
  private charIndex = 0;

  // Lucide icons
  GitHubIcon = Github;
  LinkedInIcon = Linkedin;
  EmailIcon = Mail;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe((res) => {
      this.data = res;
      if (this.data?.about) {
        this.typeText(this.data.about);
      }
    });
  }

  typeText(text: string) {
    const typingSpeed = 100;
    const pauseTime = 2000;

    const type = () => {
      if (this.charIndex < text.length) {
        this.typedText += text.charAt(this.charIndex);
        this.charIndex++;
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(() => {
          this.typedText = '';
          this.charIndex = 0;
          type();
        }, pauseTime);
      }
    };

    type();
  }
}
