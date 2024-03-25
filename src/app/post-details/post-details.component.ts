import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CommonModule, NgFor, NgIf, UpperCasePipe} from '@angular/common';
import { Post } from '../models/post';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
  imports: [FormsModule, NgIf, NgFor, UpperCasePipe, CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class PostDetailsComponent {
  @Input() post?: Post;
  @Output() goBack = new EventEmitter<void>();

  @Output() deselect = new EventEmitter<void>();
  @Output() showPostDetails = new EventEmitter<Post>();
  @Output() postUpdated = new EventEmitter<Post>();

  editPostForm: FormGroup;

  editPost: Post= {
    '_id': '',
    'userId': '',
    'title': '',
    'body': ''
  }


constructor(public postService: PostService, private formBuilder: FormBuilder) {
  this.editPostForm = this.formBuilder.group({
    userId: ['', [Validators.required]],
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
  });

  // Comprobar si hay un usuario recibido como entrada y actualizar el formulario si es necesario
}

public updateFormWithPostData(post: Post): void {
  // Actualizar los valores del formulario con los datos del usuario
  this.editPostForm.patchValue({
    userId: post.userId,
    title: post.title,
    body: post.body
  });
}

  update: boolean= false;


  ngOnInit() {
    if (this.post) {
      this.updateFormWithPostData(this.post);
    }   
  }
 
  

  showPost(post: Post): void {
    this.showPostDetails.emit(post);
  }

  updateEdit(state: boolean) {
    this.update = state;
    console.log("Cambio modo edición/lectura", this.update);
  }

  updatePost(): void {

    const formData = this.editPostForm.value;
    console.log("Estoy aquí")
    this.editPost = {
      _id: this.post?._id!, // Usamos el _id del usuario actual
      title: formData.title,
      userId: formData.userId,
      body: formData.body
      };

    this.postService.updatePost(this.editPost).subscribe (editPost =>{
      this.post =   {
     '_id': this.editPost?._id!,
     'title':this.editPost?.title!,
     'body':this.editPost?.body!,
     'userId': this.editPost?.userId!
    } 
    
            
      this.postUpdated.emit(this.editPost);
    });
  }


}