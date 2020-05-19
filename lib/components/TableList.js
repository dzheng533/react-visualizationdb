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
var Table_1 = require("./Table");
/**
 * 空表状态
 */
var SEmptyState = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: auto;\n  text-align: center;\n  padding: 20px;\n"], ["\n  margin: auto;\n  text-align: center;\n  padding: 20px;\n"
    /**
     * 总容器
     */
])));
/**
 * 总容器
 */
var TempWrapper = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  overflow: scroll-x;\n  height: calc(100% - 20px);\n  width: calc(100% - 20px);\n  display: flex;\n  border: '1px solid grey';\n  flex-wrap: wrap;\n  padding: 5px 15px;\n  ::-webkit-scrollbar-track {\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    border-radius: 10px;\n    background-color: #f5f5f5;\n  }\n\n  ::-webkit-scrollbar {\n    width: 12px;\n    background-color: #f5f5f5;\n  }\n\n  ::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    background-color: #d62929;\n  }\n"], ["\n  overflow: scroll-x;\n  height: calc(100% - 20px);\n  width: calc(100% - 20px);\n  display: flex;\n  border: '1px solid grey';\n  flex-wrap: wrap;\n  padding: 5px 15px;\n  ::-webkit-scrollbar-track {\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    border-radius: 10px;\n    background-color: #f5f5f5;\n  }\n\n  ::-webkit-scrollbar {\n    width: 12px;\n    background-color: #f5f5f5;\n  }\n\n  ::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    background-color: #d62929;\n  }\n"
    /**
     * 表格容器
     */
])));
var TableWrapper = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: auto;\n  max-height: 200px;\n  border-radius: 3px;\n  overflow: hidden;\n  margin: 8px;\n  border: ", ";\n  box-shadow: ", ";\n"], ["\n  width: auto;\n  max-height: 200px;\n  border-radius: 3px;\n  overflow: hidden;\n  margin: 8px;\n  border: ",
    ";\n  box-shadow: ",
    ";\n"])), function (_a) {
    var highlightForRelationship = _a.highlightForRelationship;
    return highlightForRelationship === 'true' ? '1px solid transparent' : '1px solid grey';
}, function (_a) {
    var highlightForRelationship = _a.highlightForRelationship;
    return highlightForRelationship === 'true' ? '0px 0px 8px #4B70FE' : 'none';
});
exports.TablesList = function (_a) {
    var tables = _a.tables, options = _a.options;
    var _b;
    var _c = react_1.useState([]), filtered = _c[0], setPinnedTables = _c[1];
    var tmpTables = [];
    if (tables) {
        for (var tkey in tables) {
            if (tables[tkey]) {
                var table = tables[tkey];
                var isHighlightTable = 'false';
                if (options) {
                    var dockedTableNames = options.dockedTableNames, highlightTables = options.highlightTables, onColumnClick = options.onColumnClick;
                    if (highlightTables && highlightTables.length > 0) {
                        for (var htkey in highlightTables) {
                            if (highlightTables[htkey] === table.tablename) {
                                isHighlightTable = 'true';
                                break;
                            }
                        }
                    }
                }
                tmpTables.push(React.createElement(TableWrapper, { highlightForRelationship: isHighlightTable },
                    React.createElement(Table_1.Table, { key: table.tablename, tablename: table.tablename, columns: table.columns, comment: table.comment, onColumnClick: (_b = options) === null || _b === void 0 ? void 0 : _b.onColumnClick })));
            }
        }
    }
    if (tables.length > 0) {
        return React.createElement(TempWrapper, null, tmpTables);
    }
    return (React.createElement(TempWrapper, null,
        React.createElement(SEmptyState, null,
            React.createElement("span", null, "\u6CA1\u6709\u6570\u636E\u8868\u4FE1\u606F\u3002"))));
};
var templateObject_1, templateObject_2, templateObject_3;
