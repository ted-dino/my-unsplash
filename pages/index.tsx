import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import AddDialog from "../components/addDialog";
import { Posts } from "../types";
import DeleteDialog from "../components/deleteDialog";
import Link from "next/link";

interface Props {
  posts: Posts[];
}

const Home: NextPage<Props> = ({ posts }) => {
  const [photos, setPhoto] = useState(posts);
  const [addDialog, setAddDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [postID, setPostID] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const searchPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value) return setPhoto(posts);
    const filteredResult = posts.filter((photo: Posts) =>
      photo.label.toLowerCase().includes(e.currentTarget.value.toLowerCase())
    );
    setPhoto(filteredResult);
  };

  const deletePhoto = async (postId: number) => {
    if (password === process.env.NEXT_PUBLIC_SECRET_KEY) {
      try {
        const response = await fetch("/api/posts", {
          method: "DELETE",
          body: JSON.stringify({ postId }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.message) {
          alert(data.message);
        } else {
          alert(`The image was successfully deleted.`);
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
          return;
        }
        alert(`Unexpected Error: ${error}`);
      } finally {
        router.reload();
      }
    } else {
      if (password.trim().length === 0) {
        alert("Please input the password");
      } else {
        alert("Password is incorrect");
      }
    }
    setPassword("");
  };

  const formatLabel = (label: string) => {
    return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
  };

  return (
    <>
      <Head>
        <title>My Unsplash</title>
        <meta name="title" content="My Unsplash" />
        <meta
          name="description"
          content="unsplash clone challenge by https://devchallenges.io/"
        />

        <link rel="icon" href="/devchallenges.png" />
      </Head>

      <div className="container mx-auto px-2 xs:px-0">
        <header className="flex justify-between py-8 flex-wrap gap-5">
          <div className="flex items-center w-full md:w-auto">
            <img
              src="/my_unsplash_logo.svg"
              alt="logo"
              className="w-32 h-7 hidden md:block"
            />
            <div className="flex items-center relative w-full md:w-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-5 stroke-accent"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                name="name"
                id="name"
                onChange={searchPhoto}
                placeholder="Seach by label"
                className="w-full border-accent border rounded-xl focus-visible:outline-none py-4 pl-14"
              />
            </div>
          </div>
          <button
            onClick={() => setAddDialog(true)}
            className="bg-btnPrimary text-white py-4 px-5 rounded-xl font-bold ml-auto"
          >
            Add a photo
          </button>
        </header>
        <main className="columns-1 sm:columns-2 lg:columns-3 gap-2">
          {photos &&
            photos.length > 0 &&
            photos.map((post: Posts) => (
              <div
                key={post.id}
                className="relative flex flex-col cursor-pointer my-2"
              >
                <img
                  className="w-auto rounded-3xl"
                  src={post.photo_url}
                  alt={post.label}
                />
                <div className="p-5 flex flex-col justify-between absolute inset-0 bg-black/30 opacity-0 transition-opacity hover:opacity-100 rounded-3xl">
                  <button
                    onClick={() => {
                      setPostID(post.id);
                      setDeleteDialog(true);
                    }}
                    className="px-4 py-1.5 text-btnSecondary text-xs border-btnSecondary border ml-auto block rounded-3xl"
                  >
                    Delete
                  </button>
                  <p className="text-white font-bold text-lg">
                    {formatLabel(post.label)}
                  </p>
                </div>
              </div>
            ))}
          <AddDialog
            addDialog={addDialog}
            setAddDialog={setAddDialog}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          <DeleteDialog
            deleteDialog={deleteDialog}
            setDeleteDialog={setDeleteDialog}
            password={password}
            setPassword={setPassword}
            deletePhoto={deletePhoto}
            postID={postID}
          />
        </main>
      </div>
      <footer className="text-center text-primary mt-5">
        created by &nbsp;
        <Link href="https://github.com/ted-dino">
          <a className="underline font-bold">Ted Dino</a>
        </Link>
        &nbsp; - devchallenges.io
      </footer>
    </>
  );
};

export async function getServerSideProps() {
  const result = await fetch(
    "https://my-unsplash-ted-dino.vercel.app//api/posts"
  );
  const data = await result.json();
  return {
    props: {
      posts: data,
    },
  };
}

export default Home;
