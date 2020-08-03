import React, { FC, useState, useEffect, useRef, MutableRefObject, useCallback,useImperativeHandle } from 'react'
import '../css/editor.css'
interface ISourceTabelProp{
    tableName:string,
    tableAliseName:string
}

interface IEditorProp{
    width?: number,
    height?: number
    tables:ISourceTabelProp[]
}

interface IACOption{
    left: string,
    top: string,
    show?: boolean
}


interface IAutoComplete{
    config : IACOption,
    data : ISourceTabelProp[],
    activeValue? : ISourceTabelProp,
    onSelectChange?():void
}
interface IConditionProp{
    isEdit:boolean
}
interface ICondItem{
    key:string,
    alias:string,
}
interface IConditionState{
    isEdit:boolean,
    field?: ICondItem,
    method?: ICondItem,
    value?: ICondItem,
}

export const ConditionBlock :React.FC<IConditionProp> = ({isEdit}) => {

    return (<div className="blockItem">
    {isEdit?
    <><div className="field"></div>
    <div className="method"></div>
    <div className="value"></div>
    </>
    :<><div className="field"></div>
    <div className="method"></div>
    <div className="value"></div>
    </>}</div>)
}

export const AutoCompleteItem : React.FC<IAutoComplete> = ({config, data, activeValue}) =>{
    const autoCompRef = useRef(AutoCompleteItem);
    let displayStyle = config.show?'block':'none';
    let handleKeyEvent = (e:React.KeyboardEvent) =>{
        switch (e.keyCode){
            case 13:
                console.log("enter click ",activeValue);
                break;
            default:
                break;
        }

        console.log("key event return",e.type,e.keyCode);
        e.preventDefault();
    }

    return (<div className="autoCompleteContainer" style={{left:config.left,top:config.top,display:displayStyle}}>
        {data.map((item)=>{
            return (<span data- className={item.tableName === activeValue?.tableName ? 'acItem active':'acItem'} >{item.tableAliseName}</span>);
        })}
    </div>);
}

export const Editor: FC<IEditorProp> = ({width, height}) => {
    const inputRef = useRef(null);
    const [acOption,setAcOption] = useState({left:'0px',top:'0px',show:false});
    const [sourceTables ,setSourceTables] = useState<ISourceTabelProp[]>([]);
    const [selectIndex ,setSelectIndex] = useState<number>(0);
    const [conditionNodes,setConditionNodes] = useState<IConditionProp[]>([]);

    let widthpx = width && !isNaN(width) ?  width+'px' : '100%';
    let heightpx = height && !isNaN(height) ?  height+'px' : '100%';

    let showAcComponment = ()=>{
        if (inputRef.current != null){
            let inputEl = (inputRef.current as unknown )as HTMLInputElement;
            setAcOption({
                "top":(inputEl.offsetTop + inputEl.offsetHeight) + 'px',
                "left": (inputEl.offsetLeft + 5) + 'px',
                "show":true
            })
        }
    };
    let hideAcComponment = ()=>{
        if( acOption.show ){
            let tmpOption = Object.assign({},Object.assign(acOption,{"show":false}));
            console.log("TmpOption",tmpOption);
            setAcOption(tmpOption);
        }
    }

    let addEmpthComponment = ()=>{
        const nextCondNodes = [... conditionNodes];
        nextCondNodes.push( {isEdit:true} )
        setConditionNodes(nextCondNodes);
    }
    let addBreakComponment = ()=>{
        const nextCondNodes = [... conditionNodes];
        //nextCondNodes.push( <BreakBlock /> )
        setConditionNodes(nextCondNodes);
    }
    let deleteComponment = ()=>{
        if(conditionNodes.length == 0)
            return;
        
        conditionNodes.splice(conditionNodes.length - 1 ,1);
        const nextCondNodes = [... conditionNodes];
        console.log("del:",nextCondNodes);
        setConditionNodes(nextCondNodes);
    }

    let handleMouseEvent = (e:React.MouseEvent) => {
        if (inputRef.current != null){
            let inputEl = (inputRef.current as unknown )as HTMLInputElement;
            inputEl.focus();
        }
        e.preventDefault();
        console.log("mouse event",e.type);
    };

    let handleKeyEvent = (e:React.KeyboardEvent) =>{
        console.log("KeyCode:",e.keyCode)
        switch (e.keyCode){
            case 32:
                // 空格键处理
                addEmpthComponment();
                getTableSource();
                showAcComponment();
            break;
            case 38:
                // 向上箭头
                if (selectIndex > 0){
                    setSelectIndex(selectIndex - 1);
                }
                break;
            case 40:
                // 向下箭头
                if (selectIndex < sourceTables.length-1){
                    setSelectIndex(selectIndex + 1);
                }
                break;
            case 8:
                //删除
                hideAcComponment();
                deleteComponment();
                break;
            case 13:
                //回车
                if( acOption.show ){
                    hideAcComponment();
                }else{
                    addBreakComponment();
                }
                break;
            default:
                break;
        }

        console.log("key event return",e.type,e.keyCode);
        e.preventDefault();
    }
    let getTableSource = () =>{
        setSourceTables([{
            "tableName":"t_index_data",
            "tableAliseName":"指标算值表"
        },
        {
            "tableName":"t_txbs_stamp_item",
            "tableAliseName":"增值税税率表"
        }])
    }

    useEffect(()=>{
        console.log("use effect call for getsource table")
    },
    [sourceTables]);
    useEffect(()=>{
        console.log("use effect call for select Index")
    },
    [selectIndex]);

    let activeValue = sourceTables[selectIndex];
    return (<div className="editorContainer" style={{width:widthpx, height:heightpx}}>
        <div className="editor"  onClick={handleMouseEvent} onContextMenu={handleMouseEvent} >
         {conditionNodes.map((item)=>{
            return (<ConditionBlock isEdit={item.isEdit} />);
        })}
         <input ref={inputRef} onKeyDown={handleKeyEvent} />
        </div>
        <AutoCompleteItem config={acOption} data={sourceTables} activeValue={activeValue} />
        </div>);
}