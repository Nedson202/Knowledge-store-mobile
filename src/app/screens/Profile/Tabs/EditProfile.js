/* eslint-disable no-undef */
import React, { useEffect, useState, } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import debounce from 'lodash.debounce';

import EditProfileForm from './EditProfileForm';
import { profileStyles } from '../../../styles';
import {
  VALIDATION_DEBOUNCE_TIME, CLEAR_TYPE, OUTLINE_TYPE, CANCEL_TITLE,
  REMOVE_TITLE, PERMISSION_DENIED, PERMISSION_GRANTED, BLACK_4
} from '../../../settings';
import {
  handleSingleFieldValidation, allFieldsValidation, setTokenToStorage,
  getTokenFromStorage, imageUploader
} from '../../../utils';
import { setCurrentUser } from '../../../redux/actions/userActions';

import { editProfile, removeProfilePicture, clientHandler } from '../../../graphql';
import UserImageUpload from '../../../components/ImageUpload/UserImageUpload';
import AppModal from '../../../components/Modal';
import CustomText from '../../../components/common/CustomText';



import useAuthSelector from '../../../components/CustomHooks/useAuthSelector';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user: { username, email }, user = {} } = useAuthSelector();
  const [loading, setLoading] = useState(false);
  let [disabled, setDisabled] = useState(true);
  const [values, setValues] = useState({
    username,
    email,
  });
  const [formErrors, setFormErrors] = useState({});
  const [image, setImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [removingPicture, setRemovingPicture] = useState(false);
  const [uploadingPicture, setUploadingPicture] = useState(false);
  const [cameraPermissionStatus, setPermissionStatus] = useState(false);

  const debounceSingleFieldValidation = debounce(({ name, value }) => {
    const { isValid, formErrors: newFormErrors } = handleSingleFieldValidation(
      formErrors, { name, value }
    );

    const formValues = {
      ...values,
      [name]: value,
    };
    let isFormDisabled = didFieldValueChange(formValues);

    if (!isValid) {
      isFormDisabled = true;
    }

    setFormErrors({ ...formErrors, ...newFormErrors });
    setDisabled(isFormDisabled);
  }, VALIDATION_DEBOUNCE_TIME);

  useEffect(() => {
    getPermissionAsync();
  }, [values, disabled, loading, image]);

  const getPermissionAsync = async () => {
    if (!Constants.platform.ios) {
      return;
    }

    const {
      status: cameraRollStatus
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const permissionStatus = cameraRollStatus === PERMISSION_GRANTED;

    if (!permissionStatus) {
      alert(PERMISSION_DENIED);
    }

    setPermissionStatus(permissionStatus);
  };

  const pickImage = async () => {
    if (!cameraPermissionStatus) {
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      return;
    }

    setImage(result);
    setUploadingPicture(true);
    const imageUrl = await imageUploader(result);

    if (imageUrl) {
      disabled = false;
      values.picture = imageUrl;
      setValues(values);
      setDisabled(disabled);

      await handleFormSubmit();
    }

    setUploadingPicture(false);
  };

  const onTextChange = ({ name, value }) => {
    const newValues = { ...values };
    const trimmedValue = value.trim();
    newValues[name] = trimmedValue;

    setValues(newValues);
    debounceSingleFieldValidation({ name, value: trimmedValue });
  };

  const didFieldValueChange = (formValues) => {
    let isFormDisabled = disabled;
    const defaultValues = new Set([username, email]);
    const currentValues = new Set(Object.values(formValues));
    const intersection = [...new Set(
      [...defaultValues].filter(defaultValue => currentValues.has(defaultValue)))
    ];

    if (intersection.length !== 2) {
      isFormDisabled = false;
    } else {
      isFormDisabled = true;
    }

    return isFormDisabled;
  };

  const handleFormSubmit = async () => {
    if (disabled) {
      return;
    }

    setLoading(true);
    const { isValid, errors } = allFieldsValidation(values, ['password']);

    if (!isValid) {
      setFormErrors(errors);
      setLoading(false);

      return;
    }

    try {
      const client = await clientHandler();
      const editProfileHandler = await client.mutate({
        mutation: editProfile,
        variables: {
          ...values
        }
      });

      setLoading(false);
      setDisabled(true);
      const {
        data: { editProfile: { token } = {}, editProfile: payload } = {}
      } = editProfileHandler;

      if (token) {
        await setTokenToStorage(token);
        dispatch(setCurrentUser(payload));
      }
    } catch (error) {
      setLoading(false);
      setDisabled(true);
      console.error(error);
    }
  };

  const toggleRemovePhotoModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const deleteProfiilePicture = async () => {
    setRemovingPicture(true);

    const client = await clientHandler();
    const token = await getTokenFromStorage();

    try {
      const removeProfilePictureHandler = await client.mutate({
        mutation: removeProfilePicture,
        variables: {
          token: `Bearer ${token}`,
        }
      });

      setRemovingPicture(false);
      const {
        data: {
          removeProfilePicture: { token: newToken } = {},
          removeProfilePicture: payload
        } = {}
      } = removeProfilePictureHandler;

      if (newToken) {
        await setTokenToStorage(newToken);
        dispatch(setCurrentUser(payload));
        toggleRemovePhotoModal();
      }
    } catch (error) {
      setRemovingPicture(false);
      console.error(error);
    }
  };

  const renderRemovePhotoModal = () => {
    return (
      <AppModal
        modalVisible={isModalVisible}
        toggleModal={toggleRemovePhotoModal}
        customStyles={{ borderWidth: 1, borderRadius: 10, }}
      >
        <View>
          <CustomText style={{ fontSize: 20, padding: 20, textAlign: 'center', }}>
            Continue with photo removal
          </CustomText>
          <View style={{
            flexDirection: 'row', justifyContent: 'flex-end',
            marginTop: 15, marginBottom: 10, marginRight: 15,
          }}>
            <Button
              title={CANCEL_TITLE}
              type={CLEAR_TYPE}
              titleStyle={profileStyles.photoButtonTitle}
              buttonStyle={{ borderColor: BLACK_4 }}
              onPress={toggleRemovePhotoModal}
            />
            <Button
              title={REMOVE_TITLE}
              titleStyle={profileStyles.photoButtonTitle}
              type={OUTLINE_TYPE}
              buttonStyle={{ marginLeft: 10, borderColor: BLACK_4 }}
              loading={removingPicture}
              disabled={removingPicture}
              onPress={deleteProfiilePicture}
            />
          </View>
        </View>
      </AppModal>
    );
  };

  return (
    <ScrollView style={profileStyles.editProfile}>
      <UserImageUpload
        image={image}
        pickImage={pickImage}
        user={user}
        toggleRemovePhotoModal={toggleRemovePhotoModal}
        uploadingPicture={uploadingPicture}
      />
      <EditProfileForm
        values={values}
        loading={loading}
        formErrors={formErrors}
        textChangeHandler={onTextChange}
        handleFormSubmit={handleFormSubmit}
        disabled={disabled}
        toggleRemovePhotoModal={toggleRemovePhotoModal}
      />
      {renderRemovePhotoModal()}
    </ScrollView>
  );
};

export default EditProfile;
