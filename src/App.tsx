import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { useForm } from "react-hook-form";

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

  const links = form.watch('links');

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight">Links</h1>

        <form className="mt-10 flex flex-col gap-4">

          {links.map((_, index) => (
             <div key={index}className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="title">Títulos</Label>
                  <Input id="title" {...form.register(`links.${index}.title`)}/>
                </div>
    
                <div className="flex-1 flex gap-4 items-end">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="url">URL</Label>
                    <Input id="url" {...form.register(`links.${index}.url`)}/>
                  </div>
    
                  <Button variant='destructive'>
                    <Trash2Icon className="size-4"/>
                  </Button>
                </div>
              </div>
          ))}

          <Button className="w-full border-dashed mt-6" variant='outline'>
            <PlusCircleIcon className="size-4 mr-1" />
            Adicionar novo Link
          </Button>
        </form>
      </div>
    </div>
  )
}
