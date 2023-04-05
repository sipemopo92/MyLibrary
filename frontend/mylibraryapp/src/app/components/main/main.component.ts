import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {


  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isScreenSmall!: boolean
  user!: User;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService
  ) { }


  ngOnInit() {
    this.user = this.authService.getUser();
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe((state: BreakpointState) => {
      this.isScreenSmall = state.matches;
    });
    this.router.events.subscribe(() => {
      if (this.sidenav.mode === 'over') {
        this.sidenav.close();
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
