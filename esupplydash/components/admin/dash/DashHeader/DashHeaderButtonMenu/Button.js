import { Button } from "@material-ui/core"
import React from "react"

export default function Named({children, className, onClick}){
    return (
       <Button variant="contained" className={
        className ? className : ''
       } onClick={onClick}>{children}</Button>
    )
}