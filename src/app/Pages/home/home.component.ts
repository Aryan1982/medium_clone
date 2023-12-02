import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  allArticles: any;
  allUsers: any;
  constructor(private ApiServices:ApiService,
    private router:Router,
    ){}
  ngOnInit (){
    const loginUser = JSON.parse(localStorage.getItem('user') || '{}');
    if(loginUser.userId){
      this.getArticles(loginUser)
      this.getUsers()
    }else{
      this.router.navigate(['/login']);
    }

  }

  getArticles(loginUser:any){
    const data = {
      loginUser:loginUser
    }
    this.ApiServices.getAllArticles(data).subscribe({
      next:(res)=>{
        this.allArticles = res;
      }
    })
  }

  getUsers(){
    this.ApiServices.getUsers().subscribe({
      next:(res)=>{
        this.allUsers = res;
      }
    })
  }

}
