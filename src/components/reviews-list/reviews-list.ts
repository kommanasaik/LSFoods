import { Component, Input } from '@angular/core';
import { ReviewServiceProvider } from '../../providers/review-service/review-service';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { Storage } from '@ionic/storage';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'reviews-list',
  templateUrl: 'reviews-list.html'
})

/**
 * Manages all methods 
 */
export class ReviewsListComponent {

  /**
*  To initiate this component whereever we used in a template.
*  @param title bounded variable in that template
*/
  @Input() options: any;

  /**
* Value of the reviewsList
*/
  reviewsList: Array<any> = [];

  /**
* Value of the job_id
*/
  job_id;

    /**
*  loads first when entering to the page 
*/
  constructor(
    public reviewService: ReviewServiceProvider,
    public utils: UtilsServiceProvider,
    public storage: Storage,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
  ) {

  }

    /**
*  Fired after loading constructor
*/
  ngOnInit() {
    this.storage.get("user_id").then((id) => {
      this.job_id = id;
      this.getReviews();
    })
  }

    /**
*  getting reviews list conditionally
*  @returns returns reviews data
*/
  getReviews() {
    this.utils.presentLoading();
    let action = this.options == 'myreviews' ? "list_user_reviews" : "list_all_reviews";
    this.storage.get('user_id').then((id) => {
      this.reviewService.getUserReviews(action, id).subscribe((result) => {
        this.utils.dismissLoading();
        this.reviewsList = result.data;
        console.log(this.reviewsList);
      })
    })
  }

    /**
*  passing parameters and opening modal page
* @param id job id
*/
  openJobDetails(id) {
    const instmodal = this.modalCtrl.create("JobDetailModelPage", { job_id: id });
    instmodal.onDidDismiss(function () {

    });
    instmodal.present();

  }


}
