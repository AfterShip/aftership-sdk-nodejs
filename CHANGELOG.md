## Release History

## Change log

### 7.0.0 (2021-02-09)
- Breaking changes
	- DeliveryStatus Enum change to string instead of integer

### 6.1.0 (2020-07-29)
- Added support for markAsCompleted() of tracking resource
- Updated package dependencies

### 6.0.0 (2020-04-24)
- New features
	- Support latest features in v4 API
	- Support TypeScript
	- Support IntelliSense, bring more convenient to consumers
  - The SDK is now isomorphic
- Compatibility
	- Node >=10.0
- Breaking changes
	- Don't support `callback` anymore, please use `Promise` instead.
	- Removed `auto retry` feature, consumers need to retry the request by themselves.
	- Removed `call` method
  - Remove `meta` in SDK `response` object.

### 5.0.0 (2016-01-13)
* Update to 5.0.0, use Context-less interface, go to README.md for more
