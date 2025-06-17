import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

import { useRouter } from 'next/navigation'

export default function SearchFormReset() {
  const router  = useRouter()
  const reset = () => {
    const form = document.querySelector('.search-form') as HTMLFormElement | null;
    console.log(form)
    if (form) {
      form.reset();
      console.log("Form reset");
      router.push("/")
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
