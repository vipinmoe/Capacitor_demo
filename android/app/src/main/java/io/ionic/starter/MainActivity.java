package io.ionic.starter;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.moengage.capacitor.MoECapacitorCorePlugin;

public class MainActivity extends BridgeActivity {

  @Override protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);    //register the MoEngage Capacitor Plugin
    registerPlugin(MoECapacitorCorePlugin.class);
  }

}
