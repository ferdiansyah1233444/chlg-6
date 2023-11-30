const { ResponseTemplate } = require("../helper/template.helper");
const { PrismaClient } = require("@prisma/client");
const imagekit = require("../lib/imagekit");

const prisma = new PrismaClient();

require("dotenv").config();

async function FetchBerita(req, res) {
  const { id, heading, summary, img_url } = req.query;
  const payload = { heading, summary, img_url };

  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    const news = await prisma.Berita.findMany({
      skip,
      take: perPage,
      where: { ...payload, deletedAt: null },
      select: { id: true, heading: true, summary: true, img_url: true },
    });

    const resp = ResponseTemplate(news, "success", null, 200);
    res.json(resp);
  } catch (error) {
    console.error(error);
    const resp = ResponseTemplate(null, "internal server error", error.message, 500);
    res.json(resp);
  }
}

async function AddBerita(req, res, next) {
  const { heading, summary } = req.body;
  const fileString = req.file.buffer.toString("base64");

  try {
    const uploadFile = await uploadImage(req.file);
    const Berita = await prisma.Berita.create({
      data: { heading, summary, img_url: uploadFile.url, img_name: uploadFile.name },
    });

    const respons = ResponseTemplate(Berita, "success", null, 200);
    res.status(200).json(respons);
  } catch (error) {
    next(error);
  }
}

async function UpdateBerita(req, res) {
  const { heading, summary } = req.body;
  const updatedAt = new Date();
  const { id } = req.params;
  const payload = { updatedAt };

  if (!heading && !summary) {
    const resp = ResponseTemplate(null, "bad request", null, 400);
    res.json(resp);
    return;
  }

  const uploadFile = await uploadImage(req.file);

  if (heading) payload.heading = heading;
  if (summary) payload.summary = summary;
  if (uploadFile.url) payload.img_url = uploadFile.url;
  if (uploadFile.name) payload.img_name = uploadFile.name;

  // ... (kode lainnya)
}

// Fungsi bantuan untuk mengelola logika pengunggahan gambar
async function uploadImage(file) {
  const fileString = file.buffer.toString("base64");
  return imagekit.upload({
    fileName: file.originalname,
    file: fileString,
  });
}

module.exports = { FetchBerita, AddBerita, UpdateBerita };