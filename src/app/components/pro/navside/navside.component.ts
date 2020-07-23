import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../service/token-storage.service";

@Component({
  selector: 'app-navside',
  templateUrl: './navside.component.html',
  styleUrls: ['./navside.component.css']
})
export class NavsideComponent implements OnInit {
proffesionel;
  constructor(private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.proffesionel = this.tokenService.getUser();
  }
  logOut() {
    this.tokenService.logOut();
    window.location.reload();
  }

}
