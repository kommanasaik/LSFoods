import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, Entry, FileEntry } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

/**
 * Manages all methods 
 */
export class ProfilePage {
  /**
* Value of the header title
*/
  headerTitle;

  /**
 * defining profileForm
 */
  private profileForm: FormGroup;

  /**
* Value of the userId
*/
  userId;

  /**
* Value of the locationDetails
*/
  locationDetails: Array<any> = [];

  /**
*  loads first when entering to the page 
* initializing heaserTitle value
* initializing profileForm 
* alidating profileForm
*/
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profileService: ProfileServiceProvider,
    public storage: Storage,
    private formBuilder: FormBuilder,
    public utils: UtilsServiceProvider,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private transfer: FileTransfer,
    private file: File,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) {
    this.headerTitle = "Profile";
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      mobile: [''],
      gender: [''],
      email: [''],
      address: ['', Validators.required]
    });
  }

  /**
*  Fired after loading constructor
*   calling getProfileData method
*/
  ionViewDidLoad() {
    this.capturedUrl = "";
    this.getProfileData();
  }

  /**
*  get user current location using ionic native geocoder plugin
*  @returns returns current location coordinates
*/
  getCurrentLocation() {
    this.locationDetails = [];
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.geolocation.getCurrentPosition().then((resp) => {
      this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
        .then((result: NativeGeocoderReverseResult[]) => {
          this.locationDetails.push(result[0])
          this.profileForm.controls['address'].setValue(result[0].subLocality + "," + result[0].subAdministrativeArea + "," + result[0].locality + "," + result[0].postalCode + "," + result[0].countryName)
        })
        .catch((error: any) => console.log(error));
    }).catch((error) => {
    });
  }

  /**
*  get user profile data from server
 * start loading when method calls 
  * stop loading when getting response from server
  * @returns returns profile data
*/
  getProfileData() {
    this.utils.presentLoading();
    this.storage.get('user_id').then((id) => {
      this.userId = id;
      this.profileService.getProfile(id).subscribe((result) => {
        this.utils.dismissLoading();
        if (result) {
          this.profileForm.controls['name'].setValue(result.data.name ? result.data.name : '');
          this.profileForm.controls['phone'].setValue(result.data.phone ? result.data.phone : '');
          this.profileForm.controls['mobile'].setValue(result.data.mobile ? result.data.mobile : '');
          this.profileForm.controls['gender'].setValue(result.data.gender ? result.data.gender : '');
          this.profileForm.controls['email'].setValue(result.data.email ? result.data.email : '');
          this.profileForm.controls['address'].setValue(result.data.address ? result.data.address : '');
          if (result.data.image) {
            this.previewUrl = "https://veerankis.org/quickworker/customer/" + result.data.image;
          } else {
            this.previewUrl = "/assets/images/noimage.jpg";

          }

        }
      })
    })

  }


  //----------- image functionality ----------------
  /**
*  Value of the uId
*/
  uId;

  /**
*  Value of the capturedUrl
*/
  capturedUrl: any;

  /**
*  Value of the imageUrl
*/
  imageUrl;

  /**
*  call ionic native camera plugin to take picture
*  @returns returns captured image data
*/
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
            quality: 100,
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

  // for preview purpose & image details
  /**
*  Value of the mimeType
*/
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
*to get image details form temp and to convert image to base64image
* to get image details from temp 
* to convert image to base64image to preview
* @returns returns image details and converts as base64image
*/
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
        }
        reader.readAsDataURL(file);
      })
    }).catch((error) => {
      // console.log(error);
    })
  }

  /**
   * Uploadin image to server
   * start loading when uploading 
* stop loading when getting response from server
* navigating to specific page after successfully submitted
* @returns returns success or failure message from server
*/
  startUploading() {
    this.utils.presentLoading();
    if (this.capturedUrl != "") {
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: 'image',
        httpMethod: 'POST',
        chunkedMode: false,
        fileName: this.imageName,
        mimeType: this.mimeType,
        headers: { 'Content-Length': 0 },
        params: {
          action: "update_profile",
          name: this.profileForm.value.name,
          email: this.profileForm.value.email,
          phone: this.profileForm.value.phone,
          mobile: this.profileForm.value.mobile,
          gender: this.profileForm.value.gender,
          address: this.profileForm.value.address,
          id: this.userId,
        }
      }
      return fileTransfer.upload(this.capturedUrl, "https://veerankis.org/quickworker/api/customer", options)
        .then((data) => {
          this.utils.dismissLoading();
          let result = JSON.parse(data.response)
          if (result.status == "OK") {
            this.storage.set("user_name", this.profileForm.value.name)
            this.storage.set("user_phone", this.profileForm.value.phone)
            this.storage.set("user_email", this.profileForm.value.email)
            this.utils.presentAlert("Success", "Profile updated successfully.");
            this.getProfileData();
          } else {
            this.utils.presentAlert("Oops!", "Please try again.");
          }
        },
          (error) => {
            this.utils.dismissLoading();
            if (error.status == 401 || error.http_status == 401) {
              this.utils.presentAlert("Oops!", "Authentication failed.")
            } else if (error.status == 500 || error.http_status == 500) {
              this.utils.presentAlert("Oops!", "Internal server Error.")
            }
          })
    } else {
      this.profileForm.value.action = "update_profile";
      this.profileForm.value.id = this.userId;
      this.profileService.postProfile(this.profileForm.value).subscribe((result) => {
        this.utils.dismissLoading();
        if (result) {
          if (result.status == "OK") {
            this.storage.set("user_name", this.profileForm.value.name)
            this.storage.set("user_phone", this.profileForm.value.phone)
            this.storage.set("user_email", this.profileForm.value.email)
            this.storage.set("user_address", this.profileForm.value.address)
            this.utils.presentAlert("Success", result.msg)
            this.storage.get('new_user').then((new_user) => {
              if (new_user) {
                this.storage.remove('new_user');
                this.navCtrl.setRoot("BookServicePage");
              } else {
                this.getProfileData();
              }
            })
          } else {
            this.utils.dismissLoading();
            this.utils.presentAlert("Oops", result.error)
          }
        }
      },
        (error) => {
          this.utils.dismissLoading();
          if (error.status == 401 || error.http_status == 401) {
            this.utils.presentAlert("Oops!", "Authentication failed.")
          } else if (error.status == 500 || error.http_status == 500) {
            this.utils.presentAlert("Oops!", "Internal server Error.")
          }
        })
    }
  }


}
