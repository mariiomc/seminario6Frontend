import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { PostDesignComponent } from './post-design/post-design.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsersComponent, PostDesignComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hula';
  

}
