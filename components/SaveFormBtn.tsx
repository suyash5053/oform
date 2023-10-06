import React from 'react'
import {Button} from "@/components/ui/button";
import {HiSaveAs} from "react-icons/hi";

function SaveFormBtn() {
    return (
        <Button variant={"outline"} className={"gap-2"}>
            <HiSaveAs className={"h-6 w-6"} />
            Save  New Form
        </Button>
    );
}

export default SaveFormBtn
