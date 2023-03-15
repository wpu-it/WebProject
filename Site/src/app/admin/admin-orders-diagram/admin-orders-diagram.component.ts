import {Component, OnInit} from "@angular/core";
import {AdminOrdersDiagramService} from "./admin-orders-diagram.service";
import {OrdersDiagram} from "./admin-orders-diagram.interfaces";
import Chart from 'chart.js/auto';

@Component({
  selector: 'orders-diagram',
  templateUrl: 'admin-orders-diagram.component.html',
  styleUrls: ['admin-orders-diagram.component.scss']
})
export class AdminOrdersDiagramComponent implements OnInit{
  barchart: Chart;
  fantourNames: string[] = [];
  counts: number[] = [];

  constructor(private readonly ordersDiagramService: AdminOrdersDiagramService) {
  }
  ngOnInit(): void {
    this.ordersDiagramService.ordersDiagram$.subscribe((res: OrdersDiagram[]) => {
      res.forEach(r => {
        this.fantourNames.push(r.fanTourName.split(',')[0]);
        this.counts.push(r.count);
      });
      this.barchart = new Chart('canvas',{
        type: 'bar',
        data:{
          labels: this.fantourNames,
          datasets:[
            {
              data: this.counts,
              borderColor: '#3cba9f',
              backgroundColor: [
                "#3cb371",
                "#0000FF",
                "#9966FF",
                "#4C4CFF",
                "#00FFFF",
                "#f990a7",
                "#aad2ed",
                "#FF00FF",
                "Blue",
                "Red",
                "Blue"
              ]
            }
          ],
        },
        options:{
          responsive: true,
          plugins: {
            legend: {
              display: false,
            }
          }
        }
      });
    });
  }

}
