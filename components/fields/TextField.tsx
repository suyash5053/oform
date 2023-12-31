"use client";

import {ElementsType, FormElement, FormElementInstance} from "@/components/FormElements";
import {MdTextFields} from "react-icons/md";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

const type: ElementsType = "TextField";

const extraAttributes = {
    label: "Text Field",
    helperText: "This is a text field",
    required: false,
    placeholder: "Value here..",
}

export const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: MdTextFields,
        label: "Text Field",
    },
    designerComponent: DesignerComponent,
    formComponent: () => <div>Form Component</div>,
    propertiesComponent: () => <div>Properties Component</div>
};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
}

function DesignerComponent( {elementInstance}: {elementInstance: FormElementInstance})
{
    const element = elementInstance as CustomInstance;
    const {label, helperText, required, placeholder} = element.extraAttributes;
    return (
        <div className={"flex flex-col gap-2 w-full"}>
            <Label>
                {label}
                {required && "*"}
            </Label>
            <Input readOnly disabled placeholder={placeholder} />
            {helperText &&
                (<p className={"text-muted-foreground text-[0.8rem]"}>
                    {helperText}
                </p>
                )}
        </div>
    );
}