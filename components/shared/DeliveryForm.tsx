import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Autocomplete from "@mui/material/Autocomplete";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileUploader } from "./FileUploader";
import { SetStateAction, useState } from "react";
import Image from "next/image";
import { DeliverySchema, ProductSchema } from "@/lib/validator";
import { IProduct } from "@/lib/database/models/product.model";
import { usePathname, useRouter } from "next/navigation";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import {
  CATEGORIES,
  COLORS,
  DeliveryDefaultValues,
  GENDER_AGE_GROUP,
  GENDERAGEGROUP,
  MATERIALS,
  OCCASIONS,
  ProductDefaultValues,
  trendingStatusOptions,
} from "@/constants";
import { useUploadThing } from "@/lib/uploadthing";
import { Textarea } from "../ui/textarea";
import { TextField } from "@mui/material";
import { Checkbox } from "../ui/checkbox";
import { createProduct, updateProduct } from "@/lib/actions/ad.product";
import { useToast } from "../ui/use-toast";
import ProductQRCode from "./ProductQRCode";
import ProductQRwindow from "./ProductQRwindow";
import { IDelivery } from "@/lib/database/models/delivery.model";
import {
  createDelivery,
  createMethods,
  updateDelivery,
} from "@/lib/actions/delivery.actions";
import React from "react";
// Infer the form data type from Zod schema
type DeliveryFormData = z.infer<typeof DeliverySchema>;
type ProductFormProps = {
  type: string;
  delivery?: IDelivery;
  deliveryId?: string;
  userId: string;
};
export const DeliveryForm = ({
  type,
  delivery,
  deliveryId,
  userId,
}: ProductFormProps) => {
  const [newTag, setNewTag] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();
  const pathname = usePathname();
  const initialValues =
    delivery && type === "Update"
      ? {
          ...delivery,
        }
      : DeliveryDefaultValues;
  const router = useRouter();
  const form = useForm<DeliveryFormData>({
    resolver: zodResolver(DeliverySchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: DeliveryFormData) {
    if (type === "Create") {
      try {
        // const payload = {
        //   userId,
        //   delivery: {
        //    ...values,
        //  },
        //   path: pathname,
        // };
        //console.log(
        //  "Payload before submission:",
        //  JSON.stringify(payload, null, 2)
        // );
        const newDelivery = await createMethods({
          userId,
          delivery: {
            ...values,
          },
          path: pathname,
        });

        if (newDelivery) {
          form.reset();
          toast({
            title: "Submited!",
            description: "Method created successfully",
            duration: 5000,
            className: "bg-[#000000] text-white",
          });
          //  router.push(pathname);
          //  router.push(`/home/${newProduct._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (type === "Update") {
      try {
        if (!deliveryId) {
          router.back();
          return;
        }

        const updatedDelivery = await updateDelivery({
          userId,
          delivery: {
            ...values,
            _id: deliveryId,
          },
          path: pathname,
        });

        if (updatedDelivery) {
          form.reset();
          // router.push(`/home/${updatedProduct._id}`);
          toast({
            title: "Updated!",
            description: "Method details updated successfully",
            duration: 5000,
            className: "bg-[#000000] text-white",
          });
          // router.push(`/home/`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    // console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex p-1 flex-col gap-5"
      >
        <div className="flex border-b justify-between">
          <h2 className="font-bold p-2 text-[30px]">Delivery Method</h2>
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Product Name */}
          <FormField
            control={form.control}
            name="method"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="w-full overflow-hidden px-4 py-2">
                    <div className="grid w-full gap-1.5">
                      <TextField
                        {...field}
                        multiline
                        rows={2} // You can adjust this number based on your preference
                        label="Method*"
                        className="w-full"
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="w-full overflow-hidden rounded-full px-4 py-2">
                    <TextField
                      {...field}
                      label="Location*"
                      className="w-full"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="w-full overflow-hidden rounded-full px-4 py-2">
                    <TextField
                      {...field}
                      label="Price e.g. (Ksh 100)*"
                      className="w-full"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="areas"
            render={({ field }) => {
              const handleAddAreas = () => {
                if (!inputValue.trim()) return; // Avoid empty input

                const newAreas = inputValue
                  .split(",")
                  .map((area) => area.trim())
                  .filter(
                    (area) => area.length > 0 && !field.value?.includes(area)
                  ); // Avoid duplicates and empty strings

                field.onChange([...(field.value || []), ...newAreas]); // Update the field value
                setInputValue(""); // Clear the input field
              };

              return (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="w-full overflow-hidden px-4 py-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Areas*
                      </label>

                      {/* Display the list of areas */}
                      <div className="flex flex-wrap gap-2 py-2">
                        {field.value?.map((area: string, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 bg-gray-200 text-sm rounded"
                          >
                            {area}
                            <button
                              type="button"
                              onClick={() => {
                                const updatedAreas = (field.value ?? []).filter(
                                  (_, i) => i !== index
                                );
                                field.onChange(updatedAreas); // Update the form field with the new list
                              }}
                              className="ml-1 text-red-500"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>

                      {/* Input for adding new areas */}
                      <div className="flex gap-2">
                        <TextField
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Enter areas separated by commas"
                          className="flex-1 border p-2 rounded"
                        />
                        <button
                          type="button"
                          onClick={handleAddAreas}
                          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="w-full overflow-hidden px-4 py-2">
                    <div className="grid w-full gap-1.5">
                      <TextField
                        {...field}
                        multiline
                        rows={2} // You can adjust this number based on your preference
                        label="Note*"
                        className="w-full"
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          <div className="flex gap-1 items-center">
            {form.formState.isSubmitting && (
              <CircularProgressWithLabel value={uploadProgress} />
            )}

            {form.formState.isSubmitting ? "Submitting..." : `${type} Method `}
          </div>
        </Button>
      </form>
    </Form>
  );
};
