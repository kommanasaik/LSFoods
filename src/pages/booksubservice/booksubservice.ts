import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import * as Moment from 'moment';
import { Geolocation } from '@ionic-native/geolocation';
import {CartProvider} from '../../providers/cart/cart';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
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

/**
 * Generated class for the BooksubservicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booksubservice',
  templateUrl: 'booksubservice.html'
})
export class BooksubservicePage {
  subServiceid:any;

  @ViewChild('search_address') search_address: ElementRef;
  map: GoogleMap;
  marker: Marker
  location;
  locationDetails: Array<any> = [];
  customLocation;
  latitude;
  longitude;
  markerlatlong;
  defaultLocation:any;
  fromTime: any;
  toTime: any;
  minDate;
  minTime;
  selectedDate: any;
  subServiceName:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public utils: UtilsServiceProvider,
    private nativeGeocoder: NativeGeocoder,
    private geolocation: Geolocation,public plt: Platform
    ) {
      this.minDate = new Date().toISOString();
    this.subServiceid = this.navParams.data.subId;
    this.subServiceName = this.navParams.data.subName;
    // this.serviceId = this.navParams.get("serviceId")


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BooksubservicePage');
    this.loadMap();
    this.customLocation = "Hyderabad"
  }
  ngAfterViewInit() {
    this.plt.ready().then(() => {
      this.loadMap();
    });
  }
  validateTime() {
    if (this.fromTime > this.toTime) {
      document.getElementById("timeError").innerHTML = "From time must not greater than To time.";
      // this.utils.presentAlert("Oops!","From time must not greater than To time.");
    } else {
      document.getElementById("timeError").innerHTML = "";
    }
  }
 
  
  loadMap() {
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
    // this.getLocation();
  }

  onButton1_click() {
    this.utils.presentLoading();
    this.map.clear();
    Geocoder.geocode({
      "address": this.search_address.nativeElement.value
    }).then((results: GeocoderResult[]) => {
      this.utils.dismissLoading();
      this.getAddress(results[0].position.lat, results[0].position.lng)
      this.addMarker(results[0].position)

    });
  }
  onDateSelected() {
    this.fromTime = '';
    this.toTime = '';
    if (this.selectedDate == this.minDate.split('T')[0]) {
      this.minTime = Moment().format();
    } else {
      this.minTime = '00:00'
    }
  }
  /**
* add marker to map
* @return returns getting marker position
// */
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
}


  getAddress(lat, lng) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(lat, lng, options)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.defaultLocation = result[0].subLocality + "," + result[0].subAdministrativeArea + "," + result[0].locality + "," + result[0].postalCode + "," + result[0].countryName;
      })
      .catch((error: any) => console.log(error));
  }

  getCurrentLocation() {
    // this.map.clear();
    this.locationDetails = [];
    this.geolocation.getCurrentPosition().then((resp) => {
      let position = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      }
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
       this.getAddress(resp.coords.latitude, resp.coords.longitude)
       this.addMarker(position)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  backSubServicePage(){
    this.navCtrl.setRoot("AllsubservicesPage");
  }
  
  // submitDate(){
  //   this.navCtrl.setRoot("CartPage");

  // }
}
