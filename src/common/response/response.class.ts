import {
	ResponseBodyType,
	STATUS_MESSAGES,
	StatusCode,
	ResponseType,
	DEFAULT_RESPONSE_HEADERS,
} from './types';

export class Response {
	private body: ResponseBodyType;
	private code: number;

	constructor(code = StatusCode.BAD_REQUEST, data = {}, message = '') {
		this.body = {
			data,
			message,
			statusMessage: STATUS_MESSAGES[code],
		};
		this.code = code;
	}

	generate(): ResponseType {
		return {
			statusCode: this.code,
			headers: DEFAULT_RESPONSE_HEADERS,
			body: JSON.stringify(this.body),
		};
	}
}
