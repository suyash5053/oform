"use client";
import {FormElementInstance} from "@/components/FormElements";
import React, {createContext, ReactNode, useState} from "react";

type DesignerContextType = {
    elements: FormElementInstance[];
    addElement: (index: number, element: FormElementInstance) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider ({
    children,
}: {
    children: ReactNode;
}) {
    const [elements, setElements] = useState<FormElementInstance[]>([]);
    const addElement = (index: number, element: FormElementInstance) => {
        setElements((prev) => {
            const copy = [...prev];
            copy.splice(index, 0, element);
            return copy;
        });
    };
    // const removeElement = (index: number) => {
    //     setElements((prev) => {
    //         const copy = [...prev];
    //         copy.splice(index, 1);
    //         return copy;
    //     });
    // };
    // const updateElement = (index: number, element: FormElementInstance) => {
    //     setElements((prev) => {
    //         const copy = [...prev];
    //         copy[index] = element;
    //         return copy;
    //     });
    // };
    // const moveElement = (index: number, newIndex: number) => {
    //     setElements((prev) => {
    //         const copy = [...prev];
    //         const element = copy[index];
    //         copy.splice(index, 1);
    //         copy.splice(newIndex, 0, element);
    //         return copy;
    //     });
    // };
    // const contextValue: DesignerContextType = {
    //     elements,
    //     addElement,
    //     removeElement,
    //     updateElement,
    //     moveElement,
    // };
    return (
        <DesignerContext.Provider
            value={{
                elements,
                addElement,
        }}
        >
            {children}
        </DesignerContext.Provider>
    );
}
