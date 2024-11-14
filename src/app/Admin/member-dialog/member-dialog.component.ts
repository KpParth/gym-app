import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Gym } from 'src/app/shared/models/gym.model';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-member-dialog',
  standalone: true,
  imports: [CommonModule,MatSelectModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatInputModule ],
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.css']
})
export class MemberDialogComponent implements OnInit {
  memberForm!: FormGroup;
  @Output() formSubmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder, public matDialogRef: MatDialogRef<MemberDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: { member: Gym | null}){
      this.memberForm = this.fb.group({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        membership: new FormControl ('',Validators.required),
        phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
       })
  }
  ngOnInit() {
    if(this.data.member){
      this.memberForm.patchValue(this.data.member);
    }
  }

  submitMember(){
    console.log("STEP1");
    if(this.memberForm.valid){
      console.log("STEP2")
      const member: Gym = { id: this.data.member ? this.data.member.id : 0, ...this.memberForm.value}
      console.log("STEP3",member);
      // this.matDialogRef.close(member);
      this.formSubmit.emit(member);
    }
  }
  closeDialog(){
    this.matDialogRef.close();
  }

}
