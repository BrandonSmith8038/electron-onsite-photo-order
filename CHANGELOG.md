# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.1.1](https://github.com/BrandonSmith8038/electron-onsite-photo-order/compare/v2.1.0...v2.1.1) (2019-05-09)



# [2.1.0](https://github.com/BrandonSmith8038/electron-onsite-photo-order/compare/v2.0.0...v2.1.0) (2019-05-09)


### Features

* Added toast if payment option is not selected ([9fab959](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/9fab959))



# [2.0.0](https://github.com/BrandonSmith8038/electron-onsite-photo-order/compare/v1.2.0...v2.0.0) (2019-05-08)


### Bug Fixes

* Fixing inital database connection ([260d04b](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/260d04b))
* Only try to connect to the DB if there is an internet connection ([fe2624b](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/fe2624b))
* Open new order window on primary display ([b07442b](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/b07442b))


### Features

* Add Event Info to each order ([0351a8a](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/0351a8a))
* Added main event button ([5037288](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/5037288))
* Autocomplete working for name email and phone for the first 50 customers ([6237140](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/6237140))
* Change event button text on startup if there is currently an event in local storage ([b17de09](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/b17de09))
* Check if online or offline, display message accordingly ([bc5016e](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/bc5016e))
* Create event and save it to local storage ([1a57c6b](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/1a57c6b))
* End Event Functionality ([f02fd4b](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/f02fd4b))
* Fetch 1000 customers ([f7aad4a](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/f7aad4a))
* Fixed createSampleOrders not working, Created DB connection using mongoose ([e89baa5](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/e89baa5))
* Grab first 50 customers from api and create customers.json file ([9fac5d9](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/9fac5d9))
* Grab list of customers and seperate them into individual customer.....working on creating larg ([b7d83ef](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/b7d83ef))
* If Connected To The Internet Write New Order To DB ([100070a](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/100070a))
* Moved internet connection to its own module ([676539c](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/676539c))
* Open app on primary display ([decf0c5](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/decf0c5))
* Show and hide the new order button depending on if there is an event currently in local storag ([f137f12](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/f137f12))
* Stop writing each order to database, will bulk write orders when event ends instead ([b28c645](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/b28c645))
* Successful db write from development menu ([c770a73](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/c770a73))
* Working on grabbing customers api ([a841b82](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/a841b82))


### BREAKING CHANGES

* Does not currently work



# [1.2.0](https://github.com/BrandonSmith8038/electron-onsite-photo-order/compare/v1.0.2...v1.2.0) (2019-04-30)


### Bug Fixes

* Dev tools no longer show up by default in production ([c26f835](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/c26f835))


### Features

* Capitalized values for payment method options ([b113b65](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/b113b65))
* Made the first name, last name, photos and total fields required ([e049d07](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/e049d07))
* Marked the payment method select field as required. ([d493724](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/d493724))
* Menu Item To Open Orders Folder ([533d6dc](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/533d6dc))
* Only show the development menu when in development ([202249d](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/202249d))
* Pdfs are created in their own folder using customers name ([72a2fc5](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/72a2fc5))



# [1.1.0](https://github.com/BrandonSmith8038/electron-onsite-photo-order/compare/v1.0.2...v1.1.0) (2019-04-27)


### Features

* Made the first name, last name, photos and total fields required ([e049d07](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/e049d07))
* Menu Item To Open Orders Folder ([533d6dc](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/533d6dc))
* Pdfs are created in their own folder using customers name ([72a2fc5](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/72a2fc5))



## 1.0.2 (2019-04-26)

- Fix spelling error ([4bf9e9c](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/4bf9e9c))

## 1.0.1 (2019-04-26)

### Added

- Get Nightly Total Menu Functionality ([367fbb8](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/367fbb8))

### Changed

- Moved isDev() to utilities ([5fbea1](https://github.com/BrandonSmith8038/electron-onsite-photo-order/commit/5fbea1))
