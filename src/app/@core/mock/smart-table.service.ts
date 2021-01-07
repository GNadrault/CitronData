import { Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table';

@Injectable()
export class SmartTableService extends SmartTableData {
  
  data = [
    {
      id: 1,
      firstName: 'Mark',
      lastName: 'Otto',
      price: '12'
    },
    {
      id: 2,
      firstName: 'Mark',
      lastName: 'Otto',
      price: '12'
    },
    {
      id: 3,
      firstName: 'Mark',
      lastName: 'Otto',
      price: '12'
    },
    {
      id: 4,
      firstName: 'Mark',
      lastName: 'Otto',
      price: '12'
    },
    {
      id: 5,
      firstName: 'Mark',
      lastName: 'Otto',
      price: '12'
    },
    {
      id: 6,
      firstName: 'Mark',
      lastName: 'Otto',
      price: '12'
    },
    {
      id: 7,
      firstName: 'Mark',
      lastName: 'Otto',
      price: '12'
    },
    {
      id: 8,
      firstName: 'Mark',
      lastName: 'Otto',
      price: '12'
    },
    {
      id: 9,
      firstName: 'Mark',
      lastName: 'Otto',
      price: '12'
    },
    {
      id: 10,
      firstName: 'Mark',
      lastName: 'Otto',
      price: '12'
    },
    {
      id: 11,
      firstName: 'Mark',
      lastName: 'Otto',
      price: '12'
    },
    {
      id: 12,
      firstName: 'Mark',
      lastName: 'Otto',
      price: '12'
    },
    {
      id: 13,
      firstName: 'Mark',
      lastName: 'Otto',
      price: '12'
    },
  ];

  getData() {
    return this.data;
  }
}
