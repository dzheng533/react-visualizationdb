"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
var TableContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  font-size: 80%;\n  border-radius: 3px;\n  transition: 0.3s;\n"], ["\n  display: flex;\n  flex-direction: column;\n  font-size: 80%;\n  border-radius: 3px;\n  transition: 0.3s;\n"
    /**
     * 表头
     */
])));
/**
 * 表头
 */
var TableTitle = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  text-align: left;\n  font-weight: blod;\n  line-height: 20px;\n  padding: 5px;\n  overflow-wrap: break-word;\n  border-bottom: 1px solid #666;\n"], ["\n  text-align: left;\n  font-weight: blod;\n  line-height: 20px;\n  padding: 5px;\n  overflow-wrap: break-word;\n  border-bottom: 1px solid #666;\n"
    /**
     * 表列的容器
     */
])));
/**
 * 表列的容器
 */
var TableRowsList = styled_components_1.default.ul(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  overflow: auto;\n  height: calc(100% - 25px);\n  padding: 3px;\n  margin: 2px;\n  ::-webkit-scrollbar-track {\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    border-radius: 5px;\n    background-color: #f5f5f5;\n  }\n\n  ::-webkit-scrollbar {\n    width: 12px;\n    background-color: #f5f5f5;\n  }\n\n  ::-webkit-scrollbar-thumb {\n    border-radius: 5px;\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    background-color: #f0f0f0;\n  }\n"], ["\n  overflow: auto;\n  height: calc(100% - 25px);\n  padding: 3px;\n  margin: 2px;\n  ::-webkit-scrollbar-track {\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    border-radius: 5px;\n    background-color: #f5f5f5;\n  }\n\n  ::-webkit-scrollbar {\n    width: 12px;\n    background-color: #f5f5f5;\n  }\n\n  ::-webkit-scrollbar-thumb {\n    border-radius: 5px;\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    background-color: #f0f0f0;\n  }\n"
    /**
     * 每个字段一行
     */
])));
var TableRow = styled_components_1.default.li(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  list-style: none;\n  padding: 0px 3px;\n  border: ", ";\n  transition: 0.3s;\n  :hover {\n    background-color: #f4f4f4;\n    transform: scale(1.01);\n    cursor: pointer;\n  }\n"], ["\n  display: flex;\n  list-style: none;\n  padding: 0px 3px;\n  border: ", ";\n  transition: 0.3s;\n  :hover {\n    background-color: #f4f4f4;\n    transform: scale(1.01);\n    cursor: pointer;\n  }\n"])), function (props) { return (props.affected ? '2px solid #26c281' : '2px solid transparent'); });
var TableCell = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-size: 100%;\n  display: flex;\n  align-items: left;\n  margin: 2px 8px 2px 0px;\n  line-height:20px;\n"], ["\n  font-size: 100%;\n  display: flex;\n  align-items: left;\n  margin: 2px 8px 2px 0px;\n  line-height:20px;\n"])));
exports.Table = function (_a) {
    var tablename = _a.tablename, columns = _a.columns, comment = _a.comment, onColumnClick = _a.onColumnClick;
    react_1.useEffect(function () {
        console.log('tablename', tablename, columns);
    });
    //
    var _b = react_1.useState(columns), inQueryColumns = _b[0], setInQueryColumns = _b[1];
    var handleColumnClick = function (e) {
        var tag = e.target;
        if ((tag.tagName.toLowerCase() === 'div' || tag.tagName.toLowerCase() === 'svg' || tag.tagName === 'path') && tag.parentElement) {
            tag = tag.parentElement;
            if (tag.tagName.toLowerCase() === 'svg' && tag.parentElement)
                tag = tag.parentElement;
        }
        debugger;
        var tableName = tag.getAttribute('data-tablename');
        var columnName = tag.getAttribute('data-columnname');
        var inTheQuery = tag.getAttribute('data-inquery');
        console.log('column click', tableName, columnName, inTheQuery);
        var tmpColums = __spreadArrays(inQueryColumns);
        for (var i = 0; i < tmpColums.length; i++) {
            var col = tmpColums[i];
            if (col.columnname === columnName) {
                col.inQuery = inTheQuery === 'true' ? false : true;
            }
        }
        if (onColumnClick && tableName) {
            onColumnClick(tableName, tmpColums);
        }
        setInQueryColumns(tmpColums);
    };
    var cells = [];
    for (var col in inQueryColumns) {
        if (columns[col]) {
            var column = columns[col];
            var columnname = column.columnname, comment_1 = column.comment, inQuery = column.inQuery;
            var inTheQuery = inQuery ? inQuery : false;
            cells.push(react_1.default.createElement(TableRow, { onClick: handleColumnClick, affected: false, inTheQuery: inTheQuery, "data-inquery": inTheQuery, "data-tablename": tablename, "data-columnname": columnname },
                react_1.default.createElement(grommet_icons_1.StatusGood, { style: { height: '15px', marginTop: '5px' }, color: inTheQuery ? '#26c281' : '#cccc' }),
                react_1.default.createElement(TableCell, null, columnname),
                react_1.default.createElement(TableCell, { style: { color: '#666' } }, comment_1)));
        }
    }
    return (react_1.default.createElement(TableContainer, { tablename: "ddd", "data-comment": comment },
        react_1.default.createElement(TableTitle, null,
            tablename,
            react_1.default.createElement("div", { style: { color: '#666', borderTop: '1px #ccc dashed', margin: '3px' } }, comment)),
        react_1.default.createElement(TableRowsList, null, cells)));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
