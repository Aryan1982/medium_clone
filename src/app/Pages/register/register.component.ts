import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators ,ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  passwordMatch(controlName:string,matchingControlName:string) : ValidatorFn{
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(controlName);
      const confirmPasswordControl = formGroup.get(matchingControlName);
  
      if (passwordControl?.value !== confirmPasswordControl?.value && passwordControl?.value !== '' ) {
        confirmPasswordControl?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl?.setErrors(null);
        return null;
      }}
  }

  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder, 
    private ApiService:ApiService,
    private router:Router
    ){
    this.registerForm = this.formBuilder.group({
      userName:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]]
    },{
      validators: this.passwordMatch('password','confirmPassword')
    })
  }


  onRegister(){
    this.ApiService.registerUser(this.registerForm.value).subscribe({
      next:(response)=>{
        
        if(response.message == 'success'){
          alert("user Regestered Succesfully")
          this.router.navigate(['/login']);
        }
        else{

          alert(response.message);
        }
      },
      error:(error)=>{
        console.log(error);
      }
    })    
  }
}
