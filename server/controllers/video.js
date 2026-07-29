import video from "../Modals/video.js";

export const uploadvideo = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Please upload an MP4 video file.",
    });
  }

  try {
    const file = new video({
      videotitle: req.body.videotitle,
      filename: req.file.originalname,
      filepath: req.file.path,
      filetype: req.file.mimetype,
      filesize: req.file.size,
      videochanel: req.body.videochanel,
      uploader: req.body.uploader,
    });

    await file.save();

    return res.status(201).json(file);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getallvideo = async (req, res) => {
  try {
    const files = await video.find().sort({ createdAt: -1 });
    return res.status(200).json(files);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const searchvideo = async (req, res) => {
  try {
    const query = req.query.q;

    const videos = await video.find({
      $or: [
        {
          videotitle: {
            $regex: query,
            $options: "i",
          },
        },
        {
          videochanel: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    });

    return res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};