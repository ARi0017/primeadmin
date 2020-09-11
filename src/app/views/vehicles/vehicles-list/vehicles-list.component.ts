import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../services/Vehicle/vehicle.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss']
})
export class VehiclesListComponent implements OnInit {
  data: any;
  activeData: any;
  imgUrl: string;
  vehicleId: any;
  isActive: any;

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    this.getVehicleList()
    this.getActiveVehiclesList()
  }

  getVehicleList() {
    this.vehicleService.getVehicleList().subscribe(data => {
      console.log(data);
      this.data = data.data;

    })
  }

  getActiveVehiclesList() {
    this.vehicleService.activeVehiclesList().subscribe(data => {
      console.log(data);
      this.activeData = data.data;
    })
  }

  getVehicleById() {
    let id = {"VehicleId": +this.vehicleId}
    console.log(id)
    this.vehicleService.vehicleSearchById(id).subscribe(data => {
      console.log(data)
      this.data = data.data;
    })
  }

  onStatus(id: any, isActive: any) {
    if (!confirm('Are You Sure?')) {
      return;
    }
    this.vehicleId = id;
    this.isActive = isActive;
    const vehicleStatus = {
      "VehicleId": this.vehicleId,
      "IsActive": this.isActive,
      "CreatedBy": 1
    };
    this.vehicleService.vehicleStatusUpdate(vehicleStatus).subscribe(data => {
      console.log(data);
      if (data.status == 200) {
        this.toaster.Success("Status Updated Successfully");
        this.getVehicleList();
        this.getActiveVehiclesList();
      }
    })
  }

  onAddVehicle() {
    this.router.navigate(['/vehicles-list/add']);
  }

}
