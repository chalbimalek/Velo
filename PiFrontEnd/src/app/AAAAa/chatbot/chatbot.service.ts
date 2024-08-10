import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  throwError,
} from 'rxjs';

import {
  map,
  catchError,
  delay,
} from 'rxjs/operators';

import {
  ChatbotMessage,
  ChatbotConversation,
} from './chatbot.types';

@Injectable()
export class ChatbotService {

 /* constructor(
    private http: HttpClient,
  ) {}

  public sendMessage(url: string, message: ChatbotMessage): Observable<ChatbotConversation> {
    return this.http.post(url, message)
      .pipe(
        map(result => {
          
          if (result['quickReplies']) {
            result['data'].push({
              type: 'quickReply',
              message: '',
              elements: result['quickReplies'].map((item) => {
                return {
                  text: item.text,
                  replyText: item.action
                };
              }),
            });
          }

          if (result['actions']) {
            result['data'].push({
              type: 'action',
              message: '',
              elements: result['actions'].map((item) => {
                return {
                  text: item.text,
                  action: item.action,
                  params: item.params,
                };
              }),
            });
          }
          return result['data'];
        }),
        catchError((error: any) => throwError(error))
      );
  }
*/
}
