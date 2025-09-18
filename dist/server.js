"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_route_js_1 = __importDefault(require("./routes/auth.route.js"));
const user_routes_js_1 = __importDefault(require("./routes/user.routes.js"));
const teacher_routes_js_1 = __importDefault(require("./routes/teacher.routes.js"));
const admin_route_js_1 = __importDefault(require("./routes/admin.route.js"));
const institution_route_js_1 = __importDefault(require("./routes/institution.route.js"));
const student_routes_js_1 = __importDefault(require("./routes/student.routes.js"));
const challenge_routes_js_1 = __importDefault(require("./routes/challenge.routes.js"));
const app = (0, express_1.default)();
// main packages
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)());
// routes
app.use('/api/v1/admin/institutions', admin_route_js_1.default);
app.use('/api/v1/auth', auth_route_js_1.default);
app.use('/api/v1/user', user_routes_js_1.default);
app.use('/api/v1/teacher', teacher_routes_js_1.default);
app.use('/api/v1/institution', institution_route_js_1.default);
app.use('/api/student', student_routes_js_1.default);
app.use('/api/challenges', challenge_routes_js_1.default);
const port = process.env.PORT || 5101;
const start = () => {
    try {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
