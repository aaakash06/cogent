import { Blog } from "@/utils/type";

const BlogCard = ({ blog }: { blog: Blog }) => {
  const { title, content, createdAt, categories, img } = blog;

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={img}
            alt={title}
          />
        </div>
        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {/* {categories} */}
            </div>
            <a
              href="#"
              className="block mt-1 text-2xl leading-tight font-bold text-black hover:underline"
            >
              {title}
            </a>
            <p className="mt-2 text-gray-600">{content}</p>
          </div>
          <div className="mt-4">
            {/* <span className="text-gray-400 text-xs">{createdAt}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
