import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from '../model/Post';
import { faTheRedYeti } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  listPost: Post[];
  post: Post = new Post;
  name: String;
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
    this.name = name
    this.findPosts = this.listPost.filter((post: Post) =>
      post.nome.toLocaleLowerCase().indexOf(this.name.toLocaleLowerCase()) > -1)
  } 

  get findPost() { 
    return this.name;
}

  cadastrarMensagem() {
      this.postService.postMensagem(this.post).subscribe((data: Post) => {
        this.post = data
        location.assign('/feed')
      })
  }

  atualizarCampos(id: number, nome: String, mensagem: String) { 
    this.post.id = id
    this.post.nome = nome
    this.post.mensagem = mensagem
  }

  atualizarMensagem() {
    this.postService.putMensagem(this.post.id,this.post).subscribe((data: Post) => {
      this.post = data
      location.assign('/feed')
    })
}

  deletarMensagem(id: number) {
    this.postService.deletePost(id).subscribe((data: Post[]) => {
      this.listPost = data
      location.assign('/feed')
    })
  }

}
