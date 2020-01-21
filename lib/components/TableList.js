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
var React = __importStar(require("react"));
var react_1 = require("react");
var styled_components_1 = __importDefault(require("styled-components"));
var Table_1 = __importDefault(require("./Table"));
/**
 * 空表状态
 */
var SEmptyState = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: auto;\n  text-align: center;\n  padding: 20px;\n"], ["\n  margin: auto;\n  text-align: center;\n  padding: 20px;\n"])));
/**
 * 总容器
 */
var TempWrapper = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    overflow: scroll-x;\n    height: calc('100% - 20px');\n    width: calc('100% - 20px');\n    display: flex;\n    border: '1px solid grey';\n    flex-wrap: wrap;\n    padding: 5px 15px;\n    ::-webkit-scrollbar-track\n{\n\t-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);\n\tborder-radius: 10px;\n\tbackground-color: #F5F5F5;\n}\n\n::-webkit-scrollbar\n{\n\twidth: 12px;\n\tbackground-color: #F5F5F5;\n}\n\n::-webkit-scrollbar-thumb\n{\n\tborder-radius: 10px;\n\t-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);\n\tbackground-color: #D62929;\n}\n"], ["\n    overflow: scroll-x;\n    height: calc('100% - 20px');\n    width: calc('100% - 20px');\n    display: flex;\n    border: '1px solid grey';\n    flex-wrap: wrap;\n    padding: 5px 15px;\n    ::-webkit-scrollbar-track\n{\n\t-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);\n\tborder-radius: 10px;\n\tbackground-color: #F5F5F5;\n}\n\n::-webkit-scrollbar\n{\n\twidth: 12px;\n\tbackground-color: #F5F5F5;\n}\n\n::-webkit-scrollbar-thumb\n{\n\tborder-radius: 10px;\n\t-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);\n\tbackground-color: #D62929;\n}\n"])));
var TableWrapper = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    width: 150px;\n    max-height: 200px;\n    border-radius: 3px;\n    overflow: hidden;\n    margin: 8px;\n    border: ", ";\n    box-shadow: ", ";\n"], ["\n    width: 150px;\n    max-height: 200px;\n    border-radius: 3px;\n    overflow: hidden;\n    margin: 8px;\n    border: ", ";\n    box-shadow: ", ";\n"])), function (_a) {
    var highlightForRelationship = _a.highlightForRelationship;
    return (highlightForRelationship === 'true' ? '1px solid transparent' : '1px solid grey');
}, function (_a) {
    var highlightForRelationship = _a.highlightForRelationship;
    return (highlightForRelationship === 'true' ? '0px 0px 8px #4B70FE' : 'none');
});
var TablesList = function (_a) {
    var tables = _a.tables;
    var _b = react_1.useState([]), filtered = _b[0], setPinnedTables = _b[1];
    var tmpTables = [];
    for (var tkey in tables) {
        var table = tables[tkey];
        tmpTables.push(React.createElement(TableWrapper, { highlightForRelationship: 'false' },
            React.createElement(Table_1.default, { key: table.tablename, tablename: table.tablename, columns: table.columns, comment: table.comment })));
    }
    if (tables.length > 0) {
        return (React.createElement(TempWrapper, null, tmpTables));
    }
    return (React.createElement(TempWrapper, null,
        React.createElement(SEmptyState, null,
            React.createElement("span", null,
                "Sorry, there are no tables that matched your search. ",
                React.createElement("br", null),
                " Please search again."))));
};
exports.default = TablesList;
var templateObject_1, templateObject_2, templateObject_3;
