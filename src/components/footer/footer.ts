import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ChatServiceProvider } from '../../providers/chat-service/chat-service';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';

@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})

/**
 * Manages all methods 
 */
export class FooterComponent {
  /**
* defining hideicons
*/
  hideicons: boolean;

  /**
* Value of the chatBadge
*/
  chatBadge;

  /**
* defining msgLoader
*/
  public msgLoader;

  /**
* defining hideiconspages
*/
  pages: Array<any>;

  /**
*  loads first when entering to the page 
*/
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public chatService: ChatServiceProvider
  ) {
    this.onPageLoad();
  }

  /**
*  Fired after loading constructor
* storage get the value of stored auth value in the app
*/
  ngOnInit() {
    // this.storage.get('auth').then((auth) => {
    //   if (auth)
    //     this.getunreadChat();
    // })

  }

  /**
*  Fired when leaves the page
*/ionViewDidLeave() {
    this.msgLoader.unsubscribe();
  }
  

  /**
*  setting pages data
*  getting stored values in storage
*  @param pages adding title icon and component
*  @returns The pages with navigation
*/
  onPageLoad() {
    this.pages = [
      { title: 'Book Service', component: "BookServicePage", icon: "home" },
      { title: 'Service Job History', component: "NewmybookingsPage", icon: "list-box" },

      { title: 'Chat', component: "ChatPage", icon: "chatboxes", badge: this.chatBadge },
      { title: 'Profile', component: "ProfilePage", icon: "person" },
    ];
    this.storage.get('user_name').then((name) => {
      this.storage.get('user_phone').then((phone) => {
        this.storage.get('user_address').then((address) => {
          if (name && phone && address) {
            // alert("present"+name+phone+address)
            this.hideicons = false;
          } else {
            // alert("not present"+name+phone+address)
            this.hideicons = true;
          }
        })
      })
    })
  }

  /**
*  getting unread chat messages count
* sending request to server by interval 
*  @param msgLoader initialiing to send server request for unread chat
*  @returns unread chat data
*/
  getunreadChat() {
    this.storage.get('user_id').then((id) => {
      this.msgLoader = Observable.interval(5000).subscribe((value) => {
        let chatObj = {
          action: "unread_chat",
          id: id,
        }
        this.onPageLoad();
        this.chatService.chatData(chatObj).subscribe((result) => {
          if (result) {
            this.chatBadge = result.data.unread;
          }

        })
      })
    })

  }

  /**
*  @returns navigate to selected page
*/
  gotoPage(page) {
    this.navCtrl.setRoot(page)
  }

}
