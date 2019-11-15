import { gql } from 'apollo-boost';

const addUser = gql`
  mutation($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      id,
      username,
      email,
      token,
      picture,
      avatarColor
      isVerified
    }
  }
`;

const verifyEmail = gql`
  mutation($token: String!, $OTP: String!) {
    verifyEmail(token: $token, OTP: $OTP) {
      token,
      message
    }
  }
`;

const sendVerificationEmail = gql`
  query($email: String!) {
    sendVerificationEmail(email: $email) {
      message
    }
  }
`;

const decodeToken = gql`
  query($token: String) {
    decodeToken(token: $token) {
      id,
      username,
      email,
      role,
      socialId,
      picture,
      avatarColor,
      isVerified,
      createdAt,
      updatedAt,
    }
  }
`;

const forgotPassword = gql`
  query($email: String!) {
    forgotPassword(email: $email) {
      message
      token
    }
  }
`;

const verifyForgotPasswordRequest = gql`
  mutation($token: String!, $OTP: String!) {
    verifyForgotPasswordRequest(token: $token, OTP: $OTP) {
      message
    }
  }
`;

const resetPassword = gql`
  mutation($id: String!, $email: String!, $password: String!, $token: String!) {
    resetPassword(id: $id, email: $email, password: $password, token: $token) {
      message
      token
    }
  }
`;

const resendOTP = gql`
  mutation($token: String!) {
    resendOTP(token: $token) {
      message
    }
  }
`;

const editProfile = gql`
  mutation($username: String, $email: String, $picture: String) {
    editProfile(username: $username, email: $email, picture: $picture) {
      token
      message
      id
      username
      email
      picture
      avatarColor
    }
  }
`;

const removeProfilePicture = gql`
  mutation($token: String) {
    removeProfilePicture(token: $token) {
      token
      message
      id
      username
      email
      picture
      avatarColor
    }
  }
`;

const changePassword = gql`
  mutation($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      token
      message
    }
  }
`;

const loginUser = gql`
  mutation($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id,
      username,
      email,
      token
      picture,
      avatarColor
      isVerified
    }
  }
`;

const getBooks = gql`
  {
    books {
      name,
      authors,
      genre,
      year
    }
  }
`;

export {
  addUser, loginUser, getBooks, changePassword,
  verifyEmail, sendVerificationEmail, decodeToken,
  forgotPassword, resetPassword, editProfile,
  verifyForgotPasswordRequest, resendOTP, removeProfilePicture
};
