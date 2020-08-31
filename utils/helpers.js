import { AsyncStorage } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'FlashCardApp:notifications';

//generates id using the deck input
export function generateID(id) {
  return id
    .trim()
    .split(' ')
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join('');
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(
          async ({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(8);
              tomorrow.setMinutes(0);
              //To test Notification
              //tomorrow.setSeconds(tomorrow.getSeconds() + 5);
              Notifications.scheduleNotificationAsync({
                content: {
                  title: "Let's practice some flash cards today",
                  body: "👋 You didn't practice any flashcards today",
                },
                trigger: { seconds: (tomorrow.getTime() - Date.now()) / 1000 },
              });
              Notifications.setNotificationHandler({
                handleNotification: async () => ({
                  shouldShowAlert: true,
                  shouldPlaySound: true,
                  shouldSetBadge: true,
                }),
              });

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            } else {
            }
          }
        );
      }
    });
}
