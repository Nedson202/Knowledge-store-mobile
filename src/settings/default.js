// header title
export const HOME_HEADER_TITLE = 'Lorester Bookstore';
export const FORGOT_PASSWORD_TITLE = 'Forgot Password?';
export const LOGIN_TITLE = 'Log In';
export const SIGNUP_TITLE = 'Sign Up';
export const OTP_TITLE = 'Verify OTP';
export const RESULT_TITLE = 'Results';
export const DETAILS_TITLE = 'Details';
export const RESET_PASSWORD_TITLE = 'Reset Password';

// route name
export const INITIAL_ROUTE_NAME = 'Books';
export const FORGOT_PASSWORD_ROUTE = 'ForgotPassword';
export const LOGIN_ROUTE = 'Login';
export const SIGNUP_ROUTE = 'Signup';
export const DETAILS_ROUTE = 'BookDetails';
export const SEARCH_RESULT_ROUTE = 'SearchResult';
export const VERIFY_OTP_ROUTE = 'VerifyOTP';
export const USER_DASHBOARD_ROUTE = 'UserDashboard';
export const RESET_PASSWORD_ROUTE = 'ResetPassword';

// params
export const BOOK_ID_PARAM = 'bookID';
export const BOOK_LIST_PARAM = 'bookList';
export const GENRE_PARAM = 'genre';

// storage key
export const HISTORY_KEY = 'SearchHistory';

export const georgia = 'Georgia';
export const GEORGIA_BOLD = 'Georgia Bold';

// devices
export const ios = 'ios';
export const android = 'android';

// form
export const EMAIL_LABEL = 'Email';
export const PASSWORD_LABEL = 'Password';
export const USERNAME_LABEL = 'Username';
export const REVIEW_LABEL = 'Leave a review';
export const OLD_PASSWORD_LABEL = 'Old Password';
export const NEW_PASSWORD_LABEL = 'New Password';
export const CONFIRM_PASSWORD_LABEL = 'Confirm New Password';
export const CHANGE_PASSWORD_LABEL = 'Change Password';
export const OUTLINE_TYPE = 'outline';
export const CLEAR_TYPE = 'clear';
export const OTP_BUTTON_TITLE = 'Verify & Proceed';
export const RESET_OTP_TITLE = 'Request Reset OTP';
export const RESEND_OTP_TITLE = 'Resend OTP';
export const CHANGE_PHOTO_LABEL = 'Change Photo';
export const REMOVE_PHOTO_LABEL = 'Remove Photo';
export const REMOVE_TITLE = 'Remove';
export const CANCEL_TITLE = 'Cancel';
export const SAVE_PROFILE = 'Save Profile';

export const PADDING = 'padding';
export const NEXT_TYPE = 'next';
export const PHONE_PAD = 'numeric';
export const TELEPHONE = 'telephoneNumber';
export const PHONE_TYPE = 'phoneNumber';

// onchange label
export const EMAIL_TYPE = 'email';
export const USERNAME_TYPE = 'username';
export const PASSWORD_TYPE = 'password';

export const CONTAIN = 'contain';
export const COVER = 'cover';
export const STRETCH = 'stretch';

export const CLOSE = 'close';
export const NO_AUTHOR = 'No author specified';
export const NO_DESCRIPTION = 'No Description Available';
export const SEARCH_DEBOUNCE_TIME = 1000;
export const VALIDATION_DEBOUNCE_TIME = 500;
export const TOKEN_LABEL = 'AuthToken';
export const NONE = 'none';

export const PROFILE_TAB_ROUTES = [
  { key: 'books', title: 'My Books' },
  { key: 'favorite', title: 'Favorites' },
  { key: 'editProfile', title: 'Edit Profile' },
];

export const TAB_BAR_ROUTES = {
  books: {
    route: 'Books',
    icon: 'book',
  },
  search: {
    route: 'Search',
    icon: 'search',
  },
  profile: {
    route: 'Profile',
    icon: 'person',
  },
  settings: {
    route: 'Settings',
    icon: 'settings',
  },
};
export const SEARCH_PLACEHOLDER = 'Search Genre, Author, Title...';
export const VALIDATION_RULES = {
  username: 'required|min:2|max:30',
  email: 'required|email|min:5|max:30',
  password: 'required|min:6|max:30',
};

export const INACTIVE_TINT_COLOR = '#545454e0';

// fetch policy
export const NETWORK_ONLY = 'network-only';

// social auth
export const CONTINUE_WITH_FACEBOOK = 'Continue With Facebook';
export const CONTINUE_WITH_GOOGLE = 'Continue With Google';
export const CONTINUE_WITH_EMAIL = 'Sign Up With Email';

export const REMOVE_FAVORITES_LABEL = 'Remove from Favorites';
export const ADD_FAVORITES = 'Add to Favorites';

export const transparent = 'transparent';

export const PERMISSION_DENIED = 'Sorry, we need camera roll permissions to make this work!';
export const PERMISSION_GRANTED = 'granted';

export const PRODUCTION = 'production';

export const ADD_REPLY = 'addReply';
export const REPLY = 'addReply';
export const ADD_REVIEW = 'addReview';
export const EDIT_REVIEW = 'editReview';
export const LEAVE_REVIEW_LABEL = 'Leave a review';

export const GOOGLE = 'google';
export const FACEBOOK = 'facebook';
