import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {Router} from '@angular/router';

// import {DatePipe} from '@angular/common';
// import {WeightapdPipe} from '../pipes/weight/weight';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UtilsServiceProvider } from '../providers/utils-service/utils-service';
import { BookServiceProvider } from '../providers/book-service/book-service';
import { ProfileServiceProvider } from '../providers/profile-service/profile-service';
import { ServiceHistoryProvider } from '../providers/service-history/service-history';
import { PaymentServiceProvider } from '../providers/payment-service/payment-service';
import { NotificationServiceProvider } from '../providers/notification-service/notification-service';
import { ChatServiceProvider } from '../providers/chat-service/chat-service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { MediaCapture } from '@ionic-native/media-capture';
import { Media } from '@ionic-native/media';
import { FCM } from '@ionic-native/fcm';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ReviewServiceProvider } from '../providers/review-service/review-service';
import { NetworkServiceProvider } from '../providers/network-service/network-service';
import { Network } from '@ionic-native/network';
import { ServicecallsProvider } from '../providers/servicecalls/servicecalls';
import { PrinterDataProvider } from '../providers/printer-data/printer-data';
import { PrinterProvider } from '../providers/printer/printer';
// import { PrinterProvider } from '../providers/printer/printer';

@NgModule({
  declarations: [
    MyApp,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    
    // DatePipe
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    UtilsServiceProvider,
    BookServiceProvider,
    ProfileServiceProvider,
    ServiceHistoryProvider,
    PaymentServiceProvider,
    NotificationServiceProvider,
    ReviewServiceProvider,
    NetworkServiceProvider,
    ChatServiceProvider,
    Camera,
    BluetoothSerial,
    File,
    FileTransfer,
    MediaCapture,
    Media,
    FCM,
    UniqueDeviceID,
    StreamingMedia,
    Geolocation,
    NativeGeocoder,
    LaunchNavigator,
    // BluetoothSerial,
    Network,
    PhotoViewer,
    ServicecallsProvider,
    PrinterDataProvider,

    
  ]
})
export class AppModule {}
