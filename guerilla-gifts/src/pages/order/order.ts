import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { InAppPurchase } from '@ionic-native/in-app-purchase';


@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  frequency: string;
  country = 'United States'
  countries = ['Afghanistan', 'Aland Islands', 'Albania', 'Alderney', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Ascension Island', 'Australia', 'Austria', 'Azerbaijan', 'Bahrain', 'Guernsey', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Virgin Islands (British)', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Caribbean Netherlands', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Cook Islands', 'Costa Rica', 'Cote D\'Ivoire', 'Croatia (local name: Hrvatska)', 'Cuba', 'Curacao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'French Guiana', 'Haiti', 'Honduras', 'Hong Kong,China', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Iran (Islamic Republic of)', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Lao People\'s Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau,China', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Negara Brunei Darussalam', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'North Korea', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Moldova', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Barthelemy', 'St. Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'St. Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten (Netherlands)', 'Slovakia (Slovak Republic)', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen Islands', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan,China', 'Tajikistan', 'Heard and Mc Donald Islands', 'Thailand', 'Bahamas', 'Congo, The Democratic Republic Of The', 'Congo, The Republic of Congo', 'Marshall Islands', 'Vatican City State (Holy See)', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Virgin Islands (U.S.)', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Tanzania', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Wallis And Futuna Islands', 'Western Sahara', 'Yemen', 'Zambia', 'Zanzibar', 'Zimbabwe', 'Other Country (please put in address fields above)'
      ]

  constructor(public navCtrl: NavController, public navParams: NavParams, private iap: InAppPurchase, public device: Device) {
  }

  async startPurchase() {
    let url = 'https://erraticpacket.com/api/startpurchase?';

    let params = {
      "freq": this.frequency,
      custom: 'foo'
    }

  }

  appBuy() {
    this.iap
	 .getProducts(['prod1', 'prod2'])
	 .then((products) => {
	   console.log(products);
	    //  [{ productId: 'com.yourapp.prod1', 'title': '...', description: '...', price: '...' }, ...]
	 })
	 .catch((err) => {
	   console.log(err);
	 });
  }

  async paypalBuy() {
    let url = 'https://www.paypal.com/cgi-bin/webscr?';

    

    let names = {
      '': 'One Random gift',
      'W': 'Weekly Random gifts',
      'M': 'Monthly Random gifts',
      'Y': 'Annual Random gifts'
    }

    let params = {
      "cmd": "_xclick-subscriptions",
      "business": "XRXZWAQWJ4RC4",
      "lc": "GB",
      "item_name": names[this.frequency],
      "no_note": "1",
      "no_shipping": "1",
      "rm": "1",
      "return": "https://erraticpacket.com/#done",
      "src": "1",
      "a3": "2.00",
      "p3": "1",
      "t3": this.frequency,
      "currency_code": "USD",
      custom: 'foo'
    }

    url += serialize(params);

    if (this.device.platform=='Android') {
      let nav: any = window.navigator;
      nav.app.loadUrl(url, { openExternal: true });
    } else {
      window.location.href=url;
    }
  }

}


function serialize(obj) {
  return (<any>Object).entries(obj).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
}

