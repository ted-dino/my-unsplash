import { FormEvent, useEffect, useRef } from "react";
import { modal } from "../utils/modal";

interface Props {
  deleteDialog: boolean;
  setDeleteDialog: (value: boolean) => void;
  password: string;
  setPassword: (value: string) => void;
  postID: number;
  deletePhoto: (e: number) => void;
}

const DeleteDialog = ({
  deleteDialog,
  setDeleteDialog,
  password,
  setPassword,
  postID,
  deletePhoto,
}: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    modal(deleteDialog, ref);
  }, [deleteDialog]);

  const deletePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deletePhoto(postID);
  };
  return (
    <dialog
      ref={ref}
      className="w-4/5 sm: max-w-[620px] rounded-xl md:px-8 md:py-6"
    >
      <h2 className="font-medium text-2xl text-primary mb-3">Are you sure?</h2>
      <form onSubmit={deletePost} className="flex flex-col gap-5">
        <div>
          <label htmlFor="password" className="text-sm text-secondary mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="**************"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            className="w-full text-sm p-2 sm:p-4 border-accent border rounded-xl focus-visible:outline-none"
          />
        </div>
        <div className="flex justify-end gap-5">
          <button
            type="reset"
            onClick={() => {
              setDeleteDialog(false);
              setPassword("");
            }}
            className="text-accent"
          >
            Cancel
          </button>
          <button className=" flex items-center gap-2 bg-btnSecondary text-white py-4 px-5 rounded-xl font-bold">
            Delete
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default DeleteDialog;
