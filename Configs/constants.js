const moment = require("moment-timezone");

//GLOBAL STATUS
exports.STATUS_CODES = {
  // 1XX INFORMATIONAL
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  PROCESSING: 102,
  EARLY_HINTS: 103,

  // 2XX SUCCESS
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  MULTI_STATUS: 207,
  ALREADY_REPORTED: 208,
  IM_USED: 226,

  // 3XX REDIRECTION
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  USE_PROXY: 305,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,

  // 4XX CLIENT ERROR
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  UN_PROCESSABLE_ENTITY: 422,
  VALIDATION_ERROR: 422,
  NOT_VALID_DATA: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  UNORDERED_COLLECTION: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,

  // 5XX SERVER ERROR
  SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  BANDWIDTH_LIMIT_EXCEEDED: 509,
  NOT_EXTENDED: 510,
  NETWORK_AUTHENTICATION_REQUIRED: 511,
  BRIANTREE_REFUND_ISSUE: 512,
};

//GLOBAL MESSAGES
exports.STATUS_MESSAGES = {
  SERVER_ERROR: "Internal server error! Please try again.",
  VERIFICATION_EMAIL_SENT:
    "We have sent you an verification email to your account",
  EMAIL_VERIFIED: "Your account has been verified successfully.",
  EMAIL_VERIFIED_ALREADY: "Your account is already verified.",
  REGISTER_SUCCESS: "You have successfully signed up.",
  LOGIN_SUCCESS: "You have successfully logged in.",
  RESET_PASSWORD_ALREADY:
    "You already have reset the password with this token.",
  VALIDATION: {
    VALID: {
      IMAGE_FILE_TYPE: "Only support jpeg,jpg,png,gif image types",
    },
    REQUIRED: {
      TABLE: "Please enter table name",
      STATUS: "Please enter valid status",
      ID: "Please enter id",
      EXHIBITION: {
        TITLE: "Please enter title.",
        START_DATE: "Please enter start date.",
        IMAGE: "Please enter image.",
        END_DATE: "Please enter end date."
      }
    },
  },
  EXHIBITION: {
    EXHIBITION_ADD: "Your exhibition has been added successfully.",
    EXHIBITION_UPDATE: "Your exhibition has been updated successfully.",
    EXHIBITION_DELETE: "Your exhibition has been deleted successfully.",
    EXHIBITION_GET: "exhibition has been loaded successfully",
  },
  NOT_FOUND: {
    EXHIBITION: "exhibition is not available in our system!",
  },
  TOKEN: {
    INVALID: "Your token is not valid.",
    EXPIRED: "Your token has been expired.",
    LOGOUT: "You have been successfully logged out.",
  },
};

// File Path
exports.PATHS = {
  IMAGES: {
    ORIGINAL: "/Original",
    THUMB: "/Thumb",
    TEMP: "/Temp",
  },
};

exports.SUPPORTED_FORMAT = [
  "video/x-matroska",
  "video/x-msvideo",
  "video/webm",
  "video/mp4",
  "video/quicktime",
  "application/octet-stream",
];

// Generic Status
exports.STATUS = {
  INACTIVE: 0,
  ACTIVE: 1,
  DELETED: 2,
  APPROVE: 3,
  REJECTED: 4,
  COMPLETED: 5,
};

// Devices Type
exports.DEVICE_TYPES = {
  IOS: "IOS",
  ANDROID: "ANDROID",
  WEB: "WEB",
};
