import { PlusCircleIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import { Reorder } from "framer-motion";
import { useState } from "react";
import { LinkItem } from "./components/LinkItem";

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

  const [draggingIndex, setdraggingIndex] = useState<null | number>(null)

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data.links.map((link, index) => ({
      ...link,
      order: index + 1
    })))
  })

  function hanldeDragStart(index: number){
    setdraggingIndex(index)
  }

  function handleDragEnd(){
    setdraggingIndex(null)
  }

  function handleReorder(newOrder: typeof links.fields){
    if(draggingIndex === null) return

    const draggingLink = links.fields[draggingIndex]

    newOrder.forEach((link, index) =>{
      if(link === draggingLink){
        links.move(draggingIndex, index)
        setdraggingIndex(index)
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

        <FormProvider {...form}>
          <form onSubmit={handleSubmit} className=" flex flex-col gap-4">

            <Reorder.Group
              axis="y" //eixo
              values={links.fields} //array de valores
              onReorder={handleReorder}
              className="space-y-4"
            >
              {links.fields.map((link, index) => (
                <LinkItem 
                  key={link.id}
                  link={link}
                  index={index}
                  isDraggingActive={draggingIndex === null ? null : draggingIndex === index}
                  onHanldeDragStart={() => hanldeDragStart(index)}
                  onHandleDragEnd={handleDragEnd}
                  onRemove={() => links.remove(index)}
                />
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
        </FormProvider>
      </div>
    </div>
  )
}
