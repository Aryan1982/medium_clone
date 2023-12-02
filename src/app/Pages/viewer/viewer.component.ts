import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Quill from 'quill';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent {
  articleId: String = " ";
  viewer:any;
  viewerContent:any;
  private quill!: Quill;
  userName: any;

  constructor(private route: ActivatedRoute,
    private ApiServices:ApiService) { }

  ngOnInit(): void {
    this.viewer = new Quill('#viewer', {
      readOnly: true,
      theme: 'snow',
     modules: {
        toolbar: false
            }
    });

    this.route.params.subscribe(params => {
      this.articleId = params['id'];
      // Fetch article details using the articleId
      console.log(this.articleId)
      this.getArticle(this.articleId);
    });
  }

    getArticle(id:any){
      this.ApiServices.getArticelById({"id":id}).subscribe((article) => {
        // console.log(article);
        this.viewerContent = article.ops;
        this.viewer.setContents(this.viewerContent)
        this.userName = article.username
        // Do something with the fetched article
      });
    }
    
  }

