import { FormEvent, SyntheticEvent, useEffect, useRef, useState } from "react";

interface Props {
  showDialog: boolean;
  setShowDialog: (value: boolean) => void;
}

const Dialog = ({ showDialog, setShowDialog }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);
  const [label, setLabel] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const showModal = () => {
      if (showDialog) {
        ref.current?.showModal();
      } else {
        ref.current?.close();
      }
    };
    showModal();

    ref.current?.addEventListener("cancel", (e: Event) => {
      e.preventDefault();
    });

    return () => {
      ref.current?.removeEventListener("cancel", (e: Event) => {
        e.preventDefault();
      });
    };
  }, [showDialog]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/addPost", {
      method: "POST",
      body: JSON.stringify({ label, link }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setLabel("");
    setLink("");
    setShowDialog(false);
  };

  return (
    <dialog
      ref={ref}
      className="w-4/5 sm: max-w-[620px] rounded-xl md:px-8 md:py-6"
    >
      <h2 className="font-medium text-2xl text-primary mb-3">
        Add a new photo
      </h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className="label flex flex-col">
          <label htmlFor="label" className="text-sm text-secondary mb-1">
            Label
          </label>
          <input
            type="text"
            name="label"
            value={label}
            onChange={(e) => setLabel(e.currentTarget.value)}
            id="label"
            placeholder="Label"
            required
            className="w-full text-sm p-2 sm:p-4 border-accent border rounded-xl focus-visible:outline-none"
          />
        </div>
        <div className="label flex flex-col">
          <label htmlFor="link" className="text-sm text-secondary mb-1">
            Photo URL
          </label>
          <input
            type="url"
            name="link"
            id="link"
            value={link}
            onChange={(e) => setLink(e.currentTarget.value)}
            pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)"
            required
            placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."
            className="w-full text-sm p-2 sm:p-4 border-accent border rounded-xl focus-visible:outline-none"
          />
        </div>
        <div className="flex justify-end gap-5">
          <button onClick={() => setShowDialog(false)} className="text-accent">
            Cancel
          </button>
          <button className="bg-btnPrimary text-white py-4 px-5 rounded-xl font-bold">
            Submit
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default Dialog;
