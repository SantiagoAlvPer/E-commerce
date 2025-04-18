"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_RESPONSE_MESSAGE = void 0;
var HTTP_RESPONSE_MESSAGE;
(function (HTTP_RESPONSE_MESSAGE) {
    HTTP_RESPONSE_MESSAGE["HTTP_100_CONTINUE"] = "Just keep going!";
    HTTP_RESPONSE_MESSAGE["HTTP_101_SWITCHING_PROTOCOLS"] = "We're switching things up.";
    HTTP_RESPONSE_MESSAGE["HTTP_102_PROCESSING"] = "Hang tight, we're working on it.";
    HTTP_RESPONSE_MESSAGE["HTTP_200_OK"] = "Everything went well!";
    HTTP_RESPONSE_MESSAGE["HTTP_201_CREATED"] = "New resource has been created!";
    HTTP_RESPONSE_MESSAGE["HTTP_202_ACCEPTED"] = "We got it, but we're still working on it.";
    HTTP_RESPONSE_MESSAGE["HTTP_203_NON_AUTHORITATIVE_INFORMATION"] = "Here\u2019s your info, but it might be a bit off.";
    HTTP_RESPONSE_MESSAGE["HTTP_204_NO_CONTENT"] = "Nothing to see here!";
    HTTP_RESPONSE_MESSAGE["HTTP_205_RESET_CONTENT"] = "Go ahead and reset your form.";
    HTTP_RESPONSE_MESSAGE["HTTP_300_MULTIPLE_CHOICES"] = "You have some options to choose from.";
    HTTP_RESPONSE_MESSAGE["HTTP_301_MOVED_PERMANENTLY"] = "This page has a new home.";
    HTTP_RESPONSE_MESSAGE["HTTP_302_FOUND"] = "Temporarily moved, check here.";
    HTTP_RESPONSE_MESSAGE["HTTP_303_SEE_OTHER"] = "Check out this other page instead.";
    HTTP_RESPONSE_MESSAGE["HTTP_304_NOT_MODIFIED"] = "Nothing has changed.";
    HTTP_RESPONSE_MESSAGE["HTTP_307_TEMPORARY_REDIRECT"] = "This page is temporarily elsewhere.";
    HTTP_RESPONSE_MESSAGE["HTTP_308_PERMANENT_REDIRECT"] = "This page moved for good.";
    HTTP_RESPONSE_MESSAGE["HTTP_400_BAD_REQUEST"] = "Oops, that request didn\u2019t make sense.";
    HTTP_RESPONSE_MESSAGE["HTTP_401_UNAUTHORIZED"] = "You need to log in for this.";
    HTTP_RESPONSE_MESSAGE["HTTP_402_PAYMENT_REQUIRED"] = "Time to pay up!";
    HTTP_RESPONSE_MESSAGE["HTTP_403_FORBIDDEN"] = "You\u2019re not allowed to access this.";
    HTTP_RESPONSE_MESSAGE["HTTP_404_NOT_FOUND"] = "We couldn\u2019t find what you\u2019re looking for.";
    HTTP_RESPONSE_MESSAGE["HTTP_405_METHOD_NOT_ALLOWED"] = "You can\u2019t do that here.";
    HTTP_RESPONSE_MESSAGE["HTTP_406_NOT_ACCEPTABLE"] = "The response isn\u2019t in a format you like.";
    HTTP_RESPONSE_MESSAGE["HTTP_407_PROXY_AUTHENTICATION_REQUIRED"] = "You need to authenticate with the proxy.";
    HTTP_RESPONSE_MESSAGE["HTTP_408_REQUEST_TIMEOUT"] = "Took too long, try again.";
    HTTP_RESPONSE_MESSAGE["HTTP_409_CONFLICT"] = "There's a conflict with the request.";
    HTTP_RESPONSE_MESSAGE["HTTP_410_GONE"] = "This resource is no longer available.";
    HTTP_RESPONSE_MESSAGE["HTTP_411_LENGTH_REQUIRED"] = "We need the content length.";
    HTTP_RESPONSE_MESSAGE["HTTP_412_PRECONDITION_FAILED"] = "Preconditions weren't met.";
    HTTP_RESPONSE_MESSAGE["HTTP_413_PAYLOAD_TOO_LARGE"] = "Whoa, that's too much data!";
    HTTP_RESPONSE_MESSAGE["HTTP_414_URI_TOO_LONG"] = "The URL is way too long!";
    HTTP_RESPONSE_MESSAGE["HTTP_415_UNSUPPORTED_MEDIA_TYPE"] = "We don't support this type of data.";
    HTTP_RESPONSE_MESSAGE["HTTP_416_RANGE_NOT_SATISFIABLE"] = "Requested range is not available.";
    HTTP_RESPONSE_MESSAGE["HTTP_417_EXPECTATION_FAILED"] = "Expectation failed, sorry!";
    HTTP_RESPONSE_MESSAGE["HTTP_418_IM_A_TEAPOT"] = "I'm a teapot. Short and stout.";
    HTTP_RESPONSE_MESSAGE["HTTP_422_UNPROCESSABLE_ENTITY"] = "We couldn't process that data.";
    HTTP_RESPONSE_MESSAGE["HTTP_425_TOO_EARLY"] = "It's too early for that request.";
    HTTP_RESPONSE_MESSAGE["HTTP_426_UPGRADE_REQUIRED"] = "You need to upgrade to proceed.";
    HTTP_RESPONSE_MESSAGE["HTTP_428_PRECONDITION_REQUIRED"] = "Preconditions must be set.";
    HTTP_RESPONSE_MESSAGE["HTTP_429_TOO_MANY_REQUESTS"] = "You're sending too many requests!";
    HTTP_RESPONSE_MESSAGE["HTTP_431_REQUEST_HEADER_FIELDS_TOO_LARGE"] = "Your headers are too large!";
    HTTP_RESPONSE_MESSAGE["HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS"] = "This content is restricted by law.";
    HTTP_RESPONSE_MESSAGE["HTTP_500_INTERNAL_SERVER_ERROR"] = "Something went wrong on our end.";
    HTTP_RESPONSE_MESSAGE["HTTP_501_NOT_IMPLEMENTED"] = "We haven't implemented that yet.";
    HTTP_RESPONSE_MESSAGE["HTTP_502_BAD_GATEWAY"] = "There's a problem with the gateway.";
    HTTP_RESPONSE_MESSAGE["HTTP_503_SERVICE_UNAVAILABLE"] = "Service is temporarily unavailable.";
    HTTP_RESPONSE_MESSAGE["HTTP_504_GATEWAY_TIMEOUT"] = "The gateway took too long to respond.";
    HTTP_RESPONSE_MESSAGE["HTTP_505_HTTP_VERSION_NOT_SUPPORTED"] = "We don\u2019t support that HTTP version.";
    HTTP_RESPONSE_MESSAGE["HTTP_507_INSUFFICIENT_STORAGE"] = "We're out of storage space!";
    HTTP_RESPONSE_MESSAGE["HTTP_511_NETWORK_AUTHENTICATION_REQUIRED"] = "You need to authenticate to access the network.";
})(HTTP_RESPONSE_MESSAGE || (exports.HTTP_RESPONSE_MESSAGE = HTTP_RESPONSE_MESSAGE = {}));
//# sourceMappingURL=http-message.js.map