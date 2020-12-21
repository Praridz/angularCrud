import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BusinessService } from '../business.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-crud-edit',
  templateUrl: './crud-edit.component.html',
  styleUrls: ['./crud-edit.component.css']
})
export class CrudEditComponent implements OnInit {

  angForm: FormGroup;
  sub: Subscription;
  person_name: any;
  business_name: any;
  business_gst_number: any;
  idB: any;
  edited: boolean = false;

  constructor(private fb: FormBuilder, private bs: BusinessService, private router: Router, private route: ActivatedRoute) {
    this.createForm();
  }


  createForm() {
    this.angForm = this.fb.group({
      person_name: ['', Validators.required],
      business_name: ['', Validators.required],
      business_gst_number: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.idB = id;
      if (id) {
        this.bs.showBusiness(id).subscribe((business: any) => {
          if (business) {
            this.person_name = business.person_name;
            this.business_name = business.business_name;
            this.business_gst_number = business.business_gst_number

          } else {
            console.log(`Business with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }
  editBusiness() {

    this.bs.editBusiness(this.idB, this.person_name, this.business_name, this.business_gst_number).subscribe((business: any) => {
      if (business) {
        alert("Business updated, press 'aceptar'.")
        this.gotoList();
      } else {
        console.log("Fallo al editar");
        this.ngOnInit();
      }
    });

  }
  gotoList() {
    this.router.navigate(['/business']);
  }


  deleteBusiness() {
    this.bs.deleteBusiness(this.idB).subscribe((business: any) => {
      if (business) {
        alert("Business deleted, press 'aceptar'.")
        this.gotoList();
      } else {
        console.log("Fallo al editar");
        this.ngOnInit();
      }
    });

  }

}