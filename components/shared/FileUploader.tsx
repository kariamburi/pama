import { useCallback, Dispatch, SetStateAction, useState } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import { RocketIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UTApi } from "uploadthing/server";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useToast } from "@/components/ui/use-toast";
import { deleteSingleImage } from "@/lib/actions/ad.product";

type FileUploaderProps = {
  onFieldChange: (urls: string[]) => void;
  imageUrls: string[];
  userName: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

const applyWatermark = (
  file: File,
  headerText: string,
  contentText: string
): Promise<File> => {
  if (typeof window === "undefined") {
    return Promise.resolve(file);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        img.src = result;
      } else {
        reject(new Error("Failed to read file"));
      }
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      // Calculate font sizes based on the smaller dimension of the image
      const headerFontSize = Math.min(canvas.width, canvas.height) * 0.07;
      const contentFontSize = Math.min(canvas.width, canvas.height) * 0.05;

      ctx.font = `bold ${headerFontSize}px Arial`;
      ctx.textAlign = "center";

      const gap = headerFontSize * 0.5;
      const headerCenterX = canvas.width / 2;
      const headerCenterY = canvas.height / 2 - gap / 2 + 280;

      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.strokeText(headerText, headerCenterX, headerCenterY);

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillText(headerText, headerCenterX, headerCenterY);

      ctx.font = `bold ${contentFontSize}px Arial`;
      const contentCenterX = canvas.width / 2;
      const contentCenterY = headerCenterY + gap / 4 + contentFontSize;

      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.strokeText(contentText, contentCenterX, contentCenterY);

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillText(contentText, contentCenterX, contentCenterY);

      canvas.toBlob((blob) => {
        if (blob) {
          const watermarkedFile = new File([blob], file.name, {
            type: file.type,
          });
          resolve(watermarkedFile);
        } else {
          reject(new Error("Failed to create blob"));
        }
      }, file.type);
    };

    img.onerror = (error) => reject(error);
    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
  });
};

export function FileUploader({
  imageUrls,
  userName,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const { toast } = useToast();
  const [showAlert, setShowAlert] = useState(false);
  const [showmessage, setmessage] = useState("");
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const filteredFiles = acceptedFiles.filter((file) => {
        const isScreenshot =
          /screenshot/i.test(file.name) || /Screen\s?Shot/i.test(file.name);
        if (isScreenshot) {
          setmessage(
            `${file.name} appears to be a screenshot and will not be uploaded.`
          );
          //  setShowAlert(true);
          toast({
            variant: "destructive",
            title: "Failed!",
            description: showmessage,
            duration: 5000,
          });
          return false;
        }

        if (imageUrls.includes(convertFileToUrl(file))) {
          setmessage(`${file.name} has already been uploaded.`);
          //  setShowAlert(true);
          toast({
            variant: "destructive",
            title: "Failed!",
            description: showmessage,
            duration: 5000,
          });
          return false;
        }

        if (file.size > 5 * 1024 * 1024) {
          setmessage(
            `${file.name} exceeds the 5MB limit and will not be uploaded.`
          );
          toast({
            variant: "destructive",
            title: "Failed!",
            description: showmessage,
            duration: 5000,
          });
          return false;
        }
        return true;
      });

      const processedFiles: File[] = await Promise.all(
        filteredFiles.map(async (file) => {
          try {
            return await applyWatermark(
              file,
              userName.toUpperCase(),
              "Posted on Pama"
            );
          } catch (error) {
            console.error("Watermark failed, proceeding without:", error);
            return file; // Return the original file if watermarking fails
          }
        })
      );

      setFiles((prevFiles: File[]) => [...prevFiles, ...processedFiles]);
      const urls = processedFiles.map((file: File) => convertFileToUrl(file));
      onFieldChange([...imageUrls, ...urls]);
    },
    [imageUrls, setFiles, onFieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image/*"]),
  });

  const handleRemoveImage = async (index: number) => {
    const url = new URL(imageUrls[index]);
    const deleteImage = url.pathname.split("/").pop();
    if (deleteImage) {
      await deleteSingleImage({
        deleteImage,
        path: "/profile",
      });
    }
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    onFieldChange(newImageUrls);

    // Remove from setFiles
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  return (
    <div className="flex-center flex cursor-pointer lg:p-3 flex-col overflow-hidden rounded-xl">
      <input {...getInputProps()} className="cursor-pointer" />
      <div className="text-left text-sm w-full mx-auto">
        <div className="font-semibold">Add Photo</div>
        <div>
          <small className="text-[#464b4f]">
            Add at least 3 photos for this category
          </small>
          <br />
          <small className="text-[#464b4f]">
            First picture - is the title picture.
          </small>
        </div>

        {imageUrls.length > 0 ? (
          <div className="flex w-full m-1">
            <div {...getRootProps()}>
              <AddBoxIcon className="my-auto hover:cursor-pointer" />
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-5 w-full p-2 bg-gray-100 rounded-sm">
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative max-h-[150px] justify-center items-center mb-1 rounded-sm shadow-sm p-1 bg-white mr-1 flex-shrink-0"
                >
                  <Zoom>
                    <img
                      src={url}
                      alt={`image-${index}`}
                      className="w-full max-h-[140px] object-cover object-center rounded-sm"
                    />
                  </Zoom>
                  <div
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 rounded-xl bg-white p-1 shadow-sm"
                  >
                    <img
                      src="/assets/icons/delete.svg"
                      alt="edit"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="flex-center flex-col py-5 text-grey-500"
            {...getRootProps()}
          >
            <img
              src="/assets/icons/upload.svg"
              width={77}
              height={77}
              alt="file upload"
            />
            <h3 className="mb-2 mt-2">Drag photos here</h3>
            <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
            <Button type="button" className="rounded-full">
              Tap to upload photos
            </Button>
          </div>
        )}

        <br />
        <small className="text-[#464b4f]">
          Supported formats are .jpg, .gif .svg and .png, 5MB max
        </small>
      </div>
    </div>
  );
}
