export const CONSTANTS = {
  ROLE: {
    ADMIN: 'ADMIN',
    USER: 'USER',
    MANAGER_USER: 'MANAGER_USER',
  },
  PERMISSION: {
    CSR_USER: 'CSR_USER',
  },
  KEYREDIS: {
    USER: 'numberLoginFail',
  },
  TOKEN_TYPE: {
    FREE: 'FREE',
    TYPE_50_MINUTES: '50-MINUTES',
    TYPE_200_MINUTES: '200-MINUTES',
    TYPE_500_MINUTES: '500-MINUTES',
  },
  STATUS: {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED',
    INVALID: 'INVALID',
    UNEXPIRED: 'UNEXPIRED',
    EXPIRED: 'EXPIRED',
  },
  TIME_TYPE: {
    DATE: 'date',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',
  },
  STATISTICS_TYPE: {
    TOKEN: 'token',
    USER: 'user',
    PROJECT: 'project',
    SHARED_PROJECT: 'sharedProject',
    SHARED_TOKEN: 'sharedToken',
    TOKEN_TYPE: 'tokenType',
    USER_TOKEN_TYPE: 'userTokenType',
  },
  BEARER_HEADER_AUTHORIZE: 'Bearer ',
  AUTH_JWT: 'jwt',
  AUTH_LOCAL: 'local',
  ASR_SERVICE: 'ASR_SERVICE',
  ONE_DAY_IN_MILLISECONDS: 86400000,

  // KAFKA TOPICS
  TOPICS: {
    // USER
    USER_CREATED_SUCCESS_EVENT: 'UserCreatedSuccessEvent',
    USER_CREATED_FAILED_EVENT: 'UserCreatedFailedEvent',
    EMAIL_VERIFIED_SUCCESS_EVENT: 'EmailVerifiedSuccessEvent',
    EMAIL_VERIFIED_FAILED_EVENT: 'EmailVerifiedFailedEvent',
    PASSWORD_CHANGED_SUCCESS_EVENT: 'PasswordChangedSuccessEvent',
    PASSWORD_CHANGED_FAILED_EVENT: 'PasswordChangedFailedEvent',
    USER_DELETED_SUCCESS_EVENT: 'UserDeletedSuccessEvent',
    USER_DELETED_FAILED_EVENT: 'UserDeletedFailedEvent',
    USER_UPDATED_SUCCESS_EVENT: 'UserUpdatedSuccessEvent',
    USER_UPDATED_FAILED_EVENT: 'UserUpdatedFailedEvent',
    VERIFY_EMAIL_SENT_SUCCESS_EVENT: 'VerifyEmailSentSuccessEvent',
    VERIFY_EMAIL_SENT_FAILED_EVENT: 'VerifyEmailSentFailedEvent',
    RESET_PASSWORD_EMAIL_SENT_SUCCESS_EVENT:
      'ResetPasswordEmailSentSuccessEvent',
    RESET_PASSWORD_EMAIL_SENT_FAILED_EVENT: 'ResetPasswordEmailSentFailedEvent',
    PASSWORD_RESET_SUCCESS_EVENT: 'PasswordResetSuccessEvent',
    PASSWORD_RESET_FAILED_EVENT: 'PasswordResetFailedEvent',
    // TOKEN
    FREE_TOKEN_CREATED_SUCCESS_EVENT: 'FreeTokenCreatedSuccessEvent',
    FREE_TOKEN_CREATED_FAILED_EVENT: 'FreeTokenCreatedFailedEvent',
    ORDERED_TOKEN_CREATED_SUCCESS_EVENT: 'OrderedTokenCreatedSuccessEvent',
    ORDERED_TOKEN_CREATED_FAILED_EVENT: 'OrderedTokenCreatedFailedEvent',
    TOKEN_CREATED_SUCCESS_EVENT: 'TokenCreatedSuccessEvent',
    TOKEN_CREATED_FAILED_EVENT: 'TokenCreatedFailedEvent',
    TOKEN_DELETED_SUCCESS_EVENT: 'TokenDeletedSuccessEvent',
    TOKEN_DELETED_FAILED_EVENT: 'TokenDeletedFailedEvent',
    TOKEN_DELETED_BY_USERID_SUCCESS_EVENT: 'TokenDeletedByUserIdSuccessEvent',
    TOKEN_DELETED_BY_USERID_FAILED_EVENT: 'TokenDeletedByUserIdFailedEvent',
    TOKEN_DELETED_BY_PROJECTID_SUCCESS_EVENT:
      'TokenDeletedByProjectIdSuccessEvent',
    TOKEN_DELETED_BY_PROJECTID_FAILED_EVENT:
      'TokenDeletedByProjectIdFailedEvent',
    TOKEN_UPDATED_SUCCESS_EVENT: 'TokenUpdatedSuccessEvent',
    TOKEN_UPDATED_FAILED_EVENT: 'TokenUpdatedFailedEvent',
    TOKEN_UPGRADED_SUCCESS_EVENT: 'TokenUpgradedSuccessEvent',
    TOKEN_UPGRADED_FAILED_EVENT: 'TokenUpgradedFailedEvent',
    // PROJECT
    PROJECT_CREATED_SUCCESS_EVENT: 'ProjectCreatedSuccessEvent',
    PROJECT_CREATED_FAILED_EVENT: 'ProjectCreatedFailedEvent',
    PROJECT_DELETED_SUCCESS_EVENT: 'ProjectDeletedSuccessEvent',
    PROJECT_DELETED_FAILED_EVENT: 'ProjectDeletedFailedEvent',
    PROJECT_DELETED_BY_USERID_SUCCESS_EVENT:
      'ProjectDeletedByUserIdSuccessEvent',
    PROJECT_DELETED_BY_USERID_FAILED_EVENT: 'ProjectDeletedByUserIdFailedEvent',
    PROJECT_UPDATED_SUCCESS_EVENT: 'ProjectUpdatedSuccessEvent',
    PROJECT_UPDATED_FAILED_EVENT: 'ProjectUpdatedFailedEvent',
    // REPORT
    REPORT_CREATED_SUCCESS_EVENT: 'ReportCreatedSuccessEvent',
    REPORT_CREATED_FAILED_EVENT: 'ReportCreatedFailedEvent',
    REPORT_DELETED_SUCCESS_EVENT: 'ReportDeletedSuccessEvent',
    REPORT_DELETED_FAILED_EVENT: 'ReportDeletedFailedEvent',
    REPORT_UPDATED_SUCCESS_EVENT: 'ReportUpdatedSuccessEvent',
    REPORT_UPDATED_FAILED_EVENT: 'ReportUpdatedFailedEvent',
    // PERMISSION
    PERMISSION_ASSIGN_EMAIL_SENT_SUCCESS_EVENT:
      'PermissionAssignEmailSentSuccessEvent',
    PERMISSION_ASSIGN_EMAIL_SENT_FAILED_EVENT:
      'PermissionAssignEmailSentFailedEvent',
    PERMISSION_ASSIGN_REPLIED_SUCCESS_EVENT:
      'PermissionAssignRepliedSuccessEvent',
    PERMISSION_ASSIGN_REPLIED_FAILED_EVENT:
      'PermissionAssignRepliedFailedEvent',
    PERMISSION_CREATED_SUCCESS_EVENT: 'PermissionCreatedSuccessEvent',
    PERMISSION_CREATED_FAILED_EVENT: 'PermissionCreatedFailedEvent',
    PERMISSION_DELETED_SUCCESS_EVENT: 'PermissionDeletedSuccessEvent',
    PERMISSION_DELETED_FAILED_EVENT: 'PermissionDeletedFailedEvent',
    PERMISSION_DELETED_BY_USERID_SUCCESS_EVENT:
      'PermissionDeletedByUserIdSuccessEvent',
    PERMISSION_DELETED_BY_USERID_FAILED_EVENT:
      'PermissionDeletedByUserIdFailedEvent',
    PERMISSION_DELETED_BY_PROJECTID_SUCCESS_EVENT:
      'PermissionDeletedByProjectIdSuccessEvent',
    PERMISSION_DELETED_BY_PROJECTID_FAILED_EVENT:
      'PermissionDeletedByProjectIdFailedEvent',
    PERMISSION_FOR_ASSIGNEE_DELETED_SUCCESS_EVENT:
      'PermissionForAssigneeDeletedSuccessEvent',
    PERMISSION_FOR_ASSIGNEE_DELETED_FAILED_EVENT:
      'PermissionForAssigneeDeletedFailedEvent',
    PERMISSION_UPDATED_SUCCESS_EVENT: 'PermissionUpdatedSuccessEvent',
    PERMISSION_UPDATED_FAILED_EVENT: 'PermissionUpdatedFailedEvent',
    PERMISSION_EXPIRATION_DATE_UPDATED_SUCCESS_EVENT:
      'PermissionExpirationDateUpdatedSuccessEvent',
    PERMISSION_EXPIRATION_DATE_UPDATED_FAILED_EVENT:
      'PermissionExpirationDateUpdatedFailedEvent',
    PERMISSION_ASSIGNEE_TOKENS_UPDATED_SUCCESS_EVENT:
      'PermissionAssigneeTokensUpdatedSuccessEvent',
    PERMISSION_ASSIGNEE_TOKENS_UPDATED_FAILED_EVENT:
      'PermissionAssigneeTokensUpdatedFailedEvent',
    // ORDER
    ORDER_CREATED_SUCCESS_EVENT: 'OrderCreatedSuccessEvent',
    ORDER_CREATED_FAILED_EVENT: 'OrderCreatedFailedEvent',
    ORDER_TO_UPGRADE_CREATED_SUCCESS_EVENT: 'OrderToUpgradeCreatedSuccessEvent',
    ORDER_TO_UPGRADE_CREATED_FAILED_EVENT: 'OrderToUpgradeCreatedFailedEvent',
    ORDER_DELETED_SUCCESS_EVENT: 'OrderDeletedSuccessEvent',
    ORDER_DELETED_FAILED_EVENT: 'OrderDeletedFailedEvent',
    ORDER_UPDATED_SUCCESS_EVENT: 'OrderUpdatedSuccessEvent',
    ORDER_UPDATED_FAILED_EVENT: 'OrderUpdatedFailedEvent',
    // REQUEST
    REQUEST_CREATED_SUCCESS_EVENT: 'RequestCreatedSuccessEvent',
    REQUEST_CREATED_FAILED_EVENT: 'RequestCreatedFailedEvent',
    REQUEST_UPDATED_SUCCESS_EVENT: 'RequestUpdatedSuccessEvent',
    REQUEST_UPDATED_FAILED_EVENT: 'RequestUpdatedFailedEvent',
    // MONITOR
    MONITOR_BEAT_SUCCESS_EVENT: 'MonitorBeatSuccessEvent',
    MONITOR_BEAT_FAILED_EVENT: 'MonitorBeatFailedEvent',
  },
  TASK: {
    REFRESH_TOKEN: 'REFRESH_TOKEN',
    REPORT_DATE: 'REPORT_DATE',
    REPORT_WEEK: 'REPORT_WEEK',
    REPORT_MONTH: 'REPORT_MONTH',
    REPORT_QUARTER: 'REPORT_QUARTER',
    REPORT_YEAR: 'REPORT_YEAR',
    TIMEOUT: 30000,
  },
  SORT_ORDER: {
    ASC: 'ASC',
    DESC: 'DESC',
  },
  TOKEN_EXPIRATION: {
    VERIFY_EMAIL: 1,
    REPLY_PERMISSION_ASSIGN: 2,
    RESET_PASSWORD: 1,
  },
  FREE_TOKEN: 'API key miễn phí',
  INIT_EXPECTED_VERSION: -1,
  STREAM_NAME: {
    MONITOR: '$ce-monitor',
    ORDER: '$ce-order',
    PERMISSION: '$ce-permission',
    PROJECT: '$ce-project',
    REPORT: '$ce-report',
    REQUEST: '$ce-request',
    TOKEN: '$ce-token',
    USER: '$ce-user',
    PRODUCT: '$ce-product',
    CATEGORY: '$ce-category',
  },
};
