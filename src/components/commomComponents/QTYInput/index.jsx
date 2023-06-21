import { Space } from "antd"
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Minus, Plus } from "react-feather"
import "./QTYInput.scss"
const QTYInput =(props)=>
{
    const {handlePlus,handleMinus} = props;
    return <div className="QTYInput">
            <Space  >
                <Minus onClick={handleMinus}/>
                <input type="number" {...props}/>
                <Plus onClick={handlePlus}/>
            </Space>
    </div>
}

export default QTYInput