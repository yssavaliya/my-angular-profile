import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMenu } from '../admin-menu/admin-menu'; 


@Component({
  selector: 'app-adminhome',
  standalone: true,
  imports: [CommonModule, AdminMenu], 
  templateUrl: './adminhome.html',
  styleUrls: ['./adminhome.css']
})
export class Adminhome {
}
