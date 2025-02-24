import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { useFieldArray, useForm } from "react-hook-form";
import { Reorder } from "framer-motion";
import { useState } from "react";
import { cn } from "./lib/utils";

export default function App() {
  const form = useForm({
    defaultValues: {
      links: [
        {
          title: 'Link 01',
          url: 'https://google.com'
        },
        {
          title: 'Link 02',
          url: 'https://instagram.com'
        }
      ]
    }
  });

  const links = useFieldArray({
    control: form.control,
    name: 'links',
  })

  const [dragginIndex, setDragginIndex] = useState<null | number>(null)

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data.links.map((link, index) => ({
      ...link,
      order: index + 1
    })))
  })

  function hanldeDragStart(index: number){
    setDragginIndex(index)
  }

  function handleDragEnd(){
    setDragginIndex(null)
  }

  function handleReorder(newOrder: typeof links.fields){
    if(dragginIndex === null) return

    const draggingLink = links.fields[dragginIndex]

    newOrder.forEach((link, index) =>{
      if(link === draggingLink){
        links.move(dragginIndex, index)
        setDragginIndex(index)
      }
    })
  }

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight mt-10 mb-5">Links</h1>

        <Button 
            type="button"
            className="w-full border-dashed mb-6" 
            variant='outline'
            onClick={() => links.prepend({ title: '', url: '' })}
          >
            <PlusCircleIcon className="size-4 mr-1" />
            Adicionar no topo da lista
          </Button>

        <form onSubmit={handleSubmit} className=" flex flex-col gap-4">

          <Reorder.Group
            axis="y" //eixo
            values={links.fields} //array de valores
            onReorder={handleReorder}
            className="space-y-4"
          >
            {links.fields.map((link, index) => (
              <Reorder.Item
                key={link.id}
                value={link}
                onDragStart={() => hanldeDragStart(index)}
                onDragEnd={handleDragEnd}
                className="relative"
              >
                <div 
                  className={cn(
                    "flex gap-4 transition-opacity",
                    dragginIndex !== null && dragginIndex !== index && 'opacity-50'
                  )}
                >
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="title">Títulos</Label>
                    <Input id="title" {...form.register(`links.${index}.title`)}/>
                  </div>
      
                  <div className="flex-1 flex gap-4 items-end">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="url">URL</Label>
                      <Input id="url" {...form.register(`links.${index}.url`)}/>
                    </div>
      
                    <Button 
                      type="button" 
                      variant='destructive'
                      onClick={() => links.remove(index)}
                      tabIndex={-1}
                    >
                      <Trash2Icon className="size-4"/>
                    </Button>
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>

          <Button 
            type="button"
            className="w-full border-dashed mt-6" 
            variant='outline'
            onClick={() => links.append({ title: '', url: '' })}
          >
            <PlusCircleIcon className="size-4 mr-1" />
            Adicionar novo Link
          </Button>

          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="secondary" 
              className="flex-1"
              onClick={() => links.insert(1, { title: '', url: '' })}
            >
              Insert
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              className="flex-1"
              onClick={() => links.move(1,0)}
            >
              Move
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              className="flex-1"
              onClick={() => links.replace([{ title: 'Replace', url: 'https://facebook.com' }])}
            >
              Replace
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              className="flex-1"
              onClick={() => links.swap(1,0)}
            >
              Swap
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              className="flex-1"
              onClick={() => {
                //links.update(1, {title: 'Update', url: 'https://twitter.com'})
                form.setValue('links.1.title', 'Update')
                form.setValue('links.1.url', 'https://twitter.com')
              }}
            >
              Update
            </Button>
          </div>

          <Button type="submit" className="w-full mt-6">
            Salvar
          </Button>
        </form>
      </div>
    </div>
  )
}
