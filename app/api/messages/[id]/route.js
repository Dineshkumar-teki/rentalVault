import dbConnect from "@/config/dbConfig";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamice = "force-dynamic";

// PUT /api/messages/:id
export const PUT = async (request, { params }) => {
  try {
    await dbConnect();
    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({ message: "You must login to access messages" }),
        { status: 401 }
      );
    }

    const { userId } = sessionUser;

    const message = await Message.findById(id);

    if (!message) return new Response("Message not found", { status: 404 });

    // verify ownership
    if (message.recipient.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // updating the read field
    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};

//DELETE /api/messages/:id
export const DELETE = async (request, { params }) => {
  try {
    await dbConnect();
    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({ message: "You must login to access messages" }),
        { status: 401 }
      );
    }

    const { userId } = sessionUser;

    const message = await Message.findById(id);

    if (!message) return new Response("Message not found", { status: 404 });

    // verify ownership
    if (message.recipient.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await message.deleteOne();

    return new Response("Message deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
