import { Component, Input, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, Entry, FileEntry } from '@ionic-native/file';
import { ActionSheetController, NavController } from 'ionic-angular';
import { BookServiceProvider } from '../../providers/book-service/book-service';
import { CaptureVideoOptions, MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';
import { Media, MediaObject } from '@ionic-native/media';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'mediacomponent',
  templateUrl: 'mediacomponent.html'
})

/**
 * Manages all methods 
 */
export class MediacomponentComponent {

  /**
*  To initiate this component where ever we used in a template.
*  @param title bounded variable in that template
*/
  @Input() subServiceId: any;

  /**
* Value of the customerId
*/
  customerId;

  /**
* Value of the description
*/
  description;

  /**
* Value of the text
*/
  text: string;

  /**
* declaring hideAttachmentButtons
*/
  hideAttachmentButtons: boolean;

  /**
* Value of the text
*/
  audioText;

  /**
*  loads first when entering to the page 
*/
  constructor(
    public storage: Storage,
    public utils: UtilsServiceProvider,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private transfer: FileTransfer,
    private file: File,
    public bookService: BookServiceProvider,
    private mediaCapture: MediaCapture,
    private media: Media,
    private platform: Platform,
    public navCtrl: NavController,
    public statusBar: StatusBar,
  ) {
    this.previewUrl = '';
    this.text = '';
    this.audioText = '';
  }

  /**
*  Fired after loading constructor
*  getting user id from storage
*/
  ngOnInit() {
    this.hideAttachmentButtons = false;
    this.storage.get('user_id').then((id) => {
      this.customerId = id;
      this.capturedUrl = '';
      this.capturedVideo = '';
      this.capturedAudio = '';
    })
  }



  //----------- image functionality ----------------

  /**
* Value of the capturedUrl
*/
  capturedUrl: any;

  /**
* Value of the imageUrl
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
* to get image details form temp and to convert image to base64image
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
          this.hideAttachmentButtons = true;

        }
        reader.readAsDataURL(file);
      })
      setTimeout(() => { this.clickToShowImage(); }, 1000);
    }).catch((error) => {
      // console.log(error);
    })
  }

  /**
*  to open captuerd image instantly
*/
  clickToShowImage() {
  }


  //----------- Video functionality ----------------

  /**
* Value of the capturedVideo
*/
  capturedVideo: any;
  

  /**
* call ionic native media plugin to take capture video
* @returns returns captured video
*/
  captureVideo() {
    let options: CaptureVideoOptions = {
      limit: 1,
      duration: 10,
      quality: 20,
    };
    this.mediaCapture.captureVideo(options).then((data: MediaFile[]) => {
      this.capturedVideo = data[0]
      this.hideAttachmentButtons = true;
      this.text = 'Video Captured.';
    },
      (err: CaptureError) => console.error(err)
    );
  }

  //----------- Audio functionality ----------------

  /**
* declaring recording
*/
  recording: boolean = false;

  /**
* Value of the filePath
*/
  filePath: string;

  /**
* Value of the fileName
*/
  fileName: string;

  /**
* declaring fileMediaObject
*/
  fileMediaObject: MediaObject;

  /**
* Value of the fileName
*/
  capturedAudio: any;

  /**
* Value of the fileName
*/
  capturedAudioName: any;

  /**
* call ionic native media plugin to take start recording audio
* @returns returns start audio record 
*/
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

  /**
* call ionic native media plugin to take stop recording audio
* @returns returns recorded audio
*/
  stopRecord() {
    this.audioText = '';
    this.fileMediaObject.stopRecord();
    this.capturedAudio = this.filePath;
    this.capturedAudioName = this.fileName;
    this.recording = false;
    this.hideAttachmentButtons = true;
    this.text = 'Audio Captured';
  }

  /**
* hide unwanted options when entering description
* @returns returns hideAttachmentButtons value
*/
  checkDescription() {
    if (this.description) {
      this.hideAttachmentButtons = true;
    } else {
      this.hideAttachmentButtons = false;
    }
  }

  /**
* uploading file / description to server conditionally
* start loading when uploading 
* stop loading when getting response from server
* navigating to specific page after successfully submitted
* @returns returns success or failure message from server
*/
  startUploading() {
    this.text = '';
    this.utils.presentLoading();
    // console.log(this.capturedUrl)
    if (this.capturedUrl != '') {
      //----------- uploading image ----------------
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: 'attachment',
        httpMethod: 'POST',
        chunkedMode: false,
        fileName: this.imageName,
        mimeType: this.mimeType,
        headers: { 'Content-Length': 0 },
        params: {
          action: "new_job",
          id: this.customerId,
          services: this.subServiceId
        }
      }
      return fileTransfer.upload(this.capturedUrl, "https://veerankis.org/quickworker/api/customer", options)
        .then((data) => {
          this.utils.dismissLoading();
          let result = JSON.parse(data.response)
          if (result.status == "OK") {
            this.utils.presentAlert("Success", result.msg);
            this.navCtrl.setRoot("ScheduleJobPage", { job_id: result.id })
          } else {
            this.utils.presentAlert("Oops!", "Please try again.");
          }

        },

          (error) => {
            if (error.status == 401 || error.http_status == 401) {
              this.utils.presentAlert("Oops!", "Authentication failed.")
            } else if (error.status == 500 || error.http_status == 500) {
              this.utils.presentAlert("Oops!", "Internal server Error.")
            }

          })
    } else if (this.capturedVideo != '') {
      //----------- uploading video ----------------
      this.text = '';
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: 'attachment',
        chunkedMode: false,
        fileName: this.capturedVideo.name,
        mimeType: this.capturedVideo.type,
        httpMethod: 'POST',
        headers: { 'content-length': this.capturedVideo.size },
        params: {
          action: "new_job",
          id: this.customerId,
          services: this.subServiceId
        }
      }
      return fileTransfer.upload(this.capturedVideo.fullPath, "https://veerankis.org/quickworker/api/customer", options)
        .then((data) => {
          this.text = '';
          this.utils.dismissLoading();
          let result = JSON.parse(data.response)
          if (result.status == "OK") {
            this.utils.presentAlert("Success", result.msg);
            this.navCtrl.setRoot("ScheduleJobPage", { job_id: result.id })
          } else {
            this.utils.presentAlert("Oops", result.error);
          }

        });
    } else if (this.capturedAudio != '') {
      //----------- uploading audio ----------------

      const fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: 'attachment',
        fileName: this.capturedAudioName,
        chunkedMode: false,
        // mimeType: this.capturedVideo.type,
        httpMethod: 'POST',
        headers: {},
        params: {
          action: "new_job",
          id: this.customerId,
          services: this.subServiceId
        }
      }
      return fileTransfer.upload(this.capturedAudio, "https://veerankis.org/quickworker/api/customer", options)
        .then((data) => {
          let result = JSON.parse(data.response)
          if (result.status == "OK") {
            this.utils.dismissLoading();
            this.utils.presentAlert("Success", result.msg);
            this.navCtrl.setRoot("ScheduleJobPage", { job_id: result.id })
          } else {
            this.utils.presentAlert("Oops", result.error);
          }

        });
    }

    else {
      //----------- uploading text ----------------
      let attachmentObj = {
        action: "new_job",
        id: this.customerId,
        services: this.subServiceId,
        description: this.description
      }
      this.bookService.postServiceAttachment(attachmentObj).subscribe((result) => {
        this.utils.dismissLoading();
        if (result.status == "OK") {
          this.utils.presentAlert("Success", result.msg);
          this.navCtrl.setRoot("ScheduleJobPage", { job_id: result.id })
        } else {
          this.utils.presentAlert("Oops!", result.error);
        }
      })
    }
  }




}
