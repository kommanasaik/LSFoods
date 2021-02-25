import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, Entry, FileEntry } from '@ionic-native/file';
import { CaptureVideoOptions, MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';
import { Media, MediaObject } from '@ionic-native/media';
import { Platform } from 'ionic-angular';
import moment, * as Moment from 'moment';
import {CartProvider} from '../../providers/cart/cart';

import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  Geocoder,
  GeocoderResult
} from '@ionic-native/google-maps';
import { isRightSide } from 'ionic-angular/umd/util/util';

/**
 * Generated class for the BookallservicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookallservices',
  templateUrl: 'bookallservices.html',
})
export class BookallservicesPage {
  subServiceid: any;
  capturedVideo: any;
  fromTime: any;

  /**
* Value of the toTime
*/
  toTime: any;

  /**
* Value of the selectedDate
*/
  selectedDate: any;

  /**
* Value of the jobId
*/
  jobId;

  /**
* Value of the minDate
*/
  minDate;

  /**
* Value of the minTime
*/
  minTime;
  /**
  * Accessing html element 
  */
  @ViewChild('search_address') search_address: ElementRef;

  /**
  * Value of the map
  */
  audioText;
  fileName: string;
  filePath: string;
  fileMediaObject: MediaObject;

  /**
  * Value of the fileName
  */
  capturedAudio: any;

  /**
  * Value of the fileName
  */
  capturedAudioName: any;

  map: GoogleMap;

  /**
  * Value of the marker
  */
  marker: Marker

  /**
  * Value of the jobId
  */
  capturedUrl: any;
  mimeType: any = " ";

  /**
*  Value of the imageName
*/
  imageName: any = " ";

  /**
*  Value of the previewUrl
*/
  previewUrl: any;



  /**
  * Value of the jobDetails
  
  */
  jobDetails: Array<any> = [];

  /**
  * Value of the contact_name
  */
  contact_name;

  /**
  * Value of the contact_phone
  */
  contact_phone;

  recording: boolean = false;


  /**
  * Value of the location
  */
  location;

  /**
  * Value of the locationDetails
  */
  locationDetails: Array<any> = [];

  /**
  * Value of the customLocation
  */
  customLocation;

  /**
  * Value of the latitude
  */
  latitude;

  /**
  * Value of the longitude
  */
  longitude;

  /**
  * Value of the longitude
  */
  markerlatlong;
  text: string;
  txtimage: boolean = false;
  /**
  *  loads first when entering to the page 
  *  Getting job id through navparams
  */
 Servicename:any;
 cart:any;
  subServiceName: string;
  Serviceid: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    private camera: Camera,
    private transfer: FileTransfer,
    private file: File,
    private mediaCapture: MediaCapture,
    private media: Media,
    private platform: Platform,
    public utils: UtilsServiceProvider,

  ) {
    this.subServiceid = this.navParams.data.subId;
    this.Servicename = this.navParams.data.servName;

    this.Serviceid = this.navParams.data.servId;
    this.minDate = new Date().toISOString();

    this.subServiceName = this.navParams.data.subName;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookallservicesPage');
    this.loadMap();
    this.capturedUrl = '';
    this.capturedVideo = '';

    this.customLocation = "Rajahmundry";

  }


  loadMap() {
    this.customLocation = "Rajahmundry";

    let options: GoogleMapOptions = {
      controls: {
        compass: true,
        myLocation: true,
        myLocationButton: true,
        mapToolbar: true
      }
    };
    this.search_address.nativeElement.value = this.customLocation;
    this.map = GoogleMaps.create('map_canvas', options);
    this.map.clear();
    Geocoder.geocode({
      "address": this.search_address.nativeElement.value
    }).then((results: GeocoderResult[]) => {
      // this.utils.dismissLoading();
      this.getAddress(results[0].position.lat, results[0].position.lng)
      this.addMarker(results[0].position)

    });
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
      (data) => {
        this.map.clear();
        // the latlng variable contains the data
        let lat: any = data[0].lat
        let lng: any = data[0].lng
        this.latitude = lat;
        this.longitude = lng;
        this.getAddress(lat, lng)
        let position = {
          lat: lat,
          lng: lng
        }
        this.addMarker(position)
      }
    );
    // this.getLocation();
  }

  /**
   * search custom location on search
   * @returns returns searched location
*/
  onButton1_click() {
    // this.utils.presentLoading();
    this.map.clear();
    Geocoder.geocode({
      "address": this.search_address.nativeElement.value
    }).then((results: GeocoderResult[]) => {
      // this.utils.dismissLoading();
      this.getAddress(results[0].position.lat, results[0].position.lng)
      this.addMarker(results[0].position)

    });
  }

  /**
* add marker to map
* @return returns getting marker position
*/
  addMarker(pos) {
    if (this.marker) {
      this.marker = null;
    }
    this.marker = this.map.addMarkerSync({
      'position': pos,
      animation: 'DROP',
      // 'title': loc,
      draggable: true,
    })
    this.marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe(() => {
      this.markerlatlong = this.marker.getPosition();
      this.getAddress(this.markerlatlong.lat, this.markerlatlong.lng)
      this.latitude = this.markerlatlong.lat;
      this.longitude = this.markerlatlong.lng;
    });

    this.map.animateCamera({
      'target': this.marker.getPosition(),
      'zoom': 17
    }).then(() => {
      this.marker.showInfoWindow();
    })




    //   this.map.addEventListener(GoogleMapsEvent.MAP_CLICK).subscribe(latlng => {

    // });
  }

  /**
*  getting location details using latitude and longitude
*  @returns latitude and longitude
*/
  getAddress(lat, lng) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(lat, lng, options)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.location = result[0].subLocality + "," + result[0].subAdministrativeArea + "," + result[0].locality + "," + result[0].postalCode + "," + result[0].countryName;
      })
      .catch((error: any) => console.log(error));
  }
  backSubServicePage() {
    // this.navCtrl.setRoot("AllsubservicesPage");
    this.navCtrl.setRoot("AllsubservicesPage", { serviceId: this.Serviceid });


  }
  async getPicture() {
    const actionSheet = await this.actionSheetController.create({
      title: 'Select',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          // console.log('Camera clicked');
          const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }

          this.camera.getPicture(options).then((imageData) => {
            this.capturedUrl = imageData;
            // console.log(this.capturedUrl)
            this.convertAsBase64();
          }, (err) => {
            // Handle error
          });
        }
      }, {
        text: 'Gallery',
        icon: 'image',
        handler: () => {
          // console.log('Gallery clicked');
          const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
          }

          this.camera.getPicture(options).then((imageData) => {
            this.capturedUrl = imageData;
            // console.log(this.capturedUrl)
            this.convertAsBase64();
          }, (err) => {
            // Handle error
          });
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  convertAsBase64() {
    this.file.resolveLocalFilesystemUrl(this.capturedUrl).then((entry: Entry) => {
      if (entry) {
        var fileEntry = entry as FileEntry;
        fileEntry.file(success => {

          this.mimeType = success.type;
          this.imageName = success.name;

        }, error => {
          // no mime type found;
        });
      }
    });

    this.file.resolveLocalFilesystemUrl(this.capturedUrl).then((entry: any) => {
      entry.file((file) => {
        var reader = new FileReader();
        reader.onloadend = (encodedFile: any) => {
          let src = encodedFile.target.result;
          this.previewUrl = src;
          // this.hideAttachmentButtons = true;

        }
        reader.readAsDataURL(file);
      })
      setTimeout(() => { this.clickToShowImage(); }, 1000);
    }).catch((error) => {
      // console.log(error);
    })
  }
  clickToShowImage() {
  }
  startRecord() {
    this.audioText = 'Recording audio...';
    if (this.platform.is('ios')) {
      this.fileName = 'audio' + (new Date().getMilliseconds()) + '.m4a';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.fileMediaObject = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'audio' + (new Date().getMilliseconds()) + '.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.fileMediaObject = this.media.create(this.filePath);
    }
    this.fileMediaObject.startRecord();
    this.recording = true;
  }
  stopRecord() {
    this.audioText = '';
    this.fileMediaObject.stopRecord();
    this.capturedAudio = this.filePath;
    this.capturedAudioName = this.fileName;
    this.recording = false;
    // this.hideAttachmentButtons = true;
    this.text = 'Audio Captured';
  }

  captureVideo() {
    let options: CaptureVideoOptions = {
      limit: 1,
      duration: 10,
      quality: 20,
    };
    this.mediaCapture.captureVideo(options).then((data: MediaFile[]) => {
      this.capturedVideo = data[0]
      // this.hideAttachmentButtons = true;
      this.text = 'Video Captured.';
    },
      (err: CaptureError) => console.error(err)
    );
  }
  addText() {
    let alert = this.alertCtrl.create({
      title: 'Description',

      inputs: [
        {
          type: 'textarea',
          name: 'description',
          id: 'description',

          placeholder: 'description'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            this.txtimage = true;
            // if (User.isValid(data.username, data.password)) {
            //   // logged in!
            // } else {
            //   // invalid login
            //   return false;
            // }
          }
        }
      ]
    });
    alert.present();
  }



  getCurrentLocation() {
    this.platform.ready().then(() => {
      this.map.clear();
      this.locationDetails = [];
      this.geolocation.getCurrentPosition().then((resp) => {
        console.log(resp);
        let position = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        }
        console.log(position);
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.getAddress(resp.coords.latitude, resp.coords.longitude)
        this.addMarker(position)
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });


  }

  onDateSelected() {
    this.fromTime = '';
    this.toTime = '';
    let presentTime = '';
    if (this.selectedDate == this.minDate.split('T')[0]) {
      this.minTime = Moment().format();
    } else {
      this.minTime = '00:00'
    }
  }
  validateTime() {
    if (this.fromTime >= this.toTime) {
      document.getElementById("timeError").innerHTML = "To time must be greater than From time.";
      // this.utils.presentAlert("Oops!","From time must not greater than To time.");
    } else {
      document.getElementById("timeError").innerHTML = "";
    }
  }
  /**
  *  validating time
  */
  validateFromTime() {
    if (this.selectedDate == this.minDate.split('T')[0]) {
      var presentDate = Moment(this.minDate);
      var returned_endate = Moment(this.minDate).add(4, 'hours');  // see the cloning?
      //var fromtimedate = Moment(this.fromTime);  // see the cloning?
      let dd=this.selectedDate+" "+this.fromTime;
     var fromtimedate=Moment(dd);

      if ( fromtimedate >returned_endate) {
        if (this.fromTime >= this.toTime) {
          if(this.toTime!=""){}
          else
          {
          document.getElementById("fromtimeError").innerHTML = "";
          document.getElementById("fromtimeError").innerHTML = "From time must not greater than To time.";
          }
        } else {
          document.getElementById("fromtimeError").innerHTML = "";
        }
      }
      else {
        document.getElementById("fromtimeError").innerHTML = "";

        document.getElementById("fromtimeError").innerHTML = "From time must be greater than 4 hours from present time";

      }
    }
    else {
      var returned_endate1 = Moment(this.selectedDate);  // see the cloning?
      if (returned_endate1 > this.minDate) {
        if (this.fromTime >= this.toTime) {
          if(this.toTime!=""){}
          else
          {
          document.getElementById("fromtimeError").innerHTML = "";
          document.getElementById("fromtimeError").innerHTML = "From time must not greater than To time.";
          }
        } else {
          document.getElementById("fromtimeError").innerHTML = "";
        } 
      }
    }
  }

  submitDate() {
    
    // this.cart = this.cartService.getService();
    let CartLength=this.cart.length;
    if(CartLength>=2)
    {
      this.utils.presentAlert("Alert", "Maximum adding service limit is 2");
      
    }
    else
    {
    let servieObject={
      serviceName:this.Servicename,
      serviceid:this.Serviceid,
      subServiceid:this.subServiceid,
      subServiceName:this.subServiceName
    }
    
    // this.cartService.addService(servieObject);

   
    this.navCtrl.setRoot("CartPage", { subId: this.subServiceid,servId:this.Serviceid });
    }
   
    

  }




}
