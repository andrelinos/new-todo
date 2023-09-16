import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const categories = await prisma.todo.findMany();
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await prisma.todo.create({
      data: body
    });

    return NextResponse.json(
      { success: 'Created success' },
      {
        status: 201
      }
    );
  } catch (error) {}
}

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  const body = await req.json();
  await prisma.todo.update({
    where: {
      id: id as string
    },
    data: body
  });

  return NextResponse.json(
    { success: 'Update success' },
    {
      status: 201
    }
  );
}
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  await prisma.todo.delete({
    where: {
      id: id as string
    }
  });

  return NextResponse.json(
    { success: 'Delete success' },
    {
      status: 201
    }
  );
}
