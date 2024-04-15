import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  username: any = '';

  isApiLoading: boolean = false

  constructor(private router: Router,private apiService: ApiService,private shareDataService: ShareDataService) {}

  search(): void {
    this.router.navigate(['/user', this.username]);
  }
}
