import { RefObject } from "react";

export const modal = (isOpen: boolean, ref: RefObject<HTMLDialogElement>) => {
  if (isOpen) {
    ref.current?.showModal();
  } else {
    ref.current?.close();
  }

  // prevent dialog tag from closing on keydown esc
  ref.current?.addEventListener("cancel", (e: Event) => {
    e.preventDefault();
  });

  return () => {
    ref.current?.removeEventListener("cancel", (e: Event) => {
      e.preventDefault();
    });
  };
};
