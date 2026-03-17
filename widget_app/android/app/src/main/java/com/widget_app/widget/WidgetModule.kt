package com.widget_app   // MUST match your package name

import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Context
import android.content.Intent

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class WidgetModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "WidgetModule"
    }

    @ReactMethod
    fun setWidgetText(value: String) {

        // 1️⃣ Save value to SharedPreferences
        val prefs = reactContext.getSharedPreferences("widget", Context.MODE_PRIVATE)
        prefs.edit().putString("text", value).apply()

        // 2️⃣ Get all widget IDs
        val manager = AppWidgetManager.getInstance(reactContext)
        val ids = manager.getAppWidgetIds(
            ComponentName(reactContext, ClockWidgetProvider::class.java)
        )

        // 3️⃣ Send broadcast update with IDs
        val intent = Intent(reactContext, ClockWidgetProvider::class.java)
        intent.action = AppWidgetManager.ACTION_APPWIDGET_UPDATE
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids)

        reactContext.sendBroadcast(intent)
    }
}