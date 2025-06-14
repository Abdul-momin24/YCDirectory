import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

export default function SearchFormReset() {
  const reset = () => {
    const form = document.querySelector('.search-form') as HTMLFormElement | null;

    if (form) {
      form.reset(); // ✅ resets all fields inside the form
      console.log("Form reset");
    } else {
      console.warn("No form found with class .search-form");
    }
  };

  return (
    <Button type="button" onClick={reset} className="search-btn text-white">
      <X className="size-5" />
    </Button>
  );
}
