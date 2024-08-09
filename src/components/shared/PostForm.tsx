"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Tag from "@/components/shared/Tag";
// import { editQuestions, postQuestion } from "@/database/actions.db";
import { useRouter } from "next/navigation";
// import useTheme from "@/context/context";
import { Content } from "next/font/google";
import { FaUpload } from "react-icons/fa6";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  FirebaseStorage,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import { createPost } from "@/database/actions.db";
import { slugify } from "@/utils/slugify";
// import Editor from "quill/core/editor";

const postSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  img: z.string().optional(),
  categories: z
    .string()
    .array()
    .min(1, { message: "Post should have atleast on category" }),
});

interface Props {
  dbUserId?: string | null;
  type: string; // can be for posting or updating
  postDetails?: string | any;
}

const PostForm = ({
  dbUserId = "661b6d5087f1f91a1410b4d6",
  type,
  postDetails,
}: Props) => {
  // const { mode } = useTheme();
  useEffect(() => {
    setStorage(getStorage(app));
  }, []);

  const mode = "dark";
  type = "submit";
  const router = useRouter();
  const fileRef = useRef<File | null>(null);
  const [refresh, setRefresh] = useState(false);

  const [storage, setStorage] = useState<null | FirebaseStorage>(null);

  let newCats: string[] = [];

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  if (postDetails) {
    postDetails = JSON.parse(postDetails);
    const { categories } = postDetails;
    //@ts-ignore
    const inputCats: string[] = categories.map((el) => {
      return el.name;
    });

    newCats = inputCats;
  }

  const uploadFile = useCallback(
    async (values: {
      title: string;
      content: string;
      categories: string[];
      img?: string | undefined;
    }) => {
      const name = new Date().getTime() + fileRef.current!.name;
      const storageRef = ref(storage!, name);

      const uploadTask = uploadBytesResumable(storageRef, fileRef.current!);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // const userId = JSON.parse(dbUserId);
            console.log(downloadURL);

            const data = {
              ...values,
              img: downloadURL,
              author: dbUserId!,
              slug: slugify(values.title),
            };
            console.log(data);
            // submit
            if (type == "submit") {
              await createPost(data);
            }
            // // update
            // else
            //   editQuestions(JSON.stringify(postDetails._id), {
            //     title: values.title,
            //     content: values.content,
            //   });
          });
        }
      );
    },
    [storage]
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: postDetails?.title || "",
      content: "",
      categories: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof postSchema>) {
    if (dbUserId == null) router.push("/sign-up");
    else {
      setIsSubmitting(true);
      try {
        //save the image to firebase
        fileRef.current && uploadFile(values);
      } catch (err) {
        console.log("error occured during submiting the question form");
        setIsSubmitting(false);
      } finally {
        // type == "submit"
        //   ? router.push("/")
        //   : router.push(`/questions/${postDetails._id}`);
        setIsSubmitting(false);
      }
    }
  }

  function handleTagKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) {
    if (e.key === "Enter" && field.name === "categories") {
      e.preventDefault();
      const catInput = e.target as HTMLInputElement;
      const catString = catInput.value.trim();
      if (catString !== "") {
        if (catString.length > 15) {
          return form.setError("categories", {
            type: "required",
            message: "Category must be less than 15 characters",
          });
        }
        if (!field.value.includes(catString as never)) {
          //as never why?
          form.setValue("categories", [...field.value, catString]);
          catInput.value = "";
          form.clearErrors("categories");
        } else {
          form.trigger();
        }
      }
    }
  }

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      // console.log(editorRef.current.getContent());
    }
  };

  function handleTagRemove(field: any, name: string) {
    //@ts-ignore
    const newFieldValue = field.value.filter((tag) => tag !== name);
    form.setValue("categories", newFieldValue);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[1rem] font-bold dark:text-white">
                Title <span className="text-red-500">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus dark:text-white dark:border-black  dark:bg-gray-700"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-blue-400 text-[12px] dark:text-white ">
                Enter your post title.
              </FormDescription>
              <FormMessage className=" text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[1rem] font-bold dark:text-white">
                Post Description<span className="text-red-500">*</span>{" "}
              </FormLabel>
              <FormControl>
                <div>
                  <Editor
                    apiKey="6ft0u8cgpu0qthcgv7af8xi2hf20bq5hbg24gyxshx7qhyfx"
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    onInit={(evt, editor) => {
                      //@ts-ignore
                      editorRef.current = editor;
                    }}
                    initialValue={postDetails?.content || ""}
                    init={{
                      height: 400,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo |  " +
                        "codesample | bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist ",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }  ",
                      skin: mode === "dark" ? "oxide-dark" : "oxide-dark",
                      content_css: mode == "dark" ? "dark" : "light",
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription className="text-blue-400 text-[12px] dark:text-white ">
                Describe your post as elaboratly as possible.
              </FormDescription>
              <FormMessage className=" text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="img"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[1rem] font-bold dark:text-white">
                {" "}
                Upload Image <span className="text-red-500">*</span>{" "}
              </FormLabel>
              <FormControl>
                <>
                  <label
                    htmlFor="input-file"
                    className="ml-10 border border-input bg-background hover:bg-accent hover:text-accent-foreground gap-2 flex-grow h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    <FaUpload /> Upload Image
                  </label>
                  <input
                    type="file"
                    name="img"
                    onChange={(e) => {
                      if (!e.target.files) return;
                      fileRef.current = e.target.files[0];
                      console.log(fileRef.current);
                      setRefresh((f) => !f);
                    }}
                    className="hidden"
                    id="input-file"
                    // accept="image/*"
                    required
                  />
                  <span className="ml-10 text-blue-300">
                    {" "}
                    [ {fileRef.current && fileRef.current.name} ]
                  </span>

                  {/* <Input
                    className="no-focus  dark:text-white dark:border-black  dark:bg-gray-700"
                    type="file"
                    disabled={type == "edit"}
                    onKeyDown={(e) => {
                      handleTagKeyDown(e, field);
                    }}
                  /> */}
                </>
              </FormControl>
              <FormDescription className="text-blue-400 text-[12px] dark:text-white "></FormDescription>
              <FormMessage className=" text-red-500" />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[1rem] font-bold dark:text-white">
                {" "}
                Categories <span className="text-red-500">*</span>{" "}
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    className="no-focus  dark:text-white dark:border-black  dark:bg-gray-700"
                    disabled={type == "edit"}
                    onKeyDown={(e) => {
                      handleTagKeyDown(e, field);
                    }}
                  />
                  {field.value.length > 0 && (
                    <div className="flex gap-2 pt-2">
                      {field.value.map((tag) => (
                        <div
                          className="flex bg-light-800 gap-1 dark:bg-slate-800 px-2 rounded-[3px]"
                          key={tag}
                          onClick={() =>
                            type == "submit" && handleTagRemove(field, tag)
                          }
                        >
                          <span className="shadow-sm  dark:bg-dark-400  dark:border-none p-1 px-1 bg-light-800 text-[11px] text-zinc-500  dark:text-sky-300 text-center">
                            {" "}
                            {tag}
                          </span>
                          {type == "submit" && (
                            <Image
                              className="dark:invert"
                              src="/assets/icons/close.svg"
                              width={12}
                              height={12}
                              alt="remove"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="text-blue-400 text-[12px] dark:text-white ">
                Category of your post.
              </FormDescription>
              <FormMessage className=" text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className=" bg-sky-700 py-1 text-white px-6 mt-10 hover:bg-yellow-300 hover:text-black"
          // disabled={isSubmitting}
        >
          {type == "submit" ? "Submit the Question" : "Edit the Question"}
        </Button>
        {isSubmitting ? (
          type == "submit" ? (
            <div className="text-[12px] dark:text-white text-blue-500">
              Posting...
            </div>
          ) : (
            <div className="text-[12px] dark:text-white text-blue-500">
              Editing
            </div>
          )
        ) : type == "submit" ? (
          <div className="text-[12px] dark:text-white text-blue-500">
            Submit the question
          </div>
        ) : (
          <div className="text-[12px] dark:text-white text-blue-500">
            Edit the Question
          </div>
        )}
      </form>
    </Form>
  );
};

export default PostForm;
