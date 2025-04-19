"use client"

import { useState, useRef, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react"

interface FileUploadProps {
  id: string
  label: string
  accept?: string
  onChange: (file: File | null, preview: string | null) => void
  value?: string | null
  className?: string
}

export function FileUpload({ id, label, accept = "image/*", onChange, value, className }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    if (file) {
      const filePreview = URL.createObjectURL(file)
      setPreview(filePreview)
      onChange(file, filePreview)
    } else {
      setPreview(null)
      onChange(null, null)
    }
  }

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = ""
    }
    setPreview(null)
    onChange(null, null)
  }

  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-1.5">
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} className="flex-1">
            <Upload className="mr-2 h-4 w-4" />
            Upload {preview ? "New" : ""} Image
          </Button>
          {preview && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleClear}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <input id={id} ref={inputRef} type="file" accept={accept} onChange={handleFileChange} className="hidden" />
      </div>
      {preview && (
        <div className="mt-2 aspect-video bg-orange-100 rounded-md overflow-hidden">
          <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  )
}
