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
  font-size: 60%;
  border-radius: 3px;
  transition: 0.3s;
`
/**
 * 表头
 */
const TableTitle = styled.p`
  text-align: center;
  font-size: 90%;
  padding: 5px;
  overflow-wrap: break-word;
  border-bottom: 1px solid #26c281;
  :hover {
    transform: scale(1.05);
  }
`
/**
 * 表列的容器
 */
const TableRowsList = styled.ul`
  overflow: scroll;
  height: 150px;
  padding: 3px;
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
  justify-content: space-between;
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
const TableCell = styled.p`
  font-size: 100%;
  display: flex;
  align-items: center;
  margin: 2px 0px 2px 0px;
`

/**
 * 字段的元数据
 */
export interface IColumnsMetaData {
  characterlength?: string
  columnname: string
  datatype: string
  defaultvalue: string
  comment?: string
}

/**
 * 数据表元数据
 */
export interface ITableMetaData {
  tablename: string
  comment?: string
  columns: IColumnsMetaData[]
}

const handleColumnClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  const tag = e.target
  console.log('column click', e.target)
}

const Table: React.FC<ITableMetaData> = ({ tablename, columns, comment }) => {
  useEffect(() => {
    console.log('tablename', tablename, columns)
  })
  const cells = []
  const inTheQuery = true
  for (const col in columns) {
    if (columns[col]) {
      const column = columns[col]
      cells.push(
        <TableRow
          onClick={handleColumnClick}
          affected={false}
          inTheQuery={false}
          title={column.comment}
          data-tablename={tablename}
          data-columnname={column.columnname}
        >
          {inTheQuery && <StatusGood style={{ height: '15px' }} color="#26c281" />}
          <TableCell>{column.columnname}</TableCell>
          <TableCell>{column.datatype}</TableCell>
        </TableRow>,
      )
    }
  }
  return (
    <TableContainer tablename="ddd" data-comment={comment}>
      <TableTitle>{tablename}</TableTitle>
      <TableRowsList>{cells}</TableRowsList>
    </TableContainer>
  )
}
export default Table
