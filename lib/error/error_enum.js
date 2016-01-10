'use strict';

/**
 * Error enum class
 */
const ErrorType = {
	ConstructorError: 'ConstructorError',
	HandlerError: 'HandlerError'
};

const ErrorEnum = {
	// ConstructorError
	ConstructorInvalidApiKey: {
		type: ErrorType.ConstructorError,
		message: 'ConstructorError: Invalid API key'
	},
	ConstructorInvalidEndpoint: {
		type: ErrorType.ConstructorError,
		message: 'ConstructorError: Invalid Endpoint value'
	},
	ConstructorInvalidProxy: {
		type: ErrorType.ConstructorError,
		message: 'ConstructorError: Invalid Proxy value'
	},
	ConstructorInvalidRetry: {
		type: ErrorType.ConstructorError,
		message: 'ConstructorError: Invalid Retry value'
	},
	// HandlerError
	HandlerInvalidMethod: {
		type: ErrorType.HandlerError,
		message: 'HandlerError: Invalid Method value'
	},
	HandlerInvalidPath: {
		type: ErrorType.HandlerError,
		message: 'HandlerError: Invalid Path value'
	},
	HandlerInvalidBody: {
		type: ErrorType.HandlerError,
		message: 'HandlerError: Invalid Body value'
	},
	HandlerInvalidQuery: {
		type: ErrorType.HandlerError,
		message: 'HandlerError: Invalid Query value'
	},
	HandlerInvalidRaw: {
		type: ErrorType.HandlerError,
		message: 'HandlerError: Invalid Raw value'
	},
	HandlerInvalidRetry: {
		type: ErrorType.HandlerError,
		message: 'HandlerError: Invalid Retry value'
	}
};

module.exports = ErrorEnum;
