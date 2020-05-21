import React, { useState, useEffect } from 'react'
import { License, StatusGood ,Checkbox ,CheckboxSelected, RotateRight} from 'grommet-icons'
import '../css/table.css'

interface ITableProps {
  selectedtable?: string
  tablename: string
}

/**
 * 每个字段一行
 */
interface ITableRowMetaData{
  tableName: String,
  column: IColumnsMetaData
  clickHandle?:rowClickHandle
}
interface rowClickHandle{
  (columnName: string,inQuery:string) : void;
}
export const TableRow: React.FC<ITableRowMetaData> = ({tableName, column, clickHandle}) => {
  const {columnname,comment,inQuery} = column;
  const inTheQuery = inQuery?inQuery:false;
  const handleColumnClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    let tag = e.target as HTMLElement;
    if( (tag.tagName.toLowerCase() === 'div' || tag.tagName.toLowerCase() === 'svg' || tag.tagName === 'path') && tag.parentElement){
        tag = tag.parentElement;
        if (tag.tagName.toLowerCase() === 'svg' && tag.parentElement)
           tag = tag.parentElement;
    }
    let tableName = tag.getAttribute('data-tablename');
    let columnName = tag.getAttribute('data-columnname');
    let inTheQuery = tag.getAttribute('data-inquery');
    console.log('column click', tableName,columnName,inTheQuery);
    columnName = columnName?columnName:columnname;
    let inTheQueryBool = inTheQuery?inTheQuery : 'false';
    clickHandle &&clickHandle(columnName, inTheQueryBool);
  }
  return(
    <li className="tableRow" 
        data-inquery={inTheQuery}
        data-tablename={tableName}
        data-columnname={columnname}
        onClick={handleColumnClick}
        >
          {inTheQuery? <CheckboxSelected style={{width:'15px',marginRight:'3px'}}/> : <Checkbox  style={{width:'15px',marginRight:'3px'}}/>}
          <div className="tableCell">{columnname}</div>
          <div className="tableCellComment">{comment}</div>
        </li>
  );
}

export interface columnClickHandle{
  (tableName: string, columns:IColumnsMetaData[]) : void;
}
/**
 * 字段的元数据
 */
export interface IColumnsMetaData {
  characterlength?: string
  columnname: string
  datatype: string
  defaultvalue: string
  comment?: string
  inQuery?: boolean
}

/**
 * 数据表元数据
 */
export interface ITableMetaData {
  tablename: string
  comment?: string
  columns: IColumnsMetaData[]
  onColumnClick? : columnClickHandle
}

/**
 * 表格组件
 * @param param0 ItableMetaData
 */
export const Table: React.FC<ITableMetaData> = ({ tablename, columns, comment, onColumnClick }) => {
  //
  const [inQueryColumns, setInQueryColumns] = useState(columns);

  const handleColumnClick = (columnName:string,inTheQuery:string) => {

    console.log('column click', tablename,columnName,inTheQuery);
    let tmpColums = [... inQueryColumns]
    for (let i = 0; i < tmpColums.length; i++) {
      let col = tmpColums[i];
      if(col.columnname === columnName){
        col.inQuery = inTheQuery==='true'?false:true;
      }
    }
    if(onColumnClick && tablename ){
      onColumnClick(tablename,tmpColums)
    }
    setInQueryColumns(tmpColums);
  }

  const cells = []
  for (const col in inQueryColumns) {
    if (columns[col]) {
      const column = columns[col];
      cells.push(
        <TableRow tableName={tablename} column = {column} clickHandle={handleColumnClick}></TableRow>
      )
    }
  }
  return (
    <div className="tableContainer" >
      <div className="tableTitle" >{tablename}
        <div className='tableComment' >{comment}</div>
      </div>
      <ul className="tableRowList">{cells}</ul>

    </div>
  )
}
