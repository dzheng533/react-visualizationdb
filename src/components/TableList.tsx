import * as React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Table, { ITableMetaData, IColumnsMetaData,columnClickHandle } from './Table'

/**
 * 空表状态
 */
const SEmptyState = styled.div`
  margin: auto;
  text-align: center;
  padding: 20px;
`
/**
 * 总容器
 */
const TempWrapper = styled.div`
  overflow: scroll-x;
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  display: flex;
  border: '1px solid grey';
  flex-wrap: wrap;
  padding: 5px 15px;
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #d62929;
  }
`
/**
 * 表格容器
 */
interface ITableWrapperProps {
  highlightForRelationship: string
}

const TableWrapper = styled.div<ITableWrapperProps>`
  width: auto;
  max-height: 200px;
  border-radius: 3px;
  overflow: hidden;
  margin: 8px;
  border: ${({ highlightForRelationship }) =>
    highlightForRelationship === 'true' ? '1px solid transparent' : '1px solid grey'};
  box-shadow: ${({ highlightForRelationship }) =>
    highlightForRelationship === 'true' ? '0px 0px 8px #4B70FE' : 'none'};
`
interface ITableListOption{
    dockedTableNames?:string[],
    highlightTables?:string[],
    onColumnClick?:null
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
            ></Table>
          </TableWrapper>,
        )
      }
    }
  }
  if (tables.length > 0) {
    return <TempWrapper>{tmpTables}</TempWrapper>
  }
  return (
    <TempWrapper>
      <SEmptyState>
        <span>
          没有数据表信息。
        </span>
      </SEmptyState>
    </TempWrapper>
  )
}
