var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BN-fM9rAWQevx1etv3RXuUiAEjzmI9mYAQr1exaxcY-s9gcUM8pJrNytizmXKYuNvNYjrMzFBeN1JnUwxljiDHs",
    "privateKey": "BveIqz_HKgS6hEjt2zYiZQ7LYGCBtHdQ_pFVnMnagYs"
};
 
 
webPush.setVapidDetails(
    'mailto:abideditiyaz@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/ebObe5SZCwQ:APA91bEKxTjriccSss1rTBVg2e03AgBH83GGR0q9FUVFhd-WbnZLtnHXw_5yY-d4FBTjjZslXhrbkqaun7scNcP4csKaWI8AdKd-XWSzy9zHLGE76pP3idQ62EbHfVTzqPSbOadr_K5_",
    "keys": {
        "p256dh": "BGufAiIGVOU6lQzRTqu5EBTD3gSdtxx3SFOi063kJRVaVmKD5H/XqL5UpH3P679H9/BnOqddx0yzh8tUdqu3GYU=",
        "auth": "gyKLu9lkfvkzfXhIQxTB3w=="
    }
};
var payload = 'Kalau ini muncul berarti ini berhasil!!';
var options = {
    gcmAPIKey: '377986068848',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);