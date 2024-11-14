import { Component, inject,ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GymService } from 'src/app/shared/services/gym.service';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Gym } from 'src/app/shared/models/gym.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatDialogModule, FormsModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent  {
   gymService = inject(GymService);
   customer$ = this.gymService.getGymUsers();
   timeSlots: string[] = ['9:00 AM - 10.00 AM', '10.00 AM - 11.00 AM', '11.00 AM- 12.00 AM'];
   profileForm!: FormGroup;
   bookingForm!: FormGroup;
   dataSourceProfile = new MatTableDataSource<Gym>();
   message: string = '';
   editFlag: boolean = false;
   gId!: number;
   @ViewChild('container',{read: ViewContainerRef, static: true}) container!: ViewContainerRef;
   private componentRef: any;

   constructor(private fb: FormBuilder, private dialog: MatDialog){
     this.profileForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      membership: new FormControl ('',Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
     })
   }
  searchGymId(gId: number ){
    this.editFlag = false;
    this.message = '';
    this.customer$.subscribe((data: Gym[]) => {
      console.log("DATA", data);
      const member  = data.find((item : any) => item.id == gId);
      console.log("membaer", member);
      if(member){
        this.editFlag = true;
        console.log("membaer2", member);
        this.profileForm.patchValue(member);
      }
      else{
        this.editFlag = false;
        this.message = "Sorry, No user Id exist"
      }
    });
  } 

  updateMemberDetails(){
    console.log("WELCOME");
    console.log("GIDDD",this.gId);
    if(this.profileForm.valid){
      const updatedMember: Gym = {
        id: this.gId,
        ...this.profileForm.value,

      }
      this.gymService.editMember(updatedMember);
    }
  }
}
