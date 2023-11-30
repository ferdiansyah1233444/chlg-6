const router = require("express").Router();
const {
  FetchBerita,
  AddBerita,
  UpdateBerita,
} = require("../controller/mainController");
const { validatePostUser } = require("../middleware/middleware");
const multer = require("multer")();

// Berita
router.get("/", FetchBerita);
router.post("/", multer.single("url_img"), validatePostUser, AddBerita);
router.put("/:id", multer.single("url_img"), validatePostUser, UpdateBerita);

// ... (kode lainnya)

module.exports = router;