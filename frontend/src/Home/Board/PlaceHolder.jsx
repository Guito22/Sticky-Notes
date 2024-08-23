
export default function PlaceHolder({index,dragStartFunction,dragEndFunction,dropFunction,clickFunction}){

    return(
        <div 
        onDragStart={()=>{dragStartFunction(index)}}
        onDragEnd={dragEndFunction} 
        onDragOver={(e)=>e.preventDefault()}
        onDrop={()=>{dropFunction(index)}}
        onClick={()=>{clickFunction(index)}}
        className="card col-10 col-md-5 h-50" 
        aria-hidden="true" 
        draggable="true"
        >
            <div className="card-body">
                <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6">{index}</span>
                </h5>
                <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
                </p>
                <a className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
            </div>
        </div>
    )
}