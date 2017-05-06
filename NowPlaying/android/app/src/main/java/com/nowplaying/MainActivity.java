package com.nowplaying;

import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;


import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.ReactActivity;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.shell.MainReactPackage;
import com.xeodou.rctplayer.*;

public class MainActivity extends ReactActivity {
    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          mReactRootView = new ReactRootView(this);

          mReactInstanceManager = ReactInstanceManager.builder()
                  .setApplication(getApplication())
                  .setBundleAssetName("index.android.bundle")
                  .setJSMainModuleName("index.android")
                  .addPackage(new ReactPlayerManager())  // <------- here
                  .addPackage(new MainReactPackage())
                  .setUseDeveloperSupport(BuildConfig.DEBUG)
                  .setInitialLifecycleState(LifecycleState.RESUMED)
                  .build();

          mReactRootView.startReactApplication(mReactInstanceManager, "NowPlaying", null);

          setContentView(mReactRootView);
      }

}
