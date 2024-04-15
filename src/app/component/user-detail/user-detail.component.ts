import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  isLoadingRepos: boolean = false;
  allRepo: any;
  pagedRepoData: any[] = [];
  page = 1;
  count = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  loader: boolean = false;
  totalcount = 10;
  isPaginatorChangingPage: boolean = false;
  constructor(
    private router: Router,
    private apiService: ApiService,
    public shareDataService: ShareDataService,
    public activatedRoute: ActivatedRoute
  ) {}
  isApiLoading: boolean = true;

  ngOnInit(): void {
    let username = this.activatedRoute.snapshot.params['userName'];
    this.apiService.getUser(username).subscribe(
      (res: any) => {
        this.isApiLoading = false;
        this.shareDataService.sharedHomeResponse = res;
        this.allRepo = res.public_repos;
        console.log(this.allRepo);
      },
      (err) => {
        alert(
          err?.error?.message ? err?.error?.message : 'Something went wrong'
        );
        this.isApiLoading = false;
      }
    );
    this.isLoadingRepos = true;
    this.getRepos(username);
  }

  // getRepos(username: any, page: number = 1, pageSize: number = 10) {
  //   this.apiService.getRepos(username, page, pageSize).subscribe(
  //     (res: any) => {
  //       this.isLoadingRepos = false;
  //       this.displayRepoData = res
  //       if (this.pagedRepoData.length) {
  //         this.pagedRepoData.concat(res);
  //       } else {
  //         this.pagedRepoData = res;
  //       }
  //     },
  //     (err) => {
  //       alert(
  //         err?.error?.message ? err?.error?.message : 'Something went wrong'
  //       );
  //       this.isLoadingRepos = false;
  //       this.loader = false;
  //     }
  //   );
  // }
  // onPageChange(event: any): void {
  //   this.pageSize = event.pageSize;
  //   let username = this.activatedRoute.snapshot.params['userName'];
  //   this.isPaginatorChangingPage = true;
  //   this.page = event.pageIndex + 1;
  //   // Check if data for the current page is already available
  //   if (this.page * this.pageSize <= this.pagedRepoData.length) {
  //     // Data for the current page is already available, no need to fetch from API
  //     const startIndex = (this.page - 1) * this.pageSize;
  //     const endIndex = startIndex + this.pageSize;
  //     this.displayRepoData = this.pagedRepoData.slice(startIndex, endIndex);
  //     this.isPaginatorChangingPage = false;
  //   } else {
  //     // Data for the current page is not available, fetch from API
  //     this.isLoadingRepos = true;
  //     this.getRepos(username, this.page, this.pageSize);
  //   }
  // }

  // Define a JSON object to store fetched data
  pageData: any = {};
  displayRepoData: any = [];

  getRepos(username: any, page: number = 1, pageSize: number = 10) {
    if (this.pageData[page]) {
      this.displayRepoData = this.pageData[page];
      this.isPaginatorChangingPage = false;
      return;
    }

    this.apiService.getRepos(username, page, pageSize).subscribe(
      (res: any) => {
        this.isLoadingRepos = false;
        this.displayRepoData = res;
        this.pageData[page] = res;
      },
      (err) => {
        alert(
          err?.error?.message ? err?.error?.message : 'Something went wrong'
        );
        this.isLoadingRepos = false;
        this.loader = false;
      }
    );
  }
  prevPageSize: number = 10;

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    let username = this.activatedRoute.snapshot.params['userName'];
    this.isPaginatorChangingPage = true;
    this.page = event.pageIndex + 1;

    if (this.pageData[this.page] && this.pageSize == this.prevPageSize) {
      this.displayRepoData = this.pageData[this.page];
      this.isPaginatorChangingPage = false;
    } else if (this.pageSize !== this.prevPageSize) {
      this.pageData = {};
      this.isLoadingRepos = true;
      this.isPaginatorChangingPage = false;
      this.getRepos(username, this.page, this.pageSize);
      this.prevPageSize = this.pageSize;
    } else {
      this.isLoadingRepos = true;
      this.isPaginatorChangingPage = false;
      this.getRepos(username, this.page, this.pageSize);
    }
  }

}
