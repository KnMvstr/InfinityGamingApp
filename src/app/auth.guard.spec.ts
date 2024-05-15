import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthAccessService } from './auth-access.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authAccessService: AuthAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthAccessService, useValue: { isAuthorized: () => true } }
      ]
    });
    authGuard = TestBed.inject(AuthGuard);
    authAccessService = TestBed.inject(AuthAccessService);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should return true if authorized', () => {
    spyOn(authAccessService, 'isAuthorized').and.returnValue(true);
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    expect(authGuard.canActivate(route, state)).toBeTrue();
  });

  it('should return false if not authorized', () => {
    spyOn(authAccessService, 'isAuthorized').and.returnValue(false);
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    expect(authGuard.canActivate(route, state)).toBeFalse();
  });
});