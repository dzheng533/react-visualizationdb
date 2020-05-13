import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { License, StatusGood } from 'grommet-icons'

interface ITableProps {
  selectedtable?: string
  tablename: string
}
/**
 * 表格外容器
 */
const TableContainer = styled.div<ITableProps>`
  display: flex;
  flex-direction: column;
  font-size: 80%;
  border-radius: 3px;
  transition: 0.3s;
`
/**
 * 表头
 */
const TableTitle = styled.div`
  text-align: left;
  font-weight: blod;
  line-height: 20px;
  padding: 5px;
  overflow-wrap: break-word;
  border-bottom: 1px solid #666;
`
/**
 * 表列的容器
 */
const TableRowsList = styled.ul`
  overflow: auto;
  height: calc(100% - 25px);
  padding: 3px;
  margin: 2px;
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f0f0f0;
  }
`

/**
 * 每个字段一行
 */
interface ITableRowProps {
  affected: boolean
  inTheQuery: boolean // 是否是查询条件
}
const TableRow = styled.li<ITableRowProps>`
  display: flex;
  list-style: none;
  padding: 0px 3px;
  border: ${props => (props.affected ? '2px solid #26c281' : '2px solid transparent')};
  transition: 0.3s;
  :hover {
    background-color: #f4f4f4;
    transform: scale(1.01);
    cursor: pointer;
  }
`
const TableCell = styled.div`
  font-size: 100%;
  display: flex;
  align-items: left;
  margin: 2px 8px 2px 0px;
  line-height:20px;
`
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


export const Table: React.FC<ITableMetaData> = ({ tablename, columns, comment, onColumnClick }) => {
  useEffect(() => {
    console.log('tablename', tablename, columns)
  })
  //
  const [inQueryColumns, setInQueryColumns] = useState(columns);


  const handleColumnClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    
    let tag = e.target as HTMLElement;
    if( (tag.tagName.toLowerCase() === 'div' || tag.tagName.toLowerCase() === 'svg' || tag.tagName === 'path') && tag.parentElement){
        tag = tag.parentElement;
        if (tag.tagName.toLowerCase() === 'svg' && tag.parentElement)
           tag = tag.parentElement;
    }
    debugger
    let tableName = tag.getAttribute('data-tablename');
    let columnName = tag.getAttribute('data-columnname');
    let inTheQuery = tag.getAttribute('data-inquery');
    console.log('column click', tableName,columnName,inTheQuery);
    let tmpColums = [... inQueryColumns]
    for (let i = 0; i < tmpColums.length; i++) {
      let col = tmpColums[i];
      if(col.columnname === columnName){
        col.inQuery = inTheQuery==='true'?false:true;
      }
    }
    if(onColumnClick && tableName ){
      onColumnClick(tableName,tmpColums)
    }
    setInQueryColumns(tmpColums);
  }

  const cells = []
  for (const col in inQueryColumns) {
    if (columns[col]) {
      const column = columns[col];
      const {columnname,comment,inQuery} = column;
      const inTheQuery = inQuery?inQuery:false;
      cells.push(
        <TableRow
          onClick={handleColumnClick}
          affected={false}
          inTheQuery={inTheQuery}
          data-inquery={inTheQuery}
          data-tablename={tablename}
          data-columnname={columnname}
        >
          <StatusGood style={{ height: '15px', marginTop:'5px' }} color={inTheQuery?'#26c281':'#cccc'} />
          <TableCell >{columnname}</TableCell>
          <TableCell style={{color:'#666'}}>{comment}</TableCell>
        </TableRow>,
      )
    }
  }
  return (
    <TableContainer tablename="ddd" data-comment={comment}>
      <TableTitle>{tablename}
        <div style={{ color:'#666',borderTop:'1px #ccc dashed',margin:'3px' }}>{comment}</div>
      </TableTitle>
      <TableRowsList>{cells}</TableRowsList>
    </TableContainer>
  )
}
