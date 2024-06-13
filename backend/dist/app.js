"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const node_path_1 = __importDefault(require("node:path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());

const allowedOrigins = ['http://localhost:5173', 'http://localhost:4000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
};

app.use((0, cors_1.default)(corsOptions));

app.use(express_1.default.static(node_path_1.default.join(__dirname, "..", "uploads")));
app.use("/api/v1", routes_1.default);
app.use(error_middleware_1.default);
exports.default = app;
