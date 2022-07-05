import { Injectable } from '@angular/core';

import StateDistrict  from "./../../assets/json_data/indian_state_and_district.json";
import { IndianStateDistrict } from "src/app/model/indian-state-district.model"


@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor() { }

  getWbDistricts(): string[] {
    let indianStateDistrict: IndianStateDistrict = StateDistrict;
    let wbDistricts: string[] = [];

    wbDistricts = indianStateDistrict.states.find((value, index) => {
      return (value.state == "West Bengal")
    }).districts;

    return wbDistricts;
  }
}
