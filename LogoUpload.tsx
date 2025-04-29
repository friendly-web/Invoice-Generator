import { 
  ChangeEvent, 
  useState, 
  useCallback, 
  DragEvent, 
  InputHTMLAttributes 
} from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X, Upload, Image } from "lucide-react";

interface LogoUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  logoPreview: string | null;
  onChange: (file: File | null) => void;
}

export default function LogoUpload({
  logoPreview,
  onChange,
  className,
  ...props
}: LogoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      onChange(file);
    }
  }, [onChange]);

  const handleRemove = () => {
    onChange(null);
  };

  return (
    <div className={className}>
      <Label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
        Company Logo
      </Label>
      <div className="mt-1 sm:mt-0">
        <div className="border border-gray-300 rounded-md p-1 flex flex-col items-center justify-center bg-white relative">
          {logoPreview ? (
            <div className="w-full h-32 relative mb-2 bg-gray-50 rounded">
              <img 
                src={logoPreview} 
                alt="Company logo preview" 
                className="w-full h-full object-contain rounded" 
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm border border-gray-200 text-gray-500 hover:text-destructive transition-colors"
                onClick={handleRemove}
                aria-label="Remove logo"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div 
              className={cn(
                "py-4 w-full h-32 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer transition-colors",
                isDragging ? "bg-primary-50" : "hover:bg-gray-50"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Image className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-1">Drag & drop your logo here</p>
              <p className="text-xs text-gray-400">or</p>
              <div className="mt-2">
                <Label 
                  htmlFor="logo" 
                  className="py-1.5 px-3 bg-primary-50 text-primary-700 text-xs font-medium rounded-md hover:bg-primary-100 transition-colors cursor-pointer inline-block"
                >
                  Browse files
                  <input
                    id="logo"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                    {...props}
                  />
                </Label>
              </div>
            </div>
          )}
          <p className="mt-1 text-xs text-gray-500">Recommended size: 300×100px. Max 1MB (PNG, JPG)</p>
        </div>
      </div>
    </div>
  );
}
