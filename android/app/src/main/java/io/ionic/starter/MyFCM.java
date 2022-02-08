package io.ionic.starter;

import androidx.annotation.NonNull;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.moengage.firebase.MoEFireBaseHelper;
import com.moengage.pushbase.MoEPushHelper;

public class MyFCM extends FirebaseMessagingService {

  @Override
  public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
    super.onMessageReceived(remoteMessage);

    if (MoEPushHelper.getInstance().isFromMoEngagePlatform(remoteMessage.getData())) {
      MoEFireBaseHelper.Companion.getInstance().passPushPayload(getApplicationContext(), remoteMessage.getData());
    } else {
      // your app's business logic to show notification
    }

  }

  @Override
  public void onNewToken(@NonNull String s) {
    super.onNewToken(s);
    MoEFireBaseHelper.getInstance().passPushToken(getApplicationContext(), s);
  }
}
