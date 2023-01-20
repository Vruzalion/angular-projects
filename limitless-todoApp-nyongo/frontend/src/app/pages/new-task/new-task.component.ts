import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {

  today: Date;


  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router){
    this.today =new Date();
  }

  listId: string;

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.listId =params['listId'];
      }
    )
    
  }
  createTask( title:string, description: string){
          this.taskService.createTask(this.listId,title, description, this.today).subscribe((newTask: any)=>{
            this.router.navigate(['../'], {relativeTo: this.route})

          })
  }

  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    }
    return new Date();
}


}