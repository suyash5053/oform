"use client";
import React from 'react'
import {Form} from "@prisma/client";
import PreviewDialogBtn from "@/components/PreviewDialogBtn";
import SaveFormBtn from "@/components/SaveFormBtn";
import PublishFormBtn from "@/components/PublishFormBtn";
import Designer from "@/components/Designer";
import {DndContext} from "@dnd-kit/core";
import DragOverlayWrapper from "@/components/DragOverlayWrapper";

function FormBuilder({form}: {form: Form}) {
    return (
        <DndContext>
            <main className={"flex flex-col w-full"}>
                <nav className={"flex justify-between border-b-2 p-4 gap-3 items-center"}>
                    <h2 className={"truncate font-medium"}>
                        <span className={"text-muted-foreground mr-2"}>Form : </span>
                        {form.name}
                    </h2>
                    <div className={"flex items-center gap-2"}>
                        <PreviewDialogBtn />
                        {!form.published && (
                            <>
                                <SaveFormBtn />
                                <PublishFormBtn />
                            </>
                        )}
                    </div>
                </nav>
                <div className={"flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/texture.svg)] dark:bg-[url(/texture-dark.svg)]"}>
                    <Designer />
                </div>
            </main>
            <DragOverlayWrapper />
        </DndContext>
    );
}

export default FormBuilder
