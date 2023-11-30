-- CreateTable
CREATE TABLE "Berita" (
    "id" SERIAL NOT NULL,
    "heading" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "img_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Berita_pkey" PRIMARY KEY ("id")
);
