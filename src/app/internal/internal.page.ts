import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertModalConfig} from '../components/alert-modal/alert-modal.interface';
import {takeUntil} from 'rxjs/operators';
import {StoreAction} from '../../state/store-action.interface';
import * as UserActions from '../../providers/user/user.actions';
import {Subject} from 'rxjs';
import {Actions} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '../../state/app.state';
import {CustomErrorResponse} from '../../providers/api/api.interface';

@Component({
  selector: 'app-internal',
  templateUrl: './internal.page.html',
  styleUrls: ['./internal.page.scss'],
})
export class InternalPage implements OnInit, OnDestroy {

  public showLoading: boolean;
  public alertConfig: AlertModalConfig;
  private unsubscribe = new Subject();

  constructor(private router: Router, private actions$: Actions, private store: Store<AppState>) { }

  public ngOnInit(): void {

    this.actions$.pipe(takeUntil(this.unsubscribe)).subscribe((action: StoreAction) => {

      switch (action.type) {

        case UserActions.LOGOUT_SUCCESS:
          this.logoutSuccess();
          break;

        case UserActions.LOGOUT_FAILURE:
          this.logoutFailure(action.payload);
          break;

        default:
          break;

      }

    });

  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public confirmLogout(): void {
    this.alertConfig = {
      header: 'Confirm',
      message: 'Are you sure you want to sign out?',
      confirm: 'OK',
      cancel: 'Cancel'
    };
  }

  public logoutAlertCallback(logout: boolean): void {
    if (logout) {
      this.showLoading = true;
      this.store.dispatch(new UserActions.LogoutRequest());
    }
    this.alertConfig = null;
  }

  private logoutSuccess(): void {
    this.router.navigate(['/external/login'], {replaceUrl: true});
    this.showLoading = false;
  }

  private logoutFailure(response: CustomErrorResponse): void {
    this.showLoading = false;
    this.alertConfig = {
      header: response.error.header,
      message: response.error.message,
      confirm: 'OK'
    };
  }

}
