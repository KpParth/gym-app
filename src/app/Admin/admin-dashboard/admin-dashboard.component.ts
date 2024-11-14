import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { GymService } from 'src/app/shared/services/gym.service';
import { Gym } from 'src/app/shared/models/gym.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MemberDialogComponent } from '../member-dialog/member-dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
   gymUser$: Observable<Gym[]> = this.gymService.getGymUsers();
   dataSource = new MatTableDataSource<Gym>();
   tableData: Gym[] = [];
   

   displayedColumns = [
    'name',
    'email',
    'membership',
    'phone',
    'actions',
  ];

   constructor(private gymService: GymService, private dialog: MatDialog){
    this.gymUser$.subscribe((data: Gym[]) => {
      this.dataSource.data  = data;
    });
   }
  
  ngOnInit(){
    console.log("OBSERVALE",this.gymUser$);
    console.log("this.dataSource.data",this.dataSource.data);
   }

   addMemberModal(){
      const dialogRef : MatDialogRef<MemberDialogComponent> = 
       this.dialog.open(MemberDialogComponent, {
        width: '600px',
        height: '400px',
        disableClose: true,
        data: {member: null}
      });

      dialogRef.componentInstance.formSubmit.subscribe((result: any) => {
        if(result){
          console.log("Result",result);
          this.gymService.addMember(result);
        }
      })
   }

   editMember(member:Gym){
    const dialogRef : MatDialogRef<MemberDialogComponent> = 
     this.dialog.open(MemberDialogComponent, {
        width: '600px',
        height: '400px',
        disableClose: true,
      data: {member},
    });

    dialogRef.componentInstance.formSubmit.subscribe((result: any) => {
      if(result){
        console.log("Result",result);
        this.gymService.editMember(result);
      }
    })
 }

   deleteMember(memberId: number): void{
       this.gymService.deleteMember(memberId);
   }
}
