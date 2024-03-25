import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { PostDesignComponent } from './post-design/post-design.component';

@NgModule({
  declarations: [
    PostDesignComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PostDesignComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
