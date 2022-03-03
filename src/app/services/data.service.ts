import { Injectable } from '@angular/core';

export interface Message {
  fromName: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public messages: Message[] = [
    {
      fromName: 'Track user attribute',
    },
    {
      fromName: 'Track event',
    },
    {
      fromName: 'Show InApps',
    },
    {
      fromName: 'Show Self InApps',
    }
  ];

  constructor() { }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }
}
