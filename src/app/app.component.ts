import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GitfinderComponent } from './Github/gitfinder/gitfinder.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,GitfinderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GitApp';
}
