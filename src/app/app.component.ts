import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataService } from './indexed-db/services/data.service';
import { DBStores } from './indexed-db/services/idb.store.model';
import { API_ENDPOINTS } from './constants/endpoints';
import { IUser } from './indexed-db/interfaces/user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <h1>Welcome to {{title}}!</h1>

    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'indexeddb-1';
  constructor(private dataService: DataService) { }
  async ngOnInit() {
    let user = (await this.dataService.getListAsync(
      DBStores.User.TableName,
      API_ENDPOINTS.user
    )) as IUser[];
    console.log(user);
  }
}
