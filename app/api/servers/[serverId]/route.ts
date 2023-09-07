import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { serverId: string } }
) => {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const server = await db.server.findFirst({
      where: {
        id: params.serverId,
      },
    });

    const updateServer = await db.server.update({
      where: {
        id: params.serverId,
        // Only an admin can update the server
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(updateServer, { status: 200 });
  } catch (error) {
    console.log("[SERVERID_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { serverId: string } }
) => {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const server = await db.server.delete({
      where: {
        id: params.serverId,
      },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.log("[SERVERID_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
