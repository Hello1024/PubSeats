import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderPage } from '../order/order';
import { Device } from '@ionic-native/device';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@IonicPage({
  name: 'home',
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public device: Device, public geolocation: Geolocation) {
  }

  ionViewDidLoad(){
    try {
	    this.geolocation.getCurrentPosition().then((position) => this.loadMap(position) );
	} catch (e) {
	    this.loadMap({coords: {latitude: 51.50696, longitude: -0.126754}});
	}
  }

  loadMap(position){
    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addPoints();
  }

  addPoints() {
    let infoWindow = new google.maps.InfoWindow({
      content: ''
    });

    fetch('assets/data.js').then(res => res.json()).then((out) => out.forEach((location) => {
      let date = new Date();
      let busyness = location.populartimes[(date.getDay()+6)%7].data[date.getHours()];
      let icons = ['assets/imgs/pubicon.png', 'assets/imgs/pubicon_mid.png', 'assets/imgs/pubicon_full.png']

      if (busyness==0) return;

      let marker = new google.maps.Marker({
	    map: this.map,
	    animation: google.maps.Animation.DROP,
	    position: location.coordinates,
	    icon: 
	    { 
	      url: icons[Math.floor(busyness/34)],
	      scaledSize: new google.maps.Size(32, 32),
	    },
	  });

	  location.marker = marker;

      google.maps.event.addListener(marker, 'click', () => {
          let content = "<h4>"+location.name+"</h4>Tables in use: "+(busyness*2) + "%"; 
  	      if (busyness>50) content += " (standing room only)";
  	      if (location.rating)
  	        content += "<p><img src='assets/imgs/star.png' width=20> " + location.rating;

  	      content += "<p><a href='https://www.google.com/maps/search/?api=1&query=place_id:"+location.id+"'>Open Maps</a>"

          infoWindow.setContent(content);
	      infoWindow.open(this.map, marker);
      });
	  

	}));
  }

  
}
