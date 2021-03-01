import { Component,ViewChild,Input } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { BookServiceProvider } from '../../providers/book-service/book-service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, Entry, FileEntry } from '@ionic-native/file';

/**
 * Generated class for the AllservicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allservices',
  templateUrl: 'allservices.html',
})
export class AllservicesPage {
  @Input() options: any;
 
  signup={
    state:0
  }
 
  statelist:any;

  ProdcutName: any;
  Description: any;
  Price: any;
  ResponseLoginData: any;
  productForm;
  registerObj: any;
  UserInfo: any;
  data:any;
  prodid:any;
  UserData:any;
  updtype:any;
  headerTitle:string;
  capturedSnapURL:any;
  capturedUrl: any;

  imageUrl;
 mimeType: any = " ";

 imageName: any = " ";
 previewUrl: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public bookService: BookServiceProvider, private fb: FormBuilder,
    public actionSheetController: ActionSheetController,
    private file: File,

    private camera: Camera,
    public utils: UtilsServiceProvider
    
    ) {
    this.headerTitle = "Create Items";

    this.initializeItems();

  }

  ionViewDidLoad() {

  }
  getCatagories() {
    // this.utils.presentLoading();
    this.bookService.getCatagories().subscribe((Response) => {
      this.statelist=Response;
    });
  }
  
  initializeItems() {
    this.getCatagories();
    this.RegisterValidation();
   

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
  openGallery() {
  
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
          let base64Image = this.previewUrl;
          this.capturedSnapURL = base64Image;
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

  RegisterValidation() {
    this.productForm = this.fb.group({
      City: ['', Validators.required],
      ProductName: ['', Validators.required],
      Weights: ['', Validators.required],
      Description: ['', Validators.required],
      Price: ['', Validators.required],
      Code: ['', Validators.required],
      catid: ['', Validators.required]


    });
  }
  onProductSubmit() {
    this.registerObj = {
      City:'',
      ProductName: '',
      Description: '',
      Price: '',
      ImageData: '',
      Weights:'',
      Code:'',
      catid:''
    }
    let ProductData = {
      ProductName: this.productForm.value.ProductName,
      Description: this.productForm.value.Description,
      Price: this.productForm.value.Price,
     Quantity:this.productForm.value.City,
     Units:this.productForm.value.Weights,
     ProductCode:this.productForm.value.Code,
     Type:this.productForm.value.catid,
      ImageByteArray1:this.capturedSnapURL


    }
    
    if (ProductData.ProductName != "") {
      console.log(this.ProdcutName);
      this.bookService.AddProducts(ProductData).subscribe((Response) => {
        console.log(Response);
        if (Response.ErrorCode > 0) {
          this.navCtrl.setRoot("ReviewsPage");
          
        }
        else {
          this.utils.presentAlert("Oops", "Please enter details");


        }
      });
    }
    else {
      this.utils.presentAlert("Oops", "Please enter details");

    }
  }
}

