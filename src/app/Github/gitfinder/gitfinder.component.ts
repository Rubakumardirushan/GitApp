import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gitfinder',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './gitfinder.component.html',
   styleUrl: './gitfinder.component.css'
})
export class GitfinderComponent implements OnInit {
  constructor(private http: HttpClient) {}
  username: string = '';

  getname(event: Event) {
    this.username = (<HTMLInputElement>event.target).value;
  }

  userinfo = new userdeatils();
  findname() {
    this.userinfo.follower = [];
    this.userinfo.conut = false;
    this.http
      .get('https://api.github.com/users/' + this.username)
      .subscribe((result: any) => {
        this.userinfo.bio = result['bio'];
        this.userinfo.avatar_url = result['avatar_url'];
        console.log(result);
        this.userinfo.followers_url = result['followers_url'];
        this.userinfo.following_url = result['following_url'];
        console.log(this.userinfo.following_url);
        this.userinfo.name = result['name'];
        this.userinfo.location = result['location'];
        this.userinfo.public_repos = result['public_repos'];
        if (!result) {
          alert('User not found');
        }
      });
  }
  ngOnInit(): void {}
  getfollowers() {
    this.userinfo.conut = true;
    this.http.get(this.userinfo.followers_url).subscribe((followers: any) => {
      for (let i = 0; i < followers.length; i++) {
        this.userinfo.follower.push(followers[i].login);
        console.log(followers[i].login);
      }
    });
  }
}
export class userdeatils {
  bio: string = '';
  avatar_url: string = '';
  followers_url: string = '';
  following_url: string = '';
  name: string = '';
  location: string = '';
  public_repos: number = 0;
  follower: string[] = [];
  following: string[] = [];
  conut: boolean = false;
}
