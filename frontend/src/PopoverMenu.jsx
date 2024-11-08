import { Button,Popover,Popper } from "@mui/material"
import "./popoverMenu.css"

export default function PopoverMenu({options}){
    const {open,SetOpen,anchorEl,anchorOrigin,content} = options

    return(
            <Popover
            open={open} 
            onClose={()=>{SetOpen(false)}}
            anchorEl={anchorEl}
            anchorOrigin={anchorOrigin}
            >
                {content.map((i,index)=>{
                    return(
                        <Popper 
                        key={index} 
                        component={"div"} 
                        className="popper" 
                        open={true}>
                            
                            <Button className="popperBtn"
                            onClick={i.action}>

                                {i.icon && 
                                    <span className="popperIcon">
                                        {i.icon}
                                    </span>
                                }

                                <p>{i.text}</p>

                            </Button>
                        </Popper>
                    )
                })}

            </Popover>
    )
}