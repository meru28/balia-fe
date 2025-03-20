'use client'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {ImageIcon} from "lucide-react";
import {useRef, useState} from "react";
import Image from "next/image";

export default function PromoPopupPage() {
  const [popupContent, setPopupContent] = useState({
    header: "Don't miss out",
    subheader: "Be the first one to get the new product at early bird prices.",
    buttonLabel: "Keep me updated",
    buttonLabelMinimized: "News Offer"
  });

  const [imagePreview, setImagePreview] = useState(null);
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
      setImagePreview(previewUrl);
    }
  };

  const handleSave = () => {
    // Here you would typically save to a backend
    console.log("Saved content:", { ...popupContent, image: fileInputRef.current?.files?.[0] });
    alert("Changes saved successfully!");
  };

  return (
    <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 md:tw-px-10 tw-py-4 md:tw-py-5">
      <div className="tw-mb-4 md:tw-mb-6 tw-bg-white tw-rounded-lg tw-p-3 md:tw-p-4 tw-shadow-lg">
        <div className="tw-flex tw-items-center tw-gap-2 tw-mb-4 md:tw-mb-0">
          <div className="tw-w-1 tw-h-6 tw-bg-emerald-500"/>
          <h1 className="tw-text-2xl md:tw-text-3xl tw-p-0 tw-m-0 tw-font-bold">Custom Promo Popup</h1>
        </div>
      </div>
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8">
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
                value={popupContent.header}
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

            <Button onClick={handleSave} className="tw-w-full">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="tw-space-y-4">
            <div className="tw-aspect-video tw-relative tw-bg-muted tw-rounded-lg tw-overflow-hidden">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  width={100}
                  height={100}
                  alt="Preview"
                  className="tw-object-cover tw-w-full tw-h-full"
                />
              ) : (
                <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full tw-gap-2">
                  <ImageIcon className="tw-h-12 tw-w-12 tw-text-muted-foreground" />
                  <p className="tw-text-sm tw-text-muted-foreground">No image selected</p>
                </div>
              )}
            </div>

            <div className="tw-space-y-4 tw-p-4 tw-bg-card tw-rounded-lg">
              <h2 className="tw-text-2xl tw-font-bold">{popupContent.header}</h2>
              <p className="tw-text-muted-foreground">{popupContent.subheader}</p>
              <input
                type="email"
                placeholder="Email *"
                className="tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-md"
              />
              <Button className="tw-w-full">{popupContent.buttonLabel}</Button>
            </div>
            <div className="">
              <Button className="tw-w-fit tw-animate-bounce tw-absolute tw-bottom-10">{popupContent.buttonLabelMinimized}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}