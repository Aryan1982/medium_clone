import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm : FormGroup;
  public loginUser: any;
  constructor(private formBuilder: FormBuilder, 
    private http: HttpClient,
    private ApiServices:ApiService,
    private router:Router,
    ) {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.email,Validators.required]],
      password: ['',[Validators.required]],
    });
  }

  onSubmit(){
    console.log(this.loginForm.value);
    
    this.ApiServices.loginUser(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Response from server:', response.loginStatus);
        const token = response.Authorization

        if(response.loginStatus == 'success'){
          this.getLoginUser(token);
          // this.toastr.success('user Login Succesfull', 'Success');
          alert('user Login Succesfull')
           const headers = new HttpHeaders().set('Authorization', `${response.Authorization}`);
          this.http.get('your-url', { headers }).subscribe(response => {
          }, error => {
            console.error(error);
          });
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
          
          
          
        }
        if(response.loginStatus == 'failed'){
          alert('incorrect username or password')
          // this.toastr.success('incorrect username or password', 'Success');
          // this.sweetAlert.fire('incorrect username or password')
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  getLoginUser(token:any){
    this.ApiServices.getLoginUser({"token":token}).subscribe({
      next:(response)=>{
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response));
        // const user = JSON.parse(localStorage.getItem('user') || '{}');
        // console.log(user,'from login')
        // // this.loginUser = response; 
      }
    })
  }
}
