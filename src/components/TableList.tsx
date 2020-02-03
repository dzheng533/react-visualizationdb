import * as React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Table, { ITableMetaData, IColumnsMetaData } from './Table'

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
  width: 150px;
  max-height: 200px;
  border-radius: 3px;
  overflow: hidden;
  margin: 8px;
  border: ${({ highlightForRelationship }) =>
    highlightForRelationship === 'true' ? '1px solid transparent' : '1px solid grey'};
  box-shadow: ${({ highlightForRelationship }) =>
    highlightForRelationship === 'true' ? '0px 0px 8px #4B70FE' : 'none'};
`

interface ITablesListProps {
  tables: ITableMetaData[]
}

export const TablesList: React.FC<ITablesListProps> = ({ tables }) => {
  const [filtered, setPinnedTables] = useState([])
  const tmpTables = []
  if (tables) {
    for (const tkey in tables) {
      if (tables[tkey]) {
        const table = tables[tkey]
        tmpTables.push(
          <TableWrapper highlightForRelationship={'false'}>
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
          Sorry, there are no tables that matched your search. <br /> Please search again.
        </span>
      </SEmptyState>
    </TempWrapper>
  )
}
