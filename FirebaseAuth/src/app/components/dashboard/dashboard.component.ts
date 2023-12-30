import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  texts = ['W', 'e', 'l', 'c', 'o', 'm', 'e', ': )'];
  particles = Array.from({ length: 12 }, (_, i) => i);
  constructor(public authService: AuthService, private ngZone: NgZone) {}
  ngOnInit(): void {
  }
}
