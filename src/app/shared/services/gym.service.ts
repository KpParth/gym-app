import { Injectable } from '@angular/core';
import { Gym, User } from '../models/gym.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GymService {

  private gymUsers: Gym[] =[
    {id: 1, name: 'Parth Kothari', email: 'parth@gmail.com', phone: '7740999134', membership: 'Gold'},
    {id: 2, name: 'Prakhar', email: 'prakhar@gmail.com', phone: '9999999999', membership: 'silver'},
    {id: 3, name: 'Jayesh', email: 'Jayesh@gmail.com', phone: '7777777777', membership: 'Premium'},
    {id: 4, name: 'Rahul', email: 'Rahul@gmail.com', phone: '6666666666', membership: 'silver'},
  ]

  private users: User[] =[
    {id: 1, name: 'Sid', role: 'Admin', email: 'sid@gmail.com'},
    {id: 1, name: 'Jenny', role: 'Customer', email: 'jenny@gmail.com'},
  ]

  private gymSubject = new BehaviorSubject<Gym[]>(this.gymUsers);
  private userSubject = new BehaviorSubject<User[]>(this.users);

  constructor() { }

  getGymUsers(){
    return this.gymSubject.asObservable();
  }

  getUsers(){
    return this.userSubject.asObservable();
  }

  addMember(member: Gym){
    console.log("member",member);
     const currentMembers = this.gymUsers;
     console.log("currentMembers",currentMembers);
     member.id = currentMembers.length + 1;
     console.log("member2",member);
     this.gymSubject.next([...currentMembers, member]);
 }

 editMember(updatedMember: Gym){
  console.log("updated Memeber", updatedMember);
  console.log("updated Memeber.id", updatedMember.id);
  this.gymUsers =  this.gymUsers.map((item : any) => (item.id === updatedMember.id ? updatedMember: item));
   console.log("members", this.gymUsers);
   this.gymSubject.next(this.gymUsers);
 }

 deleteMember(gId: number){
   const latestMember = this.gymUsers.filter((it: any) => it.id !== gId);
   this.gymSubject.next(latestMember);
 }
}
