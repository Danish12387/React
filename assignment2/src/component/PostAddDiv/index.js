import "./index.css"

function PostAddDiv (props) {
    const {img, span} = props

    return (<div className="PostAdOptionDiv">
        <img src={img}/>
        <span>{span}</span>
        <img className="PostAdOptionDiv_arrow" src="https://cdn-icons-png.flaticon.com/512/32/32213.png"/>
    </div>)
}
export default PostAddDiv;