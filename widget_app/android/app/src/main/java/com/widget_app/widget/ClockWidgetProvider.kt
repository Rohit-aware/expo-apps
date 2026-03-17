package com.widget_app

import android.appwidget.AppWidgetProvider
import android.appwidget.AppWidgetManager
import android.content.Context
import android.widget.RemoteViews
import java.text.SimpleDateFormat
import java.util.*
import android.content.Intent
import android.app.PendingIntent

class ClockWidgetProvider : AppWidgetProvider() {

   override fun onUpdate(
    context: Context,
    appWidgetManager: AppWidgetManager,
    appWidgetIds: IntArray
) {
    for (appWidgetId in appWidgetIds) {

        val views = RemoteViews(context.packageName, R.layout.clock_widget)
        val prefs = context.getSharedPreferences("widget", Context.MODE_PRIVATE)
        val customText = prefs.getString("text", "Hello")

        val intent = Intent(context, MainActivity::class.java)
        intent.putExtra("screen", "WidgetScreen")
        
        val pendingIntent = PendingIntent.getActivity(
            context,
            0,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            
        views.setTextViewText(R.id.widget_date, customText)
        views.setOnClickPendingIntent(R.id.widget_time, pendingIntent)

        appWidgetManager.updateAppWidget(appWidgetId, views)

        
    }
}
}