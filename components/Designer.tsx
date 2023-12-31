"use client"
import React from 'react'
import DesignerSidebar from "@/components/DesignerSidebar";
import {useDndMonitor, useDroppable} from "@dnd-kit/core";
import {cn} from "@/lib/utils";
import useDesigner from "@/components/hooks/useDesigner";
import {ElementsType, FormElementInstance, FormElements} from "@/components/FormElements";
import {idGenerator} from "@/lib/idGenerator";

function Designer() {
    const { elements, addElement } = useDesigner();
    const droppable = useDroppable({
        id: "designer-drop-area",
        data: {
            isDesignerDropArea: true,
        },
    });

    useDndMonitor({
        onDragEnd: (e) => {
            const {active, over} = e;
            if (!active || !over) return;

            const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
            if (isDesignerBtnElement) {
                const type = active.data?.current?.type;
                const newElement = FormElements[type as ElementsType].construct(idGenerator());
                addElement(0, newElement);
                }
            }
    });
    return (
        <div className={"flex w-full h-full"}>
            <div className={"p-4 w-full"}>
                <div
                    ref={droppable.setNodeRef}
                    className={cn("bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
                    droppable.isOver && "ring-2 ring-primary/20"
                    )}
                >
                    {!droppable.isOver && elements.length === 0 && (
                        <p className={"text-3xl text-muted-foreground flex flex-grow items-center font-bold"}>
                            Drop here
                        </p>
                    )}
                    {elements.length>0 && (
                        <div className={"flex flex-col w-full gap-2 p-4"}>
                            {elements.map((element) => (
                                <DesignerElementWrapper key={element.id} element={element} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <DesignerSidebar />
        </div>
    );
}

function DesignerElementWrapper({element}: {element: FormElementInstance}) {
    const topHalf = useDroppable({
        id: element.id + "-top",
        data: {
            type: element.type,
            elementId: element.id,
            isTopHalfDesignerElement: true,
        },
    });
    const bottomHalf = useDroppable({
        id: element.id + "-bottom",
        data: {
            type: element.type,
            elementId: element.id,
            isBottomHalfDesignerElement: true,
        }
    });


    const DesignerElement = FormElements[element.type].designerComponent;
    return (
        <div className={"relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"}>
            <div
                ref={topHalf.setNodeRef}
                className={"absolute w-full h-1/2 rounded-t-md"}/>
            <div
                ref={bottomHalf.setNodeRef}
                className={"absolute w-full h-1/2 rounded-b-md bottom-0"}/>
            <div className={"flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none"}>
                <DesignerElement elementInstance={element}/>
            </div>
        </div>
    );
}

export default Designer
