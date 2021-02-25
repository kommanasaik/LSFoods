import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';
import { ChatServiceProvider } from '../../providers/chat-service/chat-service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

/**
 * Manages all methods 
 */
export class ChatPage {

  /**
   *  Accessing html content
   */
  @ViewChild('content') content: any;

  /**
* Value of the header title
*/
  headerTitle;

  /**
 *  Value of the userChat data
 */
  public userChat: Array<any> = [];

  /**
*  Value of the senderChat data
*/
  public senderChat: Array<any> = [];

  /**
 *  variable to manage chat interval 
 * @example
 * send request to server by interval when entering page
 * stops when leaves the page
 */
  public msgLoader;

  /**
*  Value of the complete chat data
*/
  public chatData;

  /**
 *  Value of the message to send 
 */
  message: string;

  /**
* Value of the last message id
*/
  lastId;

  /**
* Value of the first message id
*/
  firstId;

  /**
  *  loads first when entering to the page 
  *  initializing headerTitle value
  */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public chatService: ChatServiceProvider,
    public storage: Storage
  ) {
    this.headerTitle = "Chat";
  }

  /**
  *  Fired after loading constructor
  * @returns starts sending request to server for chat data
  */
  ionViewDidLoad() {
    setTimeout(() => { this.content.scrollToBottom(300); }, 3000);
    this.exploreChat();
  }

  /**
  *  Fired when you leave a page
  * @returns stops sending request to server for chat data
  */
  ionViewDidLeave() {
    this.msgLoader.unsubscribe();
  }

  /**
   *  get previous chat on refreshing the page by pull down
   *  @param {eventtype} event (to handle refresh functionality)
   * @returns return chat data
   */
  doRefresh(event) {
    this.storage.get('user_id').then((id) => {
      let chatObj = {
        action: "list_chat",
        id: id,
        fid: this.firstId,
        start: 1
      }
      this.chatService.chatData(chatObj).subscribe((result) => {
        if (result) {
          this.chatData = result.data.concat(this.chatData);
          this.firstId = this.chatData[0].id;
        }

      })
      setTimeout(() => {
        event.complete();
      }, 1000);
    })
  }


  /**
  *  send request to server to get chat data by interval
  * @returns return chat data
  */
  exploreChat() {
    this.storage.get('user_id').then((id) => {
      this.msgLoader = Observable.interval(1000).subscribe((value) => {
        let chatObj = {
          action: "list_chat",
          id: id,
          lid: this.lastId,
          fid: this.firstId
        }
        this.chatService.chatData(chatObj).subscribe((result) => {
          if (result) {
            if (this.chatData) {
              this.chatData = this.chatData.concat(result.data);
            } else {
              this.chatData = result.data;
            }
            this.lastId = this.chatData[this.chatData.length - 1].id;
            this.firstId = this.chatData[0].id;

          }
        })
      })
    })
  }



  /** 
   * send message to connected person
   * @returns success or failure from server
    */
  sendMsg() {
    this.content.scrollToBottom(300);
    this.storage.get('user_id').then((id) => {
      let msgData = {
        action: 'add_chat',
        id: id,
        message: this.message,

      }
      this.chatService.postMessage(msgData).subscribe((data) => {
        setTimeout(() => { this.content.scrollToBottom(300); }, 800);

      })
      this.message = "";
    })

  }

}
