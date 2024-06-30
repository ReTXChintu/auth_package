# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.1.3](https://github.com/ReTXChintu/auth_package/compare/v1.1.2...v1.1.3) (2024-06-30)

### [1.1.3](https://github.com/ReTXChintu/auth_package/compare/v1.1.2...v1.1.3) (2024-05-26)

## [1.1.3] - 2024-05-26
### Fixed
- Bug fixes for logging errors to the console
- Bug fixes for cookie settings

### [1.1.2](https://github.com/ReTXChintu/auth_package/compare/v1.1.1...v1.1.2) (2024-05-25)

## [1.1.2] - 2024-05-25
### Fixed
- Fixed issue with login

### [1.1.1](https://github.com/ReTXChintu/auth_package/compare/v1.1.0...v1.1.1) (2024-05-25)

## [1.1.1] - 2024-05-25
### Changed
- Added timeStamps to userSchema

## [1.1.0](https://github.com/ReTXChintu/auth_package/compare/v1.0.4...v1.1.0) (2024-05-25)
### Fixed
- Fixed issue with jwt.sign()

### Changed
- Used [api_response_formatter](https://www.npmjs.com/package/api_response_formatter) package for sending responses

### Added 
- Added middleware for authenticating JWT
- Exported UserSchema as User

## [1.0.4] - 2024-05-25
### Fixed
- Fixed issue with routes
- Fixed issue with signup

### Removed
- Removed useUnifiedTopology option from database connection

## [1.0.1] - 2024-05-24
### Changed
- Improved password hashing method in the `pre('save')` hook.
- Added detailed comments and documentation in the code.

## [1.0.0] - 2024-05-24
### Added
- Initial release with dynamic user schema configuration.
- User signup and login functionality.
- Password hashing using bcrypt.
- JWT authentication for secure user sessions.
