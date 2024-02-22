import { useForm } from "react-hook-form"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet"
import { createCollectionSchema, createCollectionSchemaType } from "@/schema/createCollection"
import {zodResolver} from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { CollectionColor, CollectionColors } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { createCollection } from "@/actions/collection"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

function CreateCollectionSheet({open, onOpenChange } :Props ) {
    const form = useForm<createCollectionSchemaType>({
        defaultValues: {},
        resolver: zodResolver(createCollectionSchema),
    })
    const onSubmit = async(data: createCollectionSchemaType) => {
        console.log('SUB',data)
        try {
            await createCollection(data)
        } 
        catch (error: any) {
            alert("ERROR")
        }
    }
    const openChangeWrapper =(open:boolean) => {
        form.reset()
        onOpenChange(open)
    }

  return (
    <Sheet open={open} onOpenChange={openChangeWrapper}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Add new collection</SheetTitle>
                <SheetDescription>Collections`re way to group your tasks</SheetDescription>
            </SheetHeader>
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 flex flex-col"
                autoComplete="off"
                noValidate
                >
                <FormField 
                    control={form.control} 
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name
                            <FormControl>
                                <Input 
                                placeholder="Personal"
                                {...field}
                                />
                            </FormControl>
                            <FormDescription>Collection name</FormDescription>
                            <FormMessage/>
                            </FormLabel>
                        </FormItem>
                    )}
                />

                <FormField 
                control={form.control}
                name="color"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Color
                        <FormControl>
                            <Select 
                            onValueChange={color => field.onChange(color)}>
                                <SelectTrigger className={cn('w-full h-8 text-white', CollectionColors[field.value as CollectionColor ])}>
                                    <SelectValue 
                                    className="w-full h-8"
                                    placeholder="Color" />
                                </SelectTrigger>
                                <SelectContent className="w-full ">
                                {Object.keys(CollectionColors).map(color => (
                                    <SelectItem
                                    key={color}
                                    value={color} 
                                    className={cn('w-full h-8 rounded-md my-1 text-white focus:text-white focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white focus:px-8',
                                    CollectionColors[color as CollectionColor]
                                    )}
                                     >
                                        {color}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormDescription>
                            Select a color for your collection
                        </FormDescription>
                        <FormMessage/>
                        </FormLabel>
                    </FormItem>
                )}
                />
                </form>
            </Form>
            <div className="flex flex-col gap-3 mt-4">
                <Separator/>
                <Button
                type="submit"
                variant={'outline'}
                className={cn(
                   form.watch('color') && 
                   CollectionColors[form.getValues('color') as CollectionColor]
                )}
                onClick={form.handleSubmit(onSubmit)}
                >Confirm</Button>
            </div>
        </SheetContent>
    </Sheet>
  )
}

export default CreateCollectionSheet