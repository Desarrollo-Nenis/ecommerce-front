import React from "react";

const LoaderInline = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
      <span>{text}</span>
    </div>
  );
};

export default LoaderInline;