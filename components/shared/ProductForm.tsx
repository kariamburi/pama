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
import { ProductSchema } from "@/lib/validator";
import { IProduct } from "@/lib/database/models/product.model";
import { usePathname, useRouter } from "next/navigation";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import {
  CATEGORIES,
  COLORS,
  GENDER_AGE_GROUP,
  GENDERAGEGROUP,
  MATERIALS,
  OCCASIONS,
  ProductDefaultValues,
  trendingStatusOptions,
} from "@/constants";
import { useUploadThing } from "@/lib/uploadthing";
import { Textarea } from "../ui/textarea";
import { Box, Chip, InputAdornment, TextField } from "@mui/material";
import { Checkbox } from "../ui/checkbox";
import { createProduct, updateProduct } from "@/lib/actions/ad.product";
import { useToast } from "../ui/use-toast";
import ProductQRCode from "./ProductQRCode";
import ProductQRwindow from "./ProductQRwindow";
import { SoldConfirmation } from "./SoldConfirmation";
// Infer the form data type from Zod schema
type ProductFormData = z.infer<typeof ProductSchema>;
type ProductFormProps = {
  type: string;
  product?: IProduct;
  productId?: string;
  userId: string;
};
export const ProductForm = ({
  type,
  product,
  productId,
  userId,
}: ProductFormProps) => {
  const [newTag, setNewTag] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const pathname = usePathname();
  const initialValues =
    product && type === "Update"
      ? {
          ...product,
        }
      : ProductDefaultValues;
  const router = useRouter();
  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: initialValues,
  });
  const { startUpload } = useUploadThing("imageUploader");
  let uploadedImageUrl: string[] = [];
  const parseCurrencyToNumber = (value: string): number => {
    // Remove any commas from the string and convert to number
    return Number(value.replace(/,/g, ""));
  };
  function generateSku() {
    const timestamp = Date.now(); // Get current timestamp
    const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Generate random string
    const generatedSku = `SKU-${timestamp}-${randomString}`;

    return generatedSku; // Simple example SKU
  }
  async function onSubmit(values: ProductFormData) {
    uploadedImageUrl = values.imageUrls;

    if (files.length > 0) {
      // Upload all files concurrently

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const uploadedImages = await startUpload([file]);
          if (uploadedImages && uploadedImages.length > 0) {
            uploadedImageUrl.push(uploadedImages[0].url);
            setUploadProgress(Math.round(((1 + i) / files.length) * 100));
          }
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    }
    if (type === "Create") {
      uploadedImageUrl = uploadedImageUrl.filter(
        (url) => !url.includes("blob:")
      );
      try {
        const newProduct = await createProduct({
          product: {
            ...values,
            price: parseCurrencyToNumber(form.getValues("price").toString()),
            imageUrls: uploadedImageUrl,
            sku: generateSku(),
          },
          userId,
          path: pathname,
        });
        if (newProduct) {
          form.reset();
          toast({
            title: "Submited!",
            description: "Product created successfully",
            duration: 5000,
            className: "bg-[#30AF5B] text-white",
          });
          router.push(pathname);
          //  router.push(`/home/${newProduct._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (type === "Update") {
      try {
        if (!productId) {
          router.back();
          return;
        }
        uploadedImageUrl = uploadedImageUrl.filter(
          (url) => !url.includes("blob:")
        );

        const updatedProduct = await updateProduct({
          userId,
          product: {
            ...values,
            price: parseCurrencyToNumber(form.getValues("price").toString()),
            imageUrls: uploadedImageUrl,
            _id: productId,
          },
          path: pathname,
        });

        if (updatedProduct) {
          form.reset();
          // router.push(`/home/${updatedProduct._id}`);
          toast({
            title: "Updated!",
            description: "Product details updated successfully",
            duration: 5000,
            className: "bg-[#30AF5B] text-white",
          });
          router.push(`/home/`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    // console.log(values);
  }
  const [newSize, setNewSize] = useState(""); // Define newSize as a state variable

  const formatToCurrency = (value: string | number) => {
    if (!value) return "0";
    const numberValue =
      typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numberValue);
  };
  const [selectedType, setSelectedType] = useState(null); // Clothes or Accessories
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); // Unisex, Men, Women, Kids...
  const [selectedKidsCategory, setSelectedKidsCategory] = useState(null); // Girls, Boys, Babies
  const [itemOptions, setItemOptions] = useState<string[]>([]); // Final list of items (typed as string[])

  const handleTypeChange = (event: any, newValue: any) => {
    setSelectedType(newValue);
    setSelectedSubcategory(null);
    setSelectedKidsCategory(null);
    setItemOptions([]);
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleSubcategoryChange = (event: any, newValue: any) => {
    setSelectedSubcategory(newValue);
    if (newValue && selectedType) {
      if (newValue === "Kids") {
        // Show Girls, Boys, Babies if "Kids" is selected
        setItemOptions(["Girls", "Boys", "Babies"]);
      } else {
        const subcategories = CATEGORIES[selectedType][newValue] || {};
        const options = Array.isArray(subcategories)
          ? subcategories
          : Object.values(subcategories).flat();
        setItemOptions(options.sort() as string[]);
      }
    } else {
      setItemOptions([]);
    }
  };

  const handleKidsCategoryChange = (event: any, newValue: any) => {
    setSelectedKidsCategory(newValue);

    if (newValue && selectedType && selectedSubcategory) {
      // Ensure options is typed as string[] (array of strings)
      const subcategories = CATEGORIES[selectedType][selectedSubcategory] || {};
      const options: string[] = subcategories[newValue] || []; // Explicitly typing options as string[]

      // Sort the options if it's an array of strings
      setItemOptions(options.sort());
    } else {
      setItemOptions([]); // Clear options if no valid category is selected
    }
  };
  const [newListingTitle, setNewListingTitle] = useState("");
  const [newListingStock, setNewListingStock] = useState<number>(0); // Initializing isChecked as false
  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setNewListingTitle(event.target.value);
  };

  const [selectedColors, setSelectedColors] = useState<any[]>([]); // For multiple primary colors
  const [selectedSubcolors, setSelectedSubcolors] = useState<any[]>([]); // For subcolors

  const handleColorChange = (event: any, newValue: any) => {
    setSelectedColors(newValue); // Set selected primary colors
    setSelectedSubcolors([]); // Reset subcolors when primary colors change
  };

  const handleSubcolorChange = (event: any, newValue: any) => {
    setSelectedSubcolors(newValue); // Set multiple subcolors
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex p-1 flex-col gap-0"
      >
        <div className="flex border-b justify-between">
          <h2 className="font-bold p-2 text-[30px]">Product Details</h2>
          <div className="flex items-center">
            {product?.sku && (
              <>
                <div
                  onClick={handleOpen}
                  className={`flex border gap-1 text-xs rounded-full items-center cursor-pointer text-gray-800 p-2 hover:bg-gray-100`}
                >
                  Print QR Code [{product?.sku}]
                </div>

                <ProductQRwindow
                  isOpen={isOpen}
                  onClose={handleClose}
                  sku={product?.sku}
                />
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="imageUrls"
            render={({ field }) => (
              <FormItem className="w-full p-3">
                <FormControl>
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrls={field.value}
                    setFiles={setFiles}
                    userName={""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Product Name */}

          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="w-full overflow-hidden rounded-full px-4 py-2">
                    <TextField
                      {...field}
                      label="Product Name*"
                      className="w-full"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Price */}
        </div>
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="w-full overflow-hidden px-4 py-2">
                    <div className="grid w-full gap-1.5">
                      <TextField
                        {...field}
                        multiline
                        rows={5} // You can adjust this number based on your preference
                        label="Description*"
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
          {/* Category */}

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="w-full overflow-hidden rounded-full px-4 py-2">
                    <Autocomplete
                      id="category"
                      options={Object.keys(CATEGORIES)}
                      getOptionLabel={(option) => option}
                      value={selectedType || null}
                      onChange={(event, newValue) => {
                        handleTypeChange(event, newValue);
                        field.onChange(newValue ? newValue : null);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Category*" />
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dropdown for selecting Unisex, Men, Women, or Kids */}
          <FormField
            control={form.control}
            name="genderAgeGroup"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="w-full overflow-hidden rounded-full px-4 py-2">
                    <Autocomplete
                      id="genderAgeGroup"
                      options={
                        selectedType
                          ? Object.keys(CATEGORIES[selectedType])
                          : []
                      }
                      getOptionLabel={(option) => option}
                      value={selectedSubcategory || null}
                      onChange={(event, newValue) => {
                        handleSubcategoryChange(event, newValue);
                        field.onChange(newValue ? newValue : null);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Gender Age Group*" />
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* If "Kids" is selected, show Girls, Boys, or Babies */}
          {selectedSubcategory === "Kids" && (
            <FormField
              control={form.control}
              name="genderAgeGroup"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="w-full overflow-hidden rounded-full px-4 py-2">
                      <Autocomplete
                        id="genderAgeGroup"
                        options={["Girls", "Boys", "Babies"]}
                        getOptionLabel={(option) => option}
                        value={selectedKidsCategory || null}
                        onChange={(event, newValue) => {
                          handleKidsCategoryChange(event, newValue);
                          field.onChange(newValue ? newValue : null);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Kids Category*" />
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Dropdown for selecting specific items */}
          <FormField
            control={form.control}
            name="subCategory"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="w-full overflow-hidden rounded-full px-4 py-2">
                    <Autocomplete
                      id="subCategory"
                      options={itemOptions}
                      getOptionLabel={(option) => option}
                      value={
                        itemOptions.find((item) => item === field.value) || null
                      }
                      onChange={(event, newValue) => {
                        field.onChange(newValue ? newValue : null);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Sub Category*" />
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {selectedType === "Clothes" && (
            <>
              {" "}
              <FormField
                control={form.control}
                name="fabricCareInstructions"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="w-full overflow-hidden rounded-full px-4 py-2">
                        <Autocomplete
                          id="fabricCareInstructions"
                          options={MATERIALS}
                          getOptionLabel={(option) => option}
                          value={
                            MATERIALS.find((vc) => vc === field.value) || null
                          }
                          onChange={(event, newValue) => {
                            field.onChange(newValue ? newValue : null);
                          }}
                          renderInput={(field) => (
                            <TextField
                              {...field}
                              label="Material (Optional)*"
                            />
                          )}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {(selectedSubcategory === "Women" ||
                selectedSubcategory === "Unisex") && (
                <>
                  <FormField
                    control={form.control}
                    name="occasion"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <div className="w-full overflow-hidden rounded-full px-4 py-2">
                            <Autocomplete
                              id="occasion"
                              options={OCCASIONS}
                              getOptionLabel={(option) => option}
                              value={
                                OCCASIONS.find((vc) => vc === field.value) ||
                                null
                              }
                              onChange={(event, newValue) => {
                                field.onChange(newValue ? newValue : null);
                              }}
                              renderInput={(field) => (
                                <TextField {...field} label="Occasion*" />
                              )}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </>
          )}
        </div>
        {/* Additional Fields */}
        <div className="border-b">
          <h2 className="font-bold p-2 text-[30px]">Attribute</h2>
        </div>
        <div className="flex flex-col gap-5">
          {/* Occasion, Season, and Fabric Care Instructions */}

          {/* Style and Material */}
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => {
                // Map `string[]` to objects expected by Autocomplete
                const selectedSubcolors = (field.value || [])
                  .map((subcolorTitle) =>
                    COLORS.flatMap((color) => color.subcolors).find(
                      (subcolor) => subcolor.title === subcolorTitle
                    )
                  )
                  .filter(Boolean) as { title: string; code: string }[];

                return (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="w-full overflow-hidden rounded-full px-4 py-2">
                        <Autocomplete
                          multiple
                          value={selectedSubcolors} // Pass objects for selected subcolors
                          onChange={(event, newValue) =>
                            // Convert selected objects back to `string[]`
                            field.onChange(
                              newValue.map((option) => option.title)
                            )
                          }
                          options={COLORS.flatMap((color) => color.subcolors)} // Provide all subcolors
                          getOptionLabel={(option) => option?.title || ""} // Handle undefined case
                          renderOption={(props, option) =>
                            option ? ( // Ensure option is defined
                              <li {...props}>
                                <div className="flex items-center gap-2">
                                  <span
                                    style={{
                                      width: 20,
                                      height: 20,
                                      backgroundColor: option.code,
                                      borderRadius: "50%",
                                    }}
                                  ></span>
                                  {option.title}
                                </div>
                              </li>
                            ) : null
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Colors"
                              placeholder="Choose Colors"
                            />
                          )}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Customization Options */}
            <FormField
              control={form.control}
              name="customizationOptions"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex flex-col text-sm px-4 py-2">
                      <div className="gap-3 items-center flex">
                        <input
                          type="radio"
                          name="customizationOptions"
                          value="Made-to-Measure"
                          className="cursor-pointer"
                          checked={field.value === "Made-to-Measure"}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                        <div>Made-to-Measure</div>
                      </div>
                      <div className="gap-3 items-center flex">
                        <input
                          type="radio"
                          name="customizationOptions"
                          value="Custom Design"
                          className="cursor-pointer"
                          checked={field.value === "Custom Design"}
                          onChange={(e) => field.onChange(e.target.value)}
                        />

                        <div>Custom Design</div>
                      </div>
                      <div className="gap-3 items-center flex">
                        <input
                          type="radio"
                          name="customizationOptions"
                          value="Personalized Items"
                          className="cursor-pointer"
                          checked={field.value === "Personalized Items"}
                          onChange={(e) => field.onChange(e.target.value)}
                        />

                        <div> Personalized Items</div>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* SKU, Weight, and Dimensions */}
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="buyprice"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex item-center w-full gap-1 overflow-hidden rounded-full px-4 py-2">
                      <TextField
                        {...field}
                        label="Buy Price"
                        className="w-full"
                        value={formatToCurrency(field.value ?? 0)} // Format value as money
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
                    <div className="flex item-center w-full gap-1 overflow-hidden rounded-full px-4 py-2">
                      <TextField
                        {...field}
                        label="Sell Price"
                        className="w-full"
                        value={formatToCurrency(field.value ?? 0)} // Format value as money
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Discount */}
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex item-center w-full gap-1 overflow-hidden rounded-full px-4 py-2">
                      <TextField
                        label="Discount %"
                        {...field}
                        className="w-full"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Meta Title and Meta Description */}

          <div className="border-b">
            <h2 className="font-bold p-2 text-[30px]">
              Stock and Availability
            </h2>
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            {/* Stock Quantity */}
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex flex-col p-2 w-full rounded-2xl bg-grey-50 px-4 py-2">
                      <div>
                        <div className="flex items-center font-bold">
                          <h1>Sizes & Stock</h1>
                        </div>
                        <ul className="grid grid-cols-2 gap-2 w-full">
                          {field.value &&
                            field.value.map((feature, index) => (
                              <li
                                key={index}
                                className="flex flex-col border p-2 rounded-lg gap-2"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="font-bold">
                                    {feature.size}
                                  </span>
                                  <span
                                    className={`text-white text-xs flex items-center justify-center w-8 h-8 rounded-full ${
                                      feature.stock > 0
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                    }`}
                                  >
                                    {feature.stock > 0 ? feature.stock : "Out"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {/*   <div
                                    className="text-xs bg-gray-300 px-2 py-1 cursor-pointer rounded"
                                    onClick={() => {
                                      const updatedFeatures = [...field.value];
                                      if (updatedFeatures[index].stock > 0) {
                                        updatedFeatures[index].stock -= 1;
                                      }
                                      field.onChange(updatedFeatures);
                                    }}
                                  >
                                    Mark Sold
                                  </div>*/}
                                  <SoldConfirmation
                                    userId={userId}
                                    product={product}
                                    selectedSize={feature.size}
                                    quantity={1}
                                    instock={feature.stock}
                                  />
                                  <input
                                    type="number"
                                    disabled
                                    className="border p-1 w-16 text-center"
                                    value={feature.stock}
                                    onChange={(e) => {
                                      const updatedFeatures = [...field.value];
                                      const newStock = parseInt(
                                        e.target.value,
                                        10
                                      );
                                      updatedFeatures[index].stock = isNaN(
                                        newStock
                                      )
                                        ? 0
                                        : newStock;
                                      field.onChange(updatedFeatures);
                                    }}
                                    placeholder="Stock"
                                  />
                                  <Image
                                    src="/assets/icons/delete.svg"
                                    alt="delete"
                                    className="cursor-pointer"
                                    width={20}
                                    height={20}
                                    onClick={() => {
                                      const updatedFeatures =
                                        field.value.filter(
                                          (_, i) => i !== index
                                        );
                                      field.onChange(updatedFeatures);
                                    }}
                                  />
                                </div>
                              </li>
                            ))}
                        </ul>

                        <div className="grid grid-cols-3 p-1 items-center justify-between mt-4">
                          <div className="flex flex-col">
                            <div className="ml-3 p-1 text-xs text-gray-500">
                              Add Size
                            </div>
                            <Input
                              className="w-full "
                              value={newListingTitle}
                              onChange={handleInputChange}
                              placeholder=""
                            />
                          </div>
                          <div className="flex flex-col">
                            <div className="ml-3 p-1 text-xs text-gray-500">
                              Qty
                            </div>
                            <Input
                              type="text"
                              className="ml-2 mr-2 w-20"
                              value={newListingStock}
                              onChange={(e) =>
                                setNewListingStock(Number(e.target.value))
                              }
                              placeholder=""
                            />
                          </div>
                          <div className="flex flex-col">
                            <div className="ml-3 p-1 text-xs text-white">.</div>
                            <Image
                              src="/assets/icons/add.svg"
                              alt="add"
                              className="cursor-pointer"
                              width={50}
                              height={50}
                              onClick={() => {
                                if (
                                  newListingTitle.trim() !== "" &&
                                  newListingStock > 0
                                ) {
                                  const updatedFeatures = [
                                    ...(field.value || []),
                                    {
                                      size: newListingTitle.trim(),
                                      stock: Number(newListingStock),
                                    },
                                  ];
                                  field.onChange(updatedFeatures);
                                  setNewListingTitle("");
                                  setNewListingStock(0);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="border-b">
          <h2 className="font-bold p-2 text-[30px]">Marketing & Promotions</h2>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          {/* Tags */}
          {/* Featured in Deals */}
          <FormField
            control={form.control}
            name="featuredInDeals"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col text-sm px-4 py-2">
                    <div className="gap-3 items-center flex">
                      <input
                        type="radio"
                        name="featuredInDeals"
                        value="Sale"
                        className="cursor-pointer"
                        checked={field.value === "Sale"}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      Sale
                    </div>
                    <div className="gap-3 items-center flex">
                      <input
                        type="radio"
                        name="featuredInDeals"
                        value="Clearance"
                        className="cursor-pointer"
                        checked={field.value === "Clearance"}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      Clearance
                    </div>
                    <div className="gap-3 items-center flex">
                      <input
                        type="radio"
                        name="featuredInDeals"
                        value="Bundles"
                        className="cursor-pointer"
                        checked={field.value === "Bundles"}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      Bundles
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Images */}

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

            {form.formState.isSubmitting ? "Submitting..." : `${type} Product `}
          </div>
        </Button>
      </form>
    </Form>
  );
};
