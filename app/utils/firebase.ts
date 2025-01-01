import { initializeApp } from "firebase/app";
import {
  type Database,
  getDatabase,
  ref,
  set,
  push,
  get,
  onValue,
} from "firebase/database";
import { useEffect, useState } from "react";

export const googleStun = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    {
      urls: "turn:numb.viagenie.ca",
      credential: "muazkh",
      username: "webrtc@live.com",
    },
  ],
  iceCandidatePoolSize: 10,
};

export const useFirebaseConnection = () => {
  const [database, setDatabase] = useState<Database | null>(null);

  useEffect(() => {
    // TODO: Replace the following with your app's Firebase project configuration
    // See: https://firebase.google.com/docs/web/learn-more#config-object
    const firebaseConfig = {
      databaseURL: "https://scam-hound-default-rtdb.firebaseio.com/",
    };

    if (!firebaseConfig.databaseURL) {
      console.error("Missing Firebase configuration");
      return;
    }

    if (!database) {
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);

      // Initialize Realtime Database and get a reference to the service
      const database = getDatabase(app);

      setDatabase(database);
    }
  }, [database]);

  return { database };
};

export const useReadFirebaseData = <T>(
  database: Database | null,
  path: string
) => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (database) {
      const dbRef = ref(database, path);

      onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (val) {
          setData(val);
        }
      });
    }
  }, [database, path]);

  return data;
};

export const setData = <T>(
  database: Database | null,
  path: string,
  data: T
) => {
  if (!database) {
    console.error("Database not initialized");
    return;
  }

  const dbRef = ref(database, `${path}`);

  set(dbRef, data);
};

export const pushData = <T>(
  database: Database | null,
  path: string,
  data: T
) => {
  if (!database) {
    console.error("Database not initialized");
    return;
  }

  const dbRef = ref(database, path);

  return push(dbRef, data);
};

export const getData = async <T>(
  database: Database | null,
  path: string,
  callback: (data: T) => void
) => {
  if (!database) {
    console.error("Database not initialized");
    return;
  }

  const dbRef = ref(database, path);

  const snapshot = await get(dbRef);
  const val = snapshot.val();
  if (val) {
    callback(val);
  }
};
