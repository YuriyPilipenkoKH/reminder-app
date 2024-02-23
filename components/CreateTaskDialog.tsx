"use client"

import { Collection } from "@prisma/client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { cn } from "@/lib/utils"
import { CollectionColor, CollectionColors } from "@/lib/constants"
import { useForm } from "react-hook-form"
import { createTaskSchema, createTaskSchemaType } from "@/schema/createTask"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Textarea } from "./ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { Button } from "./ui/button"
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

 interface Props {
    open: boolean
    collection: Collection
    setOpen: (open: boolean) => void
 }

function CreateTaskDialog({open, collection, setOpen}: Props) {
    const form = useForm<createTaskSchemaType>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            collectionId: collection.id,

        }
    })
    const onOpenChangeWrapper =(value: boolean) => {
        setOpen(value)
    }
    const onSubmit = async (data: createTaskSchemaType) => {
        console.log('submit', data)
    }

  return (
    <Dialog 
    open={open}
    onOpenChange ={onOpenChangeWrapper} >
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex gap-2">
                  Add task to collection :
                   <span className={
                    cn("p-[1px] bg-clip-text text-transparent",
                    CollectionColors[collection.color as CollectionColor])
                   }>
                    { collection.name }</span>
                </DialogTitle>
                <DialogDescription>
                  Add a task to your collection <br/>
                   You can add as many tasks as you want
                </DialogDescription>
            </DialogHeader>
            <div className="gap-4 py-4">
                <Form {...form}>
                   <form className="flex flex-col space-y-4 "
                   onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField 
                    control = {form.control}
                    name={'content'}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                content
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                className="resize-none" 
                                {...field}
                                rows={5}
                                placeholder="Task conternt here"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField 
                    control = {form.control}
                    name={'content'}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                expires at
                            </FormLabel>
                            <FormDescription>
                              When should this task expire?  
                            </FormDescription>
                            <FormControl>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button className={cn(
                                            "justify-start text-left font-normal w-full",
                                            !field.value && 'text-muted-foreground '
                                        )}
                                        variant={'outline'}>
                                          <CalendarIcon className="mr-2 h-4 w-4"/> 
                                          {field.value && format(field.value, 'PPP')}
                                          {!field.value && <span> No expiration</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <Calendar 
                                        mode ="single"
                                        selected={field.value ? new Date(field.value) : undefined}
                                        onSelect={field.onChange}
                                        initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />

                   </form>
                </Form>
            </div>
        <DialogFooter>
            <Button
            disabled ={form.formState.isSubmitting}
            className={cn(
                'w-full dark:text-white text-white',
                CollectionColors[collection.color as CollectionColor] )}
                > 
            Confirm 
            {form.formState.isSubmitting && (
                <ReloadIcon className="animate-spin h-4 w-4 ml-2"/>
            )}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTaskDialog 


