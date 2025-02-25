import { Reorder, useDragControls } from "framer-motion";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { GripVerticalIcon, Trash2Icon } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface ILinkItemProps {
  index: number,
  isDraggingActive: null | boolean,
  link: {
    title: string,
    url: string,
  }
  onHandleDragEnd: () => void
  onHanldeDragStart: () => void
  onRemove: () => void
}
export function LinkItem(
  {
    link, 
    index, 
    isDraggingActive, 
    onHandleDragEnd, 
    onHanldeDragStart, 
    onRemove
  }: ILinkItemProps){

  const form  = useFormContext()
  const controls = useDragControls()

    return (
      <Reorder.Item
        value={link}
        onDragStart={onHanldeDragStart}
        onDragEnd={onHandleDragEnd}
        className="relative"
        dragListener={false}
        dragControls={controls}
      >
        <div 
          className={cn(
            "flex gap-4 transition-opacity",
            isDraggingActive === false && 'opacity-50'
          )}
        >
          <div className="flex-1 flex gap-4 items-end">
            <Button
              type="button" 
              variant='link'
              className="cursor-grab"
              onPointerDown={(e) => controls.start(e)}
            >
              <GripVerticalIcon className="size-4"/>
            </Button>
            <div className="flex-1 space-y-2">
              <Label htmlFor="title">Títulos</Label>
              <Input id="title" {...form.register(`links.${index}.title`)}/>
            </div>
          </div>

          <div className="flex-1 flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input id="url" {...form.register(`links.${index}.url`)}/>
            </div>

            <Button 
              type="button" 
              variant='destructive'
              onClick={onRemove}
              tabIndex={-1}
            >
              <Trash2Icon className="size-4"/>
            </Button>
          </div>
        </div>
      </Reorder.Item>
    )
}