package io.ionic.starter;

import android.app.Application;

import com.moengage.capacitor.MoEInitializer;
import com.moengage.core.LogLevel;
import com.moengage.core.MoEngage;
import com.moengage.core.config.FcmConfig;
import com.moengage.core.config.LogConfig;
import com.moengage.core.config.NotificationConfig;

public class MyApplication extends Application {

  @Override
  public void onCreate() {
    super.onCreate();

    MoEngage.Builder moEngage =
      new MoEngage.Builder(this, "KIO6QOE5L2E90ZQMCGNZTVRK")
        .configureNotificationMetaData(new NotificationConfig(
          R.drawable.ic_noti,
          R.drawable.download,
          -1,
          "tone",
          true,
          false,
          true
        ))
        .configureLogs(new LogConfig(LogLevel.VERBOSE, true))
        .configureFcm(new FcmConfig(false));

    MoEInitializer.INSTANCE.initialize(this, moEngage);
  }
}
