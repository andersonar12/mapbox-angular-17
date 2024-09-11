import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'app-maps-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SideMenuComponent],
  templateUrl: './maps-layout.component.html',
  styleUrl: './maps-layout.component.css',
})
export class MapsLayoutComponent implements OnInit {
  ngOnInit(): void {}
}
