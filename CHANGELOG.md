# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [8.1.0] 2023-12-21
### Added
- supported AES auth
- supported 2023-10 api version

## [8.0.1] 2023-12-19
### Fixed
- updated dependencies version

## [8.0.0] 2023-12-18
### Breaking Changes
- #98 fix AftershipError.code type not number
- upgrade axios library to 1.6.0 version
- upgrade jest library to 29.0.0 version

## [7.0.6] 2023-05-18
### Added
- tracking object add new fileds
  - origin_state
  - origin_city
  - origin_postal_code
  - origin_raw_location
  - destination_state
  - destination_city
  - destination_postal_code
  - custom_estimated_delivery_date
  - first_estimated_delivery
  - shipment_tags
  - courier_connection_id
  - next_couriers
- create tracking add new params
  - origin_state
  - origin_city
  - origin_postal_code
  - origin_raw_location
  - destination_state
  - destination_city
  - destination_postal_code
  - destination_raw_location
  - shipment_tags
  - courier_connection_id
  - next_couriers
- update tracking add new params
  - slug
  - tracking_account_number
  - tracking_key
  - tracking_ship_date
  - origin_country_iso3
  - origin_state
  - origin_city
  - origin_postal_code
  - origin_raw_location
  - destination_country_iso3
  - destination_state
  - destination_city
  - destination_postal_code
  - destination_raw_location
- courier detect add new params
  - tracking_account_number
  - tracking_origin_country
  - tracking_state
  - slug_group
  - origin_country_iso3
  - destination_country_iso3

## [7.0.5] 2022-07-20
### Added
- add API endpoint `predict-batch` 
- update tracking fields 

## [7.0.4] 2022-05-11
### Added
- update tracking fields
### Fixed
- fix #80

## [7.0.3] 2022-02-11
### Fixed
- #74 fix the tracking interface

## [7.0.2] 2021-10-26
### Fixed
- #69 Fixed Axios sending empty body issue

## [7.0.1] 2021-07-30
### Fixed
- fix list trackings interface

## [7.0.0] 2021-02-09
### Breaking Changes
- DeliveryStatus Enum change to string instead of integer

## [6.1.0] 2020-07-29
### Added
- Added support for markAsCompleted() of tracking resource
- Updated package dependencies

## [6.0.0] 2020-04-24
### Added
- Support latest features in v4 API
- Support TypeScript
- Support IntelliSense, bring more convenient to consumers
- The SDK is now isomorphic

Compatibility
- Node >=10.0

### Breaking Changes
- Don't support `callback` anymore, please use `Promise` instead.
- Removed `auto retry` feature, consumers need to retry the request by themselves.
- Removed `call` method
- Remove `meta` in SDK `response` object.

## [5.0.0] 2016-01-13
- Update to 5.0.0, use Context-less interface, go to README.md for more

[7.0.5]: https://github.com/AfterShip/aftership-sdk-nodejs/compare/7.0.4...7.0.5
[7.0.4]: https://github.com/AfterShip/aftership-sdk-nodejs/compare/7.0.3...7.0.4
[7.0.3]: https://github.com/AfterShip/aftership-sdk-nodejs/compare/7.0.2...7.0.3
[7.0.2]: https://github.com/AfterShip/aftership-sdk-nodejs/compare/7.0.1...7.0.2
[7.0.1]: https://github.com/AfterShip/aftership-sdk-nodejs/compare/7.0.0...7.0.1
[7.0.0]: https://github.com/AfterShip/aftership-sdk-nodejs/compare/6.1.0...7.0.0
[6.1.0]: https://github.com/AfterShip/aftership-sdk-nodejs/compare/6.0.0...6.1.0
[6.0.0]: https://github.com/AfterShip/aftership-sdk-nodejs/compare/5.0.0...6.0.0
[5.0.0]: https://github.com/AfterShip/aftership-sdk-nodejs/releases/tag/5.0.0
