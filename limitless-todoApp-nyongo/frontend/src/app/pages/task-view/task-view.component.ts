import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent {

  lists: any;
  tasks: any;
  idVar: any;
  dateCheck: boolean = false;
  selectedListId: string;
  nameList: string;
  enCours: boolean = false
  terminee: boolean = false
  toutestaches: boolean = true;
  menu:boolean = false;


  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.selectedListId = params['listId'];
        this.taskService.getTasks(params['listId']).subscribe((tasks: any) => {
          this.tasks = tasks;
          this.idVar = params['listId'];
          console.log(this.idVar);
          this.dateChecker(tasks["deadline"])
          console.log(tasks["deadline"]);
        });
      })



    this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
    })

  }

  dateChecker(date: any) {
    date = new Date(date)
    if (date < Date.now) {
      this.dateCheck = true;
    } else {
      this.dateCheck = false;
    }
    console.log(this.dateCheck);
  }

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe(() => {
      //la tache a été complétée
      task.completed = !task.completed
    })
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists'])
      console.log(res);
    });
  }

  onTaskDeleteClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter((val: any) => val._id !== id)

    });
  }

  myfilter1() {
    this.enCours = true;
    this.terminee = false;
    this.toutestaches = false;
  }
 
  myfilter2() {
    this.enCours = false;
    this.toutestaches = false;
    this.terminee = true;

  }
  myfilter3() {
    this.enCours = false;
    this.terminee = false;
    this.toutestaches = true;
  }

  finder(task: any) {
    if (this.enCours === true) {
      return task.filter((p: any) => p.completed !== true);
    } else if (this.terminee === true){
      return task.filter((p: any) => p.completed === true);
    } else {
      return task;
    }
    
  }

  showMenu(){
     this.menu = !this.menu
  }


}


