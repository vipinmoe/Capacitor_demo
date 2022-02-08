import { Component } from '@angular/core';
import { DataService, Message } from '../services/data.service';

import {
  MoECapacitorCore, MoEInAppLifecycleData, MoEInAppNavigationData, MoEInAppCustomActionData, MoEProperties,
  MoEUserGender, MoEAppStatus, MoEPushTokenData, MoEPushCampaignData, MoEInAppSelfHandledCampaignData
} from 'capacitor-moengage-core'
//import { MoECapacitorGeofence } from 'capacitor-moengage-geofence';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tag: string = "AngularSampleApp_HomePage";

  constructor(private data: DataService) {}

  ngOnInit() {
    console.log(this.tag + " in ngOnInit() : will add listeners");

    MoECapacitorCore.addListener("pushTokenGenerated", (data: MoEPushTokenData) => {
      console.log(this.tag + " Received callback 'pushTokenGenerated',  data: " + JSON.stringify(data))
    });
    MoECapacitorCore.addListener("pushClicked", (data: MoEPushCampaignData) => {
      console.log(this.tag + " Received callback 'pushClicked',  data: " + JSON.stringify(data))
    });

    MoECapacitorCore.addListener("inAppCampaignShown", (data: MoEInAppLifecycleData) => {
      console.log(this.tag + " Received callback 'inAppCampaignShown',  data: " + JSON.stringify(data))
    });

    MoECapacitorCore.addListener("inAppCampaignDismissed", (data: MoEInAppLifecycleData) => {
      console.log(this.tag + " Received callback 'inAppCampaignDismissed',  data: " + JSON.stringify(data))
    });

    MoECapacitorCore.addListener("inAppCampaignClicked", (data: MoEInAppNavigationData) => {
      console.log(this.tag + " Received callback 'inAppCampaignClicked',  data: " + JSON.stringify(data))
    });

    MoECapacitorCore.addListener("inAppCampaignCustomAction", (data: MoEInAppCustomActionData) => {
      console.log(this.tag + " Received callback 'inAppCampaignCustomAction',  data: " + JSON.stringify(data))
    });

    MoECapacitorCore.addListener("inAppCampaignSelfHandled", (data: MoEInAppSelfHandledCampaignData) => {
      console.log(this.tag + " Received callback 'inAppCampaignSelfHandled',  data: " + JSON.stringify(data))

      MoECapacitorCore.selfHandledShown(data)
      MoECapacitorCore.selfHandledPrimaryClicked(data)
      MoECapacitorCore.selfHandledClicked(data)
      MoECapacitorCore.selfHandledDismissed(data)
    });

    MoECapacitorCore.initialize();

    MoECapacitorCore.setAppStatus({ appStatus: MoEAppStatus.INSTALL });

  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  selectedItem?: Message;
  onSelect(item: Message): void {
    this.selectedItem = item;
    console.log("selected item : " + item.fromName);
    switch (item.fromName) {
    case "Track user attribute":
      MoECapacitorCore.setUniqueId({ uniqueId: "000123" });
      MoECapacitorCore.setUserName({ userName: "Vicky7230" });
      MoECapacitorCore.setFirstName({ firstName: "Vipin" });
      MoECapacitorCore.setLastName({ lastName: "Kumar" });
      MoECapacitorCore.setEmailId({ emailId: "vicky7230@gmail.com" });
      MoECapacitorCore.setMobileNumber({ mobileNumber: "7358513024" });
      MoECapacitorCore.setGender({ gender: MoEUserGender.MALE });
      MoECapacitorCore.setBirthDate({ birthdate: "1970-01-01T12:00:00Z" });
      MoECapacitorCore.setUserLocation({ location: { latitude: 25.23, longitude: 73.23 } });
      MoECapacitorCore.setUserAttributeLocation({ name: "default location attribute", location: { latitude: 25.23, longitude: 73.23 } });
      MoECapacitorCore.setUserAttributeDate({ name: "LastPurchaseDate", value: "1970-01-01T12:00:00Z" });
      break;

    case "Track event":
      console.log(this.tag + " trackInteractiveEvent() :: ");
      const prop: MoEProperties = {
        generalAttributes: [
          { name: "GA1", value: "GV1" },
          { name: "GA2", value: 123 },
          { name: "GA3", value: true }
        ],
        dateTimeAttributes: [
          { name: "DTA1", value: "2018-10-05T14:48:00.000Z" },
          { name: "DTA2", value: "2021-10-05T14:48:00.000Z" },
          { name: "DTA3", value: "2022-01-01T14:48:00.000Z" }
        ],
        locationAttributes: [
          { name: "LA1", value: { latitude: 15.123, longitude: 10.002 } },
          { name: "LA2", value: { latitude: 12.123, longitude: 13.002 } }
        ],
        isNonInteractive: false
      };
      MoECapacitorCore.trackEvent({ eventName: "trackInteractiveEvent", eventAttributes: prop });
      break;  
    }

  }

}
