import { Time } from '@angular/common';
export class Train {
  id: number;
  name: string;
  srcStation: string;
  desStation: string;
  fare: number;
  status: string;
  trainType: string
  displayDepartureTime: string;
  displayArrivalTime: string
}
