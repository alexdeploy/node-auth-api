# Documentation

## ERRORS

- `400`: Sign up: Username/Email already exists

- `401`: Login: User not found

## Session Attempts Limit

One essential security measure for an authentication API is to implement a "Session Attempts Limit" feature. This feature helps prevent brute-force attacks by limiting the number of login attempts a user can make within a specified time period. If the user exceeds the maximum allowed attempts, their account gets locked temporarily.

#### Steps to Implement Session Attempts Limit:

1. **Check if the account is locked**:

Before attempting to log in a user, the system needs to verify if the user's account is locked due to previous failed login attempts. This is done by checking the `accountLockedUntil` user variable. If it is not null and the lock expiration time has not passed, the account is considered locked, and further login attempts should not be allowed.

2. **Check maximum login attempts**:

To enforce the session attempts limit, you need to keep track of the number of failed login attempts for each user. When a login attempt fails, the system should increment the `logginAttempts` user variable in the user's model. If the maximum allowed attempts (e.g., 5) are reached, the account should be locked.

You can configure the max loggin attempts at `api.config.json` file.
````json
"logginAttempts": {
    "active": true, // Enable or disable function
    "max": 5, // Number of attempts
    "lockTime": 60 // Locktime in minutes
}
````

## Code Injection Prevention

In this project, various security measures have been implemented to prevent code injection and ensure system integrity. Below are the main measures applied for allowed character validation and email format validation:

### Allowed Character Validation

Allowed character validation is a fundamental part of ensuring that entered email addresses are secure and valid. To achieve this, the following precautions have been taken:

- Only alphanumeric characters (uppercase and lowercase letters, and numbers) are allowed.
- Specific symbols necessary for an email address, such as dot (.), hyphen (-), and underscore (_), are permitted.

Restricting the allowed characters prevents the possibility of introducing special characters or malicious sequences that could be exploited for code injection attacks.

### Rejection of Special Characters

In addition to allowed character validation, there is a filtering process to reject any special characters that could be used for malicious code injection. The following characters are rejected:

- Double and single quotes (") and (').
- Parentheses and other grouping characters.
- Escape characters and special sequences.

Rejecting these characters helps prevent potential injection attacks and avoids vulnerabilities related to improper data manipulation.

### Character Escaping

Another implemented security measure involves proper character escaping. There is a process of escaping characters that could have special meanings in certain contexts, such as those used in code or SQL injection attacks.

Through escaping, it ensures that characters are not interpreted as malicious commands or instructions, thereby protecting the system against potential vulnerabilities.

### Email Format Validation

In addition to character validation, the system checks the format of the entered email address. It verifies that the email address follows a valid structure, such as "user@domain.com".

This validation helps prevent input errors and ensures that invalid or malformed email addresses are not stored in the database.

By considering these security measures, the project is better equipped to resist code injection attacks and maintain data security and system integrity overall.
