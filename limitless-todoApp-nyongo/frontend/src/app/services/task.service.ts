import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Task } from '../models/task.model';



@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  getLists(){
    return this.webReqService.get('lists');
  }
  
  createList(title: string){
    //envoyer une requete pour creer une liste
   return this.webReqService.post('lists', {title});

  }
  updateList(id: string, title: string){
    //envoyer une requete pour creer une liste
   return this.webReqService.patch(`lists/${id}`, {title});

  }

  deleteList(id: string){
    return this.webReqService.delete(`lists/${id}`);
  }


  
  getTasks(listId: string){
    //envoyer une requete pour afficher une tache
    return this.webReqService.get(`lists/${listId}/tasks`);
  }
  createTask(listId: string, title: string, description: string, deadline: Date){
    //envoyer une requete pour creer une tache
    console.log(listId)
    return this.webReqService.post(`lists/${listId}/tasks`, {title, description, deadline}); 
  }
  deleteTask(listId: string, taskId: string){
    //envoyer une requete pour supprimer une tache
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
  }
  updateTask(listId: string, taskId: string, title: string,  description: string, deadline: Date){
    //envoyer une requete pour creer une liste
   return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`, {title, description, deadline});

  }
  complete(task: Task){
    //envoyer une requete pour finir une tache
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed:!task.completed
    });
  }
}
