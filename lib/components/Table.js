"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var grommet_icons_1 = require("grommet-icons");
/**
 * 表格外容器
 */
var TableContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: column;\n    font-size: 60%;\n    border-radius: 3px;\n    transition: 0.3s;\n"], ["\n    display: flex;\n    flex-direction: column;\n    font-size: 60%;\n    border-radius: 3px;\n    transition: 0.3s;\n"])));
/**
 * 表头
 */
var TableTitle = styled_components_1.default.p(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  text-align: center;\n  font-size: 90%;\n  padding: 5px;\n  overflow-wrap: break-word;\n  border-bottom: 1px solid #26c281;\n  :hover {\n    transform: scale(1.05);\n  }\n"], ["\n  text-align: center;\n  font-size: 90%;\n  padding: 5px;\n  overflow-wrap: break-word;\n  border-bottom: 1px solid #26c281;\n  :hover {\n    transform: scale(1.05);\n  }\n"])));
/**
 * 表列的容器
 */
var TableRowsList = styled_components_1.default.ul(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  overflow: scroll;\n  height: 150px;\n  padding: 3px;\n"], ["\n  overflow: scroll;\n  height: 150px;\n  padding: 3px;\n"])));
var TableRow = styled_components_1.default.li(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  list-style: none;\n  padding: 0px 3px;\n  border: ", ";\n  transition: 0.3s;\n  :hover {\n    background-color: #f4f4f4;\n    transform: scale(1.01);\n    cursor: pointer;\n  }\n"], ["\n  display: flex;\n  justify-content: space-between;\n  list-style: none;\n  padding: 0px 3px;\n  border: ", ";\n  transition: 0.3s;\n  :hover {\n    background-color: #f4f4f4;\n    transform: scale(1.01);\n    cursor: pointer;\n  }\n"])), function (props) { return props.affected ? '2px solid #26c281' : '2px solid transparent'; });
var TableCell = styled_components_1.default.p(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-size: 100%;\n  display: flex;\n  align-items: center;\n  margin: 2px 0px 2px 0px;\n"], ["\n  font-size: 100%;\n  display: flex;\n  align-items: center;\n  margin: 2px 0px 2px 0px;\n"])));
var handleColumnClick = function (e) {
    var tag = e.target;
    console.log("column click", e.target);
};
var Table = function (_a) {
    var tablename = _a.tablename, columns = _a.columns, comment = _a.comment;
    react_1.useEffect(function () {
        console.log('tablename', tablename, columns);
    });
    var cells = [];
    var inTheQuery = true;
    for (var col in columns) {
        cells.push(react_1.default.createElement(TableRow, { onClick: handleColumnClick, affected: false, inTheQuery: false, title: columns[col].comment, "data-tablename": tablename, "data-columnname": columns[col].columnname },
            inTheQuery && (react_1.default.createElement(grommet_icons_1.StatusGood, { style: { height: '15px' }, color: "#26c281" })),
            react_1.default.createElement(TableCell, null, columns[col].columnname),
            react_1.default.createElement(TableCell, null, columns[col].datatype)));
    }
    return (react_1.default.createElement(TableContainer, { tablename: "ddd", "data-comment": comment },
        react_1.default.createElement(TableTitle, null, tablename),
        react_1.default.createElement(TableRowsList, null, cells)));
};
exports.default = Table;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
