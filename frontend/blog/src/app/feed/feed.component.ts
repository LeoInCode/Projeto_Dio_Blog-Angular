import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from '../model/Post';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  listPost: Post[];
  post: Post = new Post;
  nome: String;
  findPosts: Post[];
 
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getAllPosts()
  }

  getAllPosts() {
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.listPost = data
      this.findPosts = data
    })
  }  

  set findPost(name: String) {
    this.nome = name
    this.findPosts = this.listPost.filter((post: Post) =>
      post.nome.toLocaleLowerCase().indexOf(this.nome.toLocaleLowerCase()) > -1)
  } 

  get findPost() { 
    return this.nome;
}

  cadastrarMensagem() {
    this.postService.postMensagem(this.post).subscribe((data: Post) => {
      this.post = data
      location.assign('/feed')
    })
  }

  editarMensagem(id: number) { 
    this.postService.putMensagem(id, this.post).subscribe((data: Post) => {
      this.post = data

    })
  }

  deletarMensagem(id: number) {
    this.postService.deletePost(id).subscribe((data: Post[]) => {
      this.listPost = data
      location.assign('/feed')
    })
  }

}
