import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {

  today: Date;


  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router){
    this.today =new Date();
  }

  taskId: string;
  listId: string;

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.listId =params['listId'];
        this.taskId =params['taskId'];
      }
    )
    
  }

  updateTask(title:string, description: string) {
    this.taskService.updateTask(this.listId, this.taskId, title, description, this.today).subscribe(()=>{
      this.router.navigate(['/lists', this.listId] );

    })
  }

  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    }
    return new Date();
}
}
