import { Component, OnInit } from '@angular/core';
import { BusinessService } from "../business.service";

@Component({
  selector: 'app-crud-get',
  templateUrl: './crud-get.component.html',
  styleUrls: ['./crud-get.component.css']
})
export class CrudGetComponent implements OnInit {
  public business: any;

  constructor(private bs: BusinessService) { }

  ngOnInit() {
    this.bs.getBusiness().subscribe(result => {
      this.business = result;
      //console.log(result);
    })
  }

}