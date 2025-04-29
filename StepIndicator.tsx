import { Fragment } from "react";
import { INVOICE_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-6 max-w-2xl mx-auto">
      {INVOICE_STEPS.map((step, index) => (
        <Fragment key={step.id}>
          {/* Step circle */}
          <div className="flex flex-col items-center">
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium",
                step.id === currentStep 
                  ? "bg-primary-700 text-white" 
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {step.id}
            </div>
            <span 
              className={cn(
                "text-xs mt-1 font-medium",
                step.id === currentStep 
                  ? "text-primary-700" 
                  : "text-gray-500"
              )}
            >
              {step.name}
            </span>
          </div>
          
          {/* Connecting line (except after last step) */}
          {index < INVOICE_STEPS.length - 1 && (
            <div className="flex-1 h-1 bg-gray-200 mx-2 relative">
              <div 
                className={cn(
                  "absolute inset-0 bg-primary-700",
                  step.id < currentStep ? "w-full" : "w-0"
                )}
              ></div>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
