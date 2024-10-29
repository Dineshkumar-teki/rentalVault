"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/context/GlobalContext";

const Message = ({ message }) => {
  const [isread, setIsread] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsread(read);
        setUnreadCount((prevCount) => {
          read ? prevCount - 1 : prevCount + 1;
        });
        if (read) {
          toast.success("Marked as read");
        } else {
          toast.success("marked as new");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        setIsDeleted(true);
        setUnreadCount((prevCount = prevCount - 1));
        toast.success("Message deleted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("can't delete message");
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isread && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-blue-500 text-white shadow-md font-semibold text-sm px-3 py-1  rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        {" "}
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700 text-lg">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.name}
        </li>

        <li>
          <strong>Reply Email:</strong>
          <a href="mailto:recipient@example.com" className="text-blue-500">
            {" "}
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {" "}
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mt-4 mr-3 ${
          isread ? "bg-slate-300" : "bg-blue-500 text-white"
        }  py-1 px-3 rounded-md`}
      >
        {isread ? "Mark as New" : "Mark as Read"}
      </button>
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default Message;
