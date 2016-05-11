'use strict';

/**
 * Error enum class
 */
const ErrorType = {
	ConstructorError: 'ConstructorError',
	HandlerError: 'HandlerError',
	InternalError: 'InternalError'
};

const ErrorEnum = {
	// ConstructorError
	ConstructorInvalidApiKey: {
		type: ErrorType.ConstructorError,
		message: 'ConstructorError: Invalid API key'
	},
	ConstructorInvalidOptions: {
		type: ErrorType.ConstructorError,
		message: 'ConstructorError: Invalid Options value'
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
	ConstructorInvalidRate: {
		type: ErrorType.ConstructorError,
		message: 'ConstructorError: Invalid Rate value'
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
	HandlerInvalidOptions: {
		type: ErrorType.HandlerError,
		message: 'HandlerError: Invalid Options value'
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
	},
	HandlerInvalidApiKey: {
		type: ErrorType.HandlerError,
		message: 'HandlerError: Invalid API key'
	},
	HandlerInvalidTimeout: {
		type: ErrorType.HandlerError,
		message: 'HandlerError: Invalid Timeout'
	},
	// API InternalError
	InternalError: {
		type: ErrorType.InternalError,
		message: 'Something went wrong on AfterShip\'s end.'
	}
};

module.exports = ErrorEnum;
