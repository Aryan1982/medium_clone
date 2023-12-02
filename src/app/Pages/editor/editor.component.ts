import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Quill from 'quill';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit,AfterViewInit  {

  @ViewChild('editor', { static: true }) editorElement!: ElementRef;

  constructor(private ApiService:ApiService,
              private router:Router,){}


  private quill!: Quill;
  content: any;
  viewer:any;
  ngOnInit() {
    this.viewer = new Quill('#viewer', {
      readOnly: true,
      theme: 'snow'
    });
    
    // No need to initialize Quill here; we'll do it after the view has been initialized
  }

  getContent() {
    const loginUser = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(loginUser,'from editor')
    this.content = this.quill.getContents();
    console.log(this.content);

    this.viewer.setContents(this.content);
    this.ApiService.submitArticle(this.content).subscribe({
      next:(response)=>{
        console.log('done')
      }
    })
  }

  submitArticle(){
    const loginUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.content = this.quill.getContents();
    const data = {
      content:this.content,
      loginUser:loginUser
    }
    this.ApiService.submitArticle(data).subscribe({
      next:(response)=>{
        alert('Your article has been uploaded');
        this.router.navigate(['/home'])
      }
    })
  }

  ngAfterViewInit() {
    // Check if the editorElement is defined
    if (this.editorElement && this.editorElement.nativeElement) {
      this.quill = new Quill(this.editorElement.nativeElement, {
        theme: 'snow', // You can customize the theme
        placeholder: 'Write something...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],       
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],              
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      
            // [{ 'indent': '-1'}, { 'indent': '+1' }],
            // [{ 'direction': 'rtl' }],                         

            [{ 'size': ['small', false, 'large', 'huge'] }],  
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],       
            [{ 'font': [] ,}],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean'] 
          ],
         
        },
      },);
    }
  }
}
