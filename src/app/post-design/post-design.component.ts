import { Component, EventEmitter, Output } from '@angular/core';
import { PostService } from '../services/post.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Post } from '../models/post';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { PostDetailsComponent } from '../post-details/post-details.component';


@Component({
  selector: 'app-post-design',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, UpperCasePipe,UserDetailsComponent, PostDetailsComponent,ReactiveFormsModule],
  templateUrl: './post-design.component.html',
  styleUrl: './post-design.component.css'
})
export class PostDesignComponent {

  newPostForm: FormGroup;

  posts: Post[] = [];

  showPostDetailsForm: boolean = false;
  selectedPost?: Post;
  postUpdated?: Post;
  showAddPostForm: boolean = false;
  isPostSelected: boolean = false;

  constructor( public postService: PostService, private formBuilder: FormBuilder // Inyectamos el FormBuilder
  ) {
    this.newPostForm = this.formBuilder.group({
      userId:['', [Validators.required]],
      title: ['', [Validators.required]],
      body: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe (posts =>{
      this.posts = posts;
      console.log(posts);
    })
  }

  @Output() postSelected = new EventEmitter<boolean>();

  onSelect(post: Post): void {
    this.selectedPost = post;
    this.postSelected.emit(true);
  }

  onPostUpdated(post: any): void {
    this.postUpdated = post;
  }

  deselectPost(): void {
    
    if (this.selectedPost && this.postUpdated) {
      const index = this.posts.findIndex(post => post._id === this.selectedPost!._id);
      if (index !== -1) {
        this.posts[index] = this.postUpdated;
      }
    }
    this.selectedPost = undefined;
    this.postSelected.emit(false); // Emitir false cuando se deselecciona un usuario
  }


  postPosts(): void{

    if (this.newPostForm.valid) {
      console.log("ES VÁLIDO")
      console.log(this.newPostForm.value)
      this.postService.postPosts(this.newPostForm.value).subscribe((res: any) => {
        console.log("Post añadido!!!", res.post);
        this.posts.push(res.post);
        this.newPostForm.reset();
      });
    } else {
      console.error("El formulario no es válido. No se puede agregar el post.");
    }
  } 

  updatePost(): void{

    if (this.newPostForm.valid) {
      console.log("ES VÁLIDO")
      console.log(this.newPostForm.value)
      this.postService.updatePost(this.newPostForm.value).subscribe((res: any) => {
        console.log("Post actualizado!!!", res.post);
        this.posts.push(res.post);
        this.newPostForm.reset();
      });
    } else {
      console.error("El formulario no es válido. No se puede actualizar el post.");
    }
  } 



  showAddPost(state: boolean) {
    this.showAddPostForm = state;
    console.log("Cambio modo edición/lectura", this.showAddPostForm);
  }

  showPostDetails(state: boolean){
    this.showPostDetailsForm = state;
  }

  onPostSelected(selected: boolean): void {
    this.isPostSelected = selected;
  }
  

}
