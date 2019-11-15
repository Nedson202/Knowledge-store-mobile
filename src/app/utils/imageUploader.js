import * as firebase from 'firebase';
import uuid from 'uuid/v1';

import { firebaseConfig, firebaseFolderName } from '../../../config';

const imageUploader = async (file) => {
  try {
    const uniqueId = uuid();
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const image = file.uri;

    const response = await fetch(image);
    const blob = await response.blob();
    const ref = firebase.storage().ref(firebaseFolderName).child(uniqueId);
    const uploadTask = ref.put(blob);

    // eslint-disable-next-line no-undef
    const uploadUrl = await new Promise(((resolve) => {
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        null,
        null,
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          resolve(downloadURL);
        }
      );
    }));

    return uploadUrl;
  } catch (error) {
    console.log(error);
  }
};

export default imageUploader;
