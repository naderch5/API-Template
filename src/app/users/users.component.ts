import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RegisterService } from '../user/register.service';
import { User } from '../user';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild('myChart') myChart: ElementRef;
  users:User[];
  // pagedProjectRequests: ProjectRequest[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  roleData: any;

  constructor(private us: RegisterService) { }

  ngOnInit(): void {
    console.log("aaaaaaaaaaaaaaaa")
    this.us.getAllUsers().subscribe(data=>{
      this.users=data;
    });
    this.us.calculateRolePercentage().subscribe(data => {
      this.roleData = data;
      this.createChart();
    });
  }
  
  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    // this.pagedProjectRequests = this.projectrequests.slice(startIndex, endIndex);
  }

  deleteUser(id) {
    console.log(id);
    this.us.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(projectRequest => projectRequest.userId !== id);
      this.totalItems = this.users.length;
      this.setPage(this.currentPage); // Refresh pagination
    });
  }
  

  createChart() {
    const ctx = this.myChart.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['User', 'Investor', 'Admin'],
        datasets: [{
          label: 'Percentage',
          data: [this.roleData.USER, this.roleData.INVESTOR, this.roleData.ADMIN],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
