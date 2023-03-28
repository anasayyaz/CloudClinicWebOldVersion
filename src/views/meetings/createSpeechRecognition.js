"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSpeechlySpeechRecognition = void 0;
var browser_client_1 = require("@speechly/browser-client");
/**
 * Returns a SpeechRecognition implementation that uses a given Speechly app ID
 * to generate transcriptions using the Speechly API
 *
 * @param appId - Speechly app ID
 * @returns Class that implements the SpeechRecognition interface
 * @public
 */
exports.createSpeechlySpeechRecognition = function (appId) {
    var _a;
    var _b;
    var browserSupportsAudioApis = typeof window !== 'undefined' &&
        ((_a = window.navigator) === null || _a === void 0 ? void 0 : _a.mediaDevices) !== undefined &&
        (window.AudioContext !== undefined || window.webkitAudioContext !== undefined);
    return _b = /** @class */ (function () {
            function SpeechlySpeechRecognition() {
                var _this = this;
                this.clientInitialised = false;
                this.aborted = false;
                this.transcribing = false;
                this.continuous = false;
                this.interimResults = false;
                this.onresult = function () { };
                this.onend = function () { };
                this.start = function () { return __awaiter(_this, void 0, Promise, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.aborted = false;
                                return [4 /*yield*/, this.initialise()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, this.client.startContext()];
                            case 2:
                                _a.sent();
                                this.transcribing = true;
                                return [2 /*return*/];
                        }
                    });
                }); };
                this.stop = function () { return __awaiter(_this, void 0, Promise, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this._stop()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                this.abort = function () { return __awaiter(_this, void 0, Promise, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.aborted = true;
                                return [4 /*yield*/, this._stop()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                this.initialise = function () { return __awaiter(_this, void 0, Promise, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!!this.clientInitialised) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.client.initialize()];
                            case 1:
                                _a.sent();
                                this.clientInitialised = true;
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); };
                this._stop = function () { return __awaiter(_this, void 0, Promise, function () {
                    var e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!this.transcribing) {
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, this.initialise()];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, , 5]);
                                return [4 /*yield*/, this.client.stopContext()];
                            case 3:
                                _a.sent();
                                this.transcribing = false;
                                this.onend();
                                return [3 /*break*/, 5];
                            case 4:
                                e_1 = _a.sent();
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); };
                this.handleResult = function (segment) {
                    if (_this.aborted) {
                        return;
                    }
                    if (!_this.interimResults && !segment.isFinal) {
                        return;
                    }
                    var transcript = segment.words
                        .map(function (x) { return x.value; })
                        .filter(function (x) { return x; })
                        .join(' ');
                    var results = [
                        {
                            0: {
                                transcript: transcript,
                                confidence: 1,
                            },
                            isFinal: segment.isFinal,
                        },
                    ];
                    _this.onresult({ results: results, resultIndex: 0 });
                    if (!_this.continuous && segment.isFinal) {
                        _this.abort().catch(function () { }); // swallow errors
                    }
                };
                // this.client = new browser_client_1.Client({ appId: appId });
                // this.client.onSegmentChange(this.handleResult);
            }
            return SpeechlySpeechRecognition;
        }()),
        _b.hasBrowserSupport = browserSupportsAudioApis,
        _b;
};
exports.default = exports.createSpeechlySpeechRecognition;
