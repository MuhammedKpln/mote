import { FiEdit, FiShare } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <div id="header" className="flex justify-between">
        <div id="title" className="text-lg font-bold ">
          My Personal Project
        </div>

        <div id="actions" className="flex ">
          <button className="btn text mr-3">
            <FiEdit />
            Edit project
          </button>

          <button className="btn text">
            <FiShare /> Share project
          </button>
        </div>
      </div>

      <div id="content">
        <ReactMarkdown>{md}</ReactMarkdown>
      </div>
    </>
  );
}
