import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CardsComponent } from '../cards/cards.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailComponent, CardsComponent],
      imports: [MatPaginatorModule, NoopAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { userName: 'testUsername' },
            },
          },
        },
        {
          provide: ApiService,
          useValue: {
            getUser: () => of({ public_repos: 5 }), // Mocking the getUser method
            getRepos: () => of([{ name: 'repo1' }, { name: 'repo2' }]), // Mocking the getRepos method
          },
        },
        ShareDataService, // You may need to provide other dependencies as well
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService); // Inject ApiService
    fixture.detectChanges();
  });

  it('should call getUser method from ApiService on ngOnInit', () => {
    spyOn(apiService, 'getUser').and.callThrough(); // Spy on the getUser method
    component.ngOnInit();
    expect(apiService.getUser).toHaveBeenCalledWith('testUsername');
  });
  it('should fetch repos from ApiService and display them on page change', () => {
    component.pagedRepoData = [{ name: 'repo1' }, { name: 'repo2' }];
    spyOn(apiService, 'getRepos').and.callThrough(); // Spy on the getRepos method
    component.onPageChange({ pageIndex: 1 }); // Simulate page change event
    expect(apiService.getRepos).toHaveBeenCalledWith(
      'testUsername',
      2,
      component.pageSize
    );
    expect(component.displayRepoData).toEqual([
      { name: 'repo1' },
      { name: 'repo2' },
    ]); // Check if data is correctly displayed
  });
});
