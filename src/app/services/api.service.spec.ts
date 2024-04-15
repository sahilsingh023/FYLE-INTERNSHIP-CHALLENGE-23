import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user data from GitHub API', () => {
    const mockUsername = 'testuser';
    const mockResponse = { login: 'testuser', id: 123 };

    service.getUser(mockUsername).subscribe((data: any) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      https://api.github.com/users/${mockUsername}
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch repositories from GitHub API with default page and page size', () => {
    const mockUsername = 'testuser';
    const mockResponse = [{ name: 'repo1' }, { name: 'repo2' }];

    service.getRepos(mockUsername).subscribe((data: any) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      https://api.github.com/users/${mockUsername}/repos?per_page=10&page=1
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch repositories from GitHub API with specified page and page size', () => {
    const mockUsername = 'testuser';
    const mockPage = 2;
    const mockPageSize = 20;
    const mockResponse = [{ name: 'repo3' }, { name: 'repo4' }];

    service
      .getRepos(mockUsername, mockPage, mockPageSize)
      .subscribe((data: any) => {
        expect(data).toEqual(mockResponse);
      });

    const req = httpMock.expectOne(
      https://api.github.com/users/${mockUsername}/repos?per_page=${mockPageSize}&page=${mockPage}
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
