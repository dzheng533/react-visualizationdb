import * as React from 'react'
import { useState, useEffect } from 'react'
import {Table, ITableMetaData, IColumnsMetaData,columnClickHandle } from './Table'


export interface IEmptyStateMetaData {
  message?: string

}
/**
 * 空表状态
 */
const SEmptyState: React.FC<IEmptyStateMetaData> = ({message}) => {
return (<div className="emptyComponent">{message?message:"没有数据表信息。"}</div>)
}
/**
 * 总容器
 */
const MainWrapper:React.FC = (props)=>{
  console.log("props:",props);
  const {children} = props;
  return <div className="mainWapper">{children}</div>
}

/**
 * 表格容器
 */
interface ITableWrapperProps {
  highlightForRelationship: string
}

const TableWrapper : React.FC<ITableWrapperProps> = (props,{highlightForRelationship}) => {
  const {children} = props;
  return <div className="tableWapper">{children}</div>;
}

interface ITableListOption{
    dockedTableNames?:string[],
    highlightTables?:string[],
    onColumnClick?:columnClickHandle
}

interface ITablesListProps {
  tables: ITableMetaData[],
  options?: ITableListOption
}

export const TablesList: React.FC<ITablesListProps> = ({ tables , options}) => {
  const [filtered, setPinnedTables] = useState([]);
  const tmpTables = [];

  if (tables) {
    for (const tkey in tables) {
      if (tables[tkey]) {
        const table = tables[tkey];
        let isHighlightTable = 'false';
        if(options){
          const {dockedTableNames,highlightTables,onColumnClick} = options;
          if(highlightTables && highlightTables.length > 0){
            for ( const htkey in highlightTables){
              if(highlightTables[htkey] === table.tablename){
                isHighlightTable = 'true';
                break;
              }
            }
          }
        }

        tmpTables.push(
          <TableWrapper highlightForRelationship={isHighlightTable}>
            <Table
              key={table.tablename}
              tablename={table.tablename}
              columns={table.columns}
              comment={table.comment}
              onColumnClick={options?.onColumnClick}
            ></Table>
          </TableWrapper>,
        )
      }
    }
  }
  if (tables.length > 0) {
    return <MainWrapper>{tmpTables}</MainWrapper>
  }
  return (
    <MainWrapper>
      <SEmptyState />
    </MainWrapper>
  )
}
