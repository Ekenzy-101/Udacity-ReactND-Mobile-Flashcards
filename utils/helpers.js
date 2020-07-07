import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

const NOTIFICATION_KEY = "mobile-flashcards:notifications";
export const DECKS_STORAGE_KEY = "mobile-flashcards:decks";

export const getDecks = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) => {
    return JSON.parse(data);
  });
};

export const saveDeckTitle = (title) => {
  const data = {
    [title]: {
      questions: [],
      title: title,
    },
  };
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify(data),
    (err) => {
      alert(err);
    }
  )
    .then(() => AsyncStorage.getItem(DECKS_STORAGE_KEY))
    .then((result) => {
      return JSON.parse(result);
    });
};
export const saveCardToDeck = (action) => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((storage) => {
      const oldStorage = JSON.parse(storage);
      const newStorage = {
        ...oldStorage,
        [action.deckTitle]: {
          ...oldStorage[action.deckTitle],
          questions: oldStorage[action.deckTitle].questions.concat([
            action.question,
          ]),
        },
      };
      return newStorage;
    })
    .then((newStorage) => {
      AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        JSON.stringify(newStorage),
        (err) => {
          alert(err);
        }
      ).then((result) => {
        return JSON.parse(result);
      });
    });
};

export const setInitialData = (data) => {
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
};

function createNotification() {
  return {
    title: "Study Today!",
    body: "👋 don't forget to study today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          console.log(status);
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();
            let tomorrow = new Date();
            tomorrow.setSeconds(tomorrow.getSeconds() + 1);
            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day",
            });
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync()
  );
}
