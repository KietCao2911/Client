import "./LoadingElement.scss"
const LoadingElement=(props)=>
{
    return <div {...props} className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
}
export default LoadingElement