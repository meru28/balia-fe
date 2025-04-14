'use client'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {ImageIcon} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {useNewsPromo, useUpdateNewsPromo} from "@/hooks/useNewsPromo";
import {toast} from "sonner";

export default function PromoPopupPage() {
  const [popupContent, setPopupContent] = useState({
    header: "Don't miss out",
    subheader: "Be the first one to get the new product at early bird prices.",
    buttonLabel: "Keep me updated",
    buttonLabelMinimized: "News Offer"
  });

  const [imagePreview, setImagePreview] = useState({
    id: 1, file: null, preview: null
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPopupContent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(prev => ({
        ...prev,
        file,
        preview: previewUrl
      }));
    }
  };

  const handleSave = () => {
    // Here you would typically save to a backend
    console.log("Saved content:", { ...popupContent, image: fileInputRef.current?.files?.[0] });
    alert("Changes saved successfully!");
  };

  const {data: newsPromo, isLoading} = useNewsPromo(['newsPromo'])

  useEffect(() => {
    if (newsPromo && newsPromo[0] && !isLoading) {
      setPopupContent(prevState =>({
        ...prevState,
        header: newsPromo[0].header || prevState.header,
        subheader: newsPromo[0].description || prevState.subheader,
        buttonLabel: newsPromo[0].buttonLabel || prevState.buttonLabel,
        buttonLabelMinimized: newsPromo[0].buttonLabelMinimal || prevState.buttonLabelMinimized,
      }))
      if (newsPromo[0]?.image !== '' && !imagePreview.file) {
        setImagePreview(prev => ({
          id: newsPromo[0].id,
          file: null,
          preview: newsPromo[0].image
        }));
      }
    }

  }, [newsPromo, isLoading, imagePreview.file])

  const { mutate: updateNewsPromo, isPending } = useUpdateNewsPromo()

  function onSubmit() {
    const metadata = {
      id: newsPromo[0].id,
      title: newsPromo[0].title,
      header: popupContent.header,
      description: popupContent.subheader,
      status: 1,
      buttonLabel: popupContent.buttonLabel,
      buttonLabelMinimal: popupContent.buttonLabelMinimized,
      originalName: imagePreview.file?.name
    }

    const validImages = Object.keys(imagePreview).includes('file') && imagePreview.file !== null ? imagePreview.file : null;
    updateNewsPromo({metadata, validImages}, {
      onSuccess: () => {
        toast.success('Promo popup updated successfully')
      },
      onError: (err) => {
        toast.error(err.message)
      }
    })
    
    console.log('cekkkkk', validImages)
  }

  return (
    <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 md:tw-px-10 tw-py-4 md:tw-py-5">
      <div className="tw-mb-4 md:tw-mb-6 tw-bg-white tw-rounded-lg tw-p-3 md:tw-p-4 tw-shadow-lg">
        <div className="tw-flex tw-items-center tw-gap-2 tw-mb-4 md:tw-mb-0">
          <div className="tw-w-1 tw-h-6 tw-bg-emerald-500"/>
          <h1 className="tw-text-2xl md:tw-text-3xl tw-p-0 tw-m-0 tw-font-bold">Custom Promo Popup</h1>
        </div>
      </div>
      <div className="tw-flex tw-flex-col tw-gap-8">
        {/* Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Popup Content</CardTitle>
          </CardHeader>
          <CardContent className="tw-space-y-6">
            <div className="tw-space-y-2">
              <Label htmlFor="image">Upload Image</Label>
              <div className="tw-grid tw-w-full tw-items-center tw-gap-1.5">
                <Input
                  id="image"
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="tw-cursor-pointer"
                />
                <p className="tw-text-sm tw-text-muted-foreground">
                  Supported formats: JPG, PNG, GIF
                </p>
              </div>
            </div>

            <div className="tw-space-y-2">
              <Label htmlFor="header">Header</Label>
              <Input
                id="header"
                name="header"
                value={popupContent.header || ""}
                onChange={handleChange}
                placeholder="Enter header text..."
              />
            </div>

            <div className="tw-space-y-2">
              <Label htmlFor="subheader">Subheader</Label>
              <Textarea
                id="subheader"
                name="subheader"
                value={popupContent.subheader}
                onChange={handleChange}
                placeholder="Enter subheader text..."
              />
            </div>

            <div className="tw-space-y-2">
              <Label htmlFor="buttonLabel">Button Label</Label>
              <Input
                id="buttonLabel"
                name="buttonLabel"
                value={popupContent.buttonLabel}
                onChange={handleChange}
                placeholder="Enter button label..."
              />
            </div>

            <div className="tw-space-y-2">
              <Label htmlFor="buttonLabelMinimized">Button Label Minimized</Label>
              <Input
                id="buttonLabelMinimized"
                name="buttonLabelMinimized"
                value={popupContent.buttonLabelMinimized}
                onChange={handleChange}
                placeholder="Enter button label..."
              />
            </div>

            <Button onClick={onSubmit} className="tw-w-full" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="tw-w-3/5 tw-h-fit tw-mx-auto">
          <CardHeader className="!tw-bg-[#e5e7eb]">
            <CardTitle className="">Preview</CardTitle>
          </CardHeader>
          <CardContent className="tw-flex tw-flex-row tw-h-[87%] tw-w-full !tw-p-0">
            <div className="tw-w-1/2 tw-relative tw-bg-muted tw-rounded-lg">
              {imagePreview.preview ? (
                <div className="tw-relative tw-w-full tw-h-full">
                  <Image
                    src={imagePreview.preview}
                    width={100}
                    height={100}
                    alt="Preview"
                    className="tw-w-full tw-h-full tw-object-cover tw-rounded-lg"
                  />
                </div>
              ) : (
                <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full tw-gap-2">
                  <ImageIcon className="tw-h-12 tw-w-12 tw-text-muted-foreground" />
                  <p className="tw-text-sm tw-text-muted-foreground">No image selected</p>
                </div>
              )}
            </div>

            <div className="tw-space-y-4 tw-p-4 tw-bg-card tw-rounded-lg tw-flex tw-flex-col tw-justify-center text-center">
              <h2 className="tw-text-2xl tw-font-bold">{popupContent.header}</h2>
              <p className="tw-text-muted-foreground">{popupContent.subheader}</p>
              <input
                type="email"
                placeholder="Email *"
                className="tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-md"
              />
              <Button className="tw-w-full">{popupContent.buttonLabel}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="tw-relative tw-border-2">
        <Button className="tw-w-fit tw-animate-bounce">{popupContent.buttonLabelMinimized}</Button>
      </div>
    </div>
  )
}