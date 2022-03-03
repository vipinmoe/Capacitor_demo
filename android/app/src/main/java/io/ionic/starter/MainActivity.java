package io.ionic.starter;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.google.firebase.messaging.FirebaseMessaging;
import com.moengage.capacitor.MoECapacitorCorePlugin;
import com.moengage.firebase.MoEFireBaseHelper;

import timber.log.Timber;

public class MainActivity extends BridgeActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);    //register the MoEngage Capacitor Plugin
    registerPlugin(MoECapacitorCorePlugin.class);

    FirebaseMessaging.getInstance().getToken().addOnCompleteListener(task -> {

      if (!task.isSuccessful()) {
        Timber.e(task.getException());
        return;
      }

      String token = task.getResult();

      if(token!=null) {
        Timber.e("TOKEN: %s", token.toString());
        MoEFireBaseHelper.getInstance().passPushToken(this, token);

      } else{
        Timber.e("TOKEN is null");
      }

    });

  }

}
