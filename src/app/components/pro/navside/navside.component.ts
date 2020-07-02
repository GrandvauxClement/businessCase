import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../service/token-storage.service";

@Component({
  selector: 'app-navside',
  templateUrl: './navside.component.html',
  styleUrls: ['./navside.component.css']
})
export class NavsideComponent implements OnInit {

  constructor(private tokenService: TokenStorageService) { }

  ngOnInit(): void {
  }
  logOut() {
    this.tokenService.logOut();
    window.location.reload();
  }

}
